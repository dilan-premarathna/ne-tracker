
package org.netracker.identity.oauth2;

import com.nimbusds.jose.*;
import com.nimbusds.jose.jwk.source.*;
import com.nimbusds.jose.proc.*;
import com.nimbusds.jwt.*;
import com.nimbusds.jwt.proc.*;
import org.apache.oltu.oauth2.client.OAuthClient;
import org.apache.oltu.oauth2.client.URLConnectionClient;
import org.apache.oltu.oauth2.client.request.OAuthClientRequest;
import org.apache.oltu.oauth2.client.response.OAuthClientResponse;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;
import org.apache.oltu.oauth2.common.message.types.GrantType;
import org.json.JSONObject;
import org.netracker.identity.oauth2.exceptions.ClientAppException;
import org.netracker.identity.oauth2.exceptions.AppServerException;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.*;

public class CommonUtils {

    private static final Map<String, TokenData> TOKEN_STORE = new HashMap<>();

    private CommonUtils() {

    }

    public static JSONObject requestToJson(final OAuthClientRequest accessRequest) {

        JSONObject obj = new JSONObject();
        obj.append("tokenEndPoint", accessRequest.getLocationUri());
        obj.append("request body", accessRequest.getBody());

        return obj;
    }

    public static JSONObject responseToJson(final OAuthClientResponse oAuthResponse) {

        JSONObject obj = new JSONObject();
        obj.append("status-code", "200");
        obj.append("id_token", oAuthResponse.getParam("id_token"));
        obj.append("access_token", oAuthResponse.getParam("access_token"));
        return obj;

    }

    public static boolean clearSession(final HttpServletRequest request, final HttpServletResponse response) {
        // Invalidate session
        final HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        final Optional<Cookie> appIdCookie = getAppIdCookie(request);

        if (appIdCookie.isPresent()) {
            TOKEN_STORE.remove(appIdCookie.get().getValue());
            appIdCookie.get().setMaxAge(0);
            response.addCookie(appIdCookie.get());
            return true;
        }
        return false;
    }

    public static void getToken(final HttpServletRequest request, final HttpServletResponse response)
            throws OAuthProblemException, OAuthSystemException, AppServerException {

        final Optional<Cookie> appIdCookie = getAppIdCookie(request);
        final HttpSession session = request.getSession(false);
        final Properties properties = ContextEventListener.getProperties();
        final TokenData storedTokenData;
        JWTClaimsSet claimSet;

        if (appIdCookie.isPresent()) {
            storedTokenData = TOKEN_STORE.get(appIdCookie.get().getValue());
            if (storedTokenData != null) {
                setTokenDataToSession(session, storedTokenData);
                return;
            }
        }

        final String authzCode = request.getParameter("code");

        if (authzCode == null) {
            throw new AppServerException("Authorization code not present in callback");
        }

        final OAuthClientRequest.TokenRequestBuilder oAuthTokenRequestBuilder =
                new OAuthClientRequest.TokenRequestBuilder(properties.getProperty("tokenEndpoint"));

        final OAuthClientRequest accessRequest = oAuthTokenRequestBuilder.setGrantType(GrantType.AUTHORIZATION_CODE)
                .setClientId(properties.getProperty("consumerKey"))
                .setClientSecret(properties.getProperty("consumerSecret"))
                .setRedirectURI(properties.getProperty("callBackUrl"))
                .setCode(authzCode)
                .buildBodyMessage();

        //create OAuth client that uses custom http client under the hood
        final OAuthClient oAuthClient = new OAuthClient(new URLConnectionClient());
        final JSONObject requestObject = requestToJson(accessRequest);
        final OAuthClientResponse oAuthResponse = oAuthClient.accessToken(accessRequest);
        final JSONObject responseObject = responseToJson(oAuthResponse);
        final String accessToken = oAuthResponse.getParam("access_token");

        session.setAttribute("requestObject", requestObject);
        session.setAttribute("responseObject", responseObject);
        if (accessToken != null) {
            session.setAttribute("accessToken", accessToken);
            String idToken = oAuthResponse.getParam("id_token");
            if (idToken != null) {
                session.setAttribute("idToken", idToken);
                try {
                    claimSet = verifyAndProcessIdToken(idToken, properties);
                    if (claimSet.getClaim("identities") != null) {
                        //this is facebook username claim
                        session.setAttribute("username", claimSet.getStringClaim("given_name"));
                    } else {
                        //this is cognito user pool claim
                        session.setAttribute("username", claimSet.getStringClaim("cognito:username"));
                    }
                } catch (Exception e) {
                    throw new OAuthSystemException("Error occurred while processing the idToken",e);
                }
            }
            session.setAttribute("authenticated", true);
            TokenData tokenData = new TokenData();
            tokenData.setAccessToken(accessToken);
            tokenData.setIdToken(idToken);

            final String sessionId = UUID.randomUUID().toString();
            TOKEN_STORE.put(sessionId, tokenData);
            final Cookie cookie = new Cookie("AppID", sessionId);
            cookie.setMaxAge(-1);
            cookie.setPath("/");
            response.addCookie(cookie);
        } else {
            session.invalidate();
        }
    }

    public static Optional<Cookie> getAppIdCookie(final HttpServletRequest request) {

        final Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("AppID".equals(cookie.getName())) {
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

    public static Optional<TokenData> getTokenDataByCookieID(final String cookieID) {

        if (TOKEN_STORE.containsKey(cookieID)) {
            return Optional.of(TOKEN_STORE.get(cookieID));
        }

        return Optional.empty();
    }

    private static void setTokenDataToSession(final HttpSession session, final TokenData storedTokenData) {

        session.setAttribute("authenticated", true);
        session.setAttribute("accessToken", storedTokenData.getAccessToken());
        session.setAttribute("idToken", storedTokenData.getIdToken());
    }

    private static HttpsURLConnection getHttpsURLConnection(final String url) throws ClientAppException {

        try {
            final URL requestUrl = new URL(url);
            return (HttpsURLConnection) requestUrl.openConnection();
        } catch (IOException e) {
            throw new ClientAppException("Error while creating connection to: " + url, e);
        }
    }

    private static JWTClaimsSet verifyAndProcessIdToken(String idToken, Properties properties) throws
            MalformedURLException, ParseException, JOSEException, BadJOSEException {

        ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
        JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(new URL(properties.getProperty("jwksEndpoint")));
        JWSAlgorithm expectedJWSAlg = JWSAlgorithm.RS256;
        JWSKeySelector<SecurityContext> keySelector =
                new JWSVerificationKeySelector<>(expectedJWSAlg, keySource);
        jwtProcessor.setJWSKeySelector(keySelector);
        jwtProcessor.setJWTClaimsSetVerifier(new DefaultJWTClaimsVerifier(
                new JWTClaimsSet.Builder().issuer(properties.getProperty("issuer")).build(),
                new HashSet<>(Arrays.asList("sub"))));
        return jwtProcessor.process(idToken, null);
    }
}
