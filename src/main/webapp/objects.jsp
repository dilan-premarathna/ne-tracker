<%
    final HttpSession currentSession =  request.getSession(false);
    if (currentSession == null || currentSession.getAttribute("authenticated") == null) {
        // A direct access. Must redirect to index
        response.sendRedirect("index.jsp");
        return;
    }
    String name = (String) currentSession.getAttribute("username");
%>

<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

    <!-- OpenLayers -->
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css" type="text/css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<title>NE-Tracker - Login</title>
</head>

<body>
	<header>
		<ul class="main-navigation">
			<li>
				<a href="home.jsp">Main</a>
			</li>
			<li>
				<a href="#">Hi <%=name%></a>
				<ul>
					<li>
						<a href="/ne-tracker/logout">Log out</a>
					</li>
				</ul>
			</li>
		</ul>
	</header>
	<div class="container">
		<h1 class="text">Near Earth Objects</h1>
		<div class="tabs">
			<div class="tabb-tab">
				<input type="radio" id="tab-1" name="tabb-tabs" checked>
				<label for="tab-1"> Near earth Asteroid object information</label>
				<div class="tabb-content">
					<form >

						<input type="Odate" id="start" name="date" value="2021-03-08">
						<input type="submit" value="Submit">
					</form>
					<div class="selection-wrapper" >
						<div id="selections" class="selections">
						    <h2>Object List <span id="eventTitle"></span></h2>
						    <div id="eventSelect"><dl id="eventList"></dl></div>
						    <div id="layerSelect"><dl id="layerList"></dl></div>
							<div id="map" class="map">
								<div id="tabledata" class="tabledata"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="js/get-object.js"></script>
</body>
</html>
