
package org.netracker.identity.oauth2;

import org.apache.commons.lang.StringUtils;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;
import org.netracker.identity.oauth2.exceptions.AppServerException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * This is the servlet which handles OAuth callbacks.
 */
public class DispatchClientServlet extends HttpServlet {

    private final Logger LOGGER = Logger.getLogger(org.netracker.identity.oauth2.DispatchClientServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        responseHandler(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        responseHandler(req, resp);
    }

    private void responseHandler(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        // Create the initial session
        if (request.getSession(false) == null) {
            request.getSession(true);
        }

        // Validate callback properties
        if (request.getParameterMap().isEmpty()) {
            CommonUtils.logout(request, response);
            response.sendRedirect("index.jsp");
            return;
        }

        final String error = request.getParameter(OAuth2Constants.ERROR);

        if (StringUtils.isNotBlank(error)) {
            // Error response from IDP
            CommonUtils.logout(request, response);
            response.sendRedirect("index.jsp");
            return;
        }

        // Obtain and store session_state against this session
        request.getSession(false)
                .setAttribute(OAuth2Constants.SESSION_STATE, request.getParameter(OAuth2Constants.SESSION_STATE));

        try {
            // Obtain token response
            CommonUtils.getToken(request, response);
            response.sendRedirect("home.jsp");
        } catch (AppServerException | OAuthSystemException | OAuthProblemException e) {
            LOGGER.log(Level.SEVERE, "Something went wrong", e);
            response.sendRedirect("index.jsp");
        }
    }
}
