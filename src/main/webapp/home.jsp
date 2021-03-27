<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <!-- OpenLayers -->
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/solidstyle.css">
</head>

<body>
<header>
    <ul class="main-navigation">
        <li><a href="#">Hi User</a>
            <ul>
                <li><a href="#">Log out</a>
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
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 25px;
  margin: 4px 2px;
  cursor: pointer;
}
.button1 {background-color: #1bc2a2; border-radius: 12px;} /* Green */
.button2 {background-color: #008CBA;} /* Blue */
</style>

<div class="body-wrap">
       <h1 class="m-0">
            <input type=button class='button button1' onClick="location.href='events.html'" value='Ongoing natural disasters'>
            <input type=button class='button button1' onClick="location.href='objects.html'" value='Near Earth Objects'>
            <input type=button class='button button1' onClick="location.href='forecasters.html'" value='Space weather forecasters'>
       </h1>
</div>
</body>
</html>