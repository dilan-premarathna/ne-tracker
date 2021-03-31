package org.netracker.identity.oauth2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Properties;

import static org.netracker.identity.oauth2.CommonUtils.clearSession;

public class IdpLogout extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        clearSession(req, resp);
        sendRedirect(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        clearSession(req, resp);
        sendRedirect(req, resp);
    }

    private void sendRedirect(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final Properties properties = ContextEventListener.getProperties();
        String uri = properties.getProperty("OIDC_logout_endpoint") + "?" + "client_id=" +
                properties.getProperty("consumerKey") + "&logout_uri=" + properties.getProperty("post_logout_redirect_uri");

        resp.sendRedirect(uri);
    }
}
