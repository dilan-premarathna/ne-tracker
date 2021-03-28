
package org.netracker.identity.oauth2.exceptions;

/**
 * Exception that is used to handle server-side anomalies
 */
public class AppServerException extends Exception {

    public AppServerException(final String message) {

        super(message);
    }

    public AppServerException(final String message, final Throwable ex) {

        super(message, ex);
    }
}
