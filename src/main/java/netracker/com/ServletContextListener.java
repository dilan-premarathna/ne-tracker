package netracker.com;

import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;

public class ServletContextListener implements javax.servlet.ServletContextListener {

    private final static Logger logger = Logger.getLogger(ServletContextListener.class.getName());

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

        Properties properties = new Properties();

        try {
            properties.load(CommonUtil.class.getClassLoader().getResourceAsStream("sso.properties"));
        } catch (IOException e) {
            logger.log(Level.WARNING, "Error while loading properties", e);
        }


    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
