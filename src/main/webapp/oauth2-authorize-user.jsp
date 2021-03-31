<%@ page import="org.apache.oltu.oauth2.client.request.OAuthClientRequest" %>
<%@ page import="org.apache.oltu.oauth2.common.exception.OAuthSystemException" %>
<%@ page import="org.netracker.identity.oauth2.OAuth2Constants" %>
<%@ page import="org.netracker.identity.oauth2.ContextEventListener" %>
<%@ page import="java.util.Properties" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<%
    Properties properties = ContextEventListener.getProperties();
    
    String consumerKey = properties.getProperty("consumerKey");
    String authzEndpoint = properties.getProperty("authzEndpoint");
    String authzGrantType = properties.getProperty("authzGrantType");
    String scope = properties.getProperty("scope");
    String callBackUrl = properties.getProperty("callBackUrl");
    String OIDC_logout_endpoint = properties.getProperty("OIDC_logout_endpoint");

    session.setAttribute(OAuth2Constants.OAUTH2_GRANT_TYPE, authzGrantType);
    session.setAttribute(OAuth2Constants.CONSUMER_KEY, consumerKey);
    session.setAttribute(OAuth2Constants.SCOPE, scope);
    session.setAttribute(OAuth2Constants.CALL_BACK_URL, callBackUrl);
    session.setAttribute(OAuth2Constants.OAUTH2_AUTHZ_ENDPOINT, authzEndpoint);
    session.setAttribute(OAuth2Constants.OIDC_LOGOUT_ENDPOINT, OIDC_logout_endpoint);

    OAuthClientRequest.AuthenticationRequestBuilder oAuthAuthenticationRequestBuilder =
            new OAuthClientRequest.AuthenticationRequestBuilder(authzEndpoint);
    oAuthAuthenticationRequestBuilder
            .setClientId(consumerKey)
            .setRedirectURI((String) session.getAttribute(OAuth2Constants.CALL_BACK_URL))
            .setResponseType(authzGrantType)
            .setScope(scope);
    
    // Build the new response mode with form post.
    OAuthClientRequest authzRequest;
    try {
        authzRequest = oAuthAuthenticationRequestBuilder.buildQueryMessage();
        response.sendRedirect(authzRequest.getLocationUri());
        return;
    } catch (OAuthSystemException e) {
%>

<script type="text/javascript">
    window.location = "index.jsp";
</script>

<%
    }
%>
