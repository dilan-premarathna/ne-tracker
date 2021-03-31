<%@page import="java.util.logging.Level"%>
<%@page import="org.netracker.identity.oauth2.OAuth2Constants"%>
<%@page import="java.util.Properties"%>
<%@page import="org.netracker.identity.oauth2.ContextEventListener"%>
<%@page import="org.netracker.identity.oauth2.CommonUtils"%>
<%@page import="java.util.logging.Logger"%>

<%
    final Properties properties = ContextEventListener.getProperties();
    final Logger logger = Logger.getLogger(getClass().getName());
    final HttpSession currentSession =  request.getSession(false);

    if (currentSession == null || currentSession.getAttribute("authenticated") == null) {
        // A direct access to home. Must redirect to index
        response.sendRedirect("index.jsp");
        return;
    }
    String name = (String) currentSession.getAttribute("username");
%>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <!-- OpenLayers -->
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/solidstyle.css">
    <title>NE-Tracker - Login</title>
</head>

<body>
<header>
    <ul class="main-navigation">
        <li><a href="#">Hi <%=name%></a>
            <ul>
                <li><a href="/ne-tracker/logout">Log out</a>
                </li>
            </ul>
        </li>
    </ul>
</header>
<div class="body-wrap">
    <header class="site-header">
        <div class="container">
            <div class="site-header-inner">
                <div class="brand header-brand">
                  <h1 class="neo"> Natural Event Tracker </h1>
                    <h1 class="m-0"> 
                        <a href="#">
                            <img class="header-logo-image" src="img/earth.gif" alt="Logo">
                        </a>
                    </h1>
                </div>
            </div>
        </div>
    </header>
</div>

<style>
.button {
  border: none;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 25px;
  margin: 4px 2px;
  cursor: pointer;
  outline: none !important;
  
  background-image: linear-gradient(-270deg, rgba(255,255,255,0.00) 0%, #FFFFFF 20%, #FFFFFF 80%, rgba(255,255,255,0.00) 100%)
}
.button1 {background-color: #1bc2a2; border-radius: 12px;} /* Green */
.button2 {background-color: #008CBA;} /* Blue */

.neo {
  font-size: 98px;
  font-family: 'Luckiest Guy';
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow:   0px -6px 0 #212121,  
                 0px -6px 0 #212121,
               
                -6px  0px 0 #212121,
                 6px  0px 0 #212121,
                -6px -6px 0 #212121,  
                 6px -6px 0 #212121,
                -6px  6px 0 #212121,
                 6px  6px 0 #212121,
                -6px  18px 0 #212121,
                 0px  18px 0 #212121,
                 6px  18px 0 #212121,
                 0 19px 1px rgba(0,0,0,.1),
                 0 0 6px rgba(0,0,0,.1),
                 0 6px 3px rgba(0,0,0,.3),
                 0 12px 6px rgba(0,0,0,.2),
                 0 18px 18px rgba(0,0,0,.25),
                 0 24px 24px rgba(0,0,0,.2),
                 0 36px 36px rgba(0,0,0,.15);
}
</style>

  
<div class="body-wrap">
       <h1 class="m-0">
            <input type=button class='button button1' onClick="location.href='events.jsp'" value='Ongoing Natural Disasters'>
            <input type=button class='button button1' onClick="location.href='objects.jsp'" value='Near Earth Objects'>
            <input type=button class='button button1' onClick="location.href='forecasters.jsp'" value='Space Weather Forecasters'>
       </h1>
</div>
</body>
</html>
