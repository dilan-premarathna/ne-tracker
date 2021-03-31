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
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

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
		<h1 class="text">On Going Natural Events</h1>
		<div class="tabs">
			<div class="tabb-tab">
				<input type="radio" id="tab-1" name="tabb-tabs" checked>
				<label for="tab-1">Tropical Storm</label>
				<div class="tabb-content">
					<div class="selection-wrapper" >
						<div id="severeStorms" class="selections">
							<h2> <span>Event Selection</span> <span id="severeStormsEventTitle"></span></h2>
							<div id="severeStormsEventSelect"><dl id="severeStormsEventList"></dl></div>
							<div id="severeStormsLayerSelect"><dl id="severeStormsLayerList"></dl></div>
						</div>
						<div id="severeStormsMap" class="map"></div>
					</div>
				</div>
			</div>
			<div class="tabb-tab">
				<input type="radio" id="tab-3" name="tabb-tabs">
				<label for="tab-3">Wildfire</label>
				<div class="tabb-content">
					<div class="selection-wrapper" >
						<div id="wildfires" class="selections">
							<h2> <span>Event Selection</span> <span id="wildfiresEventTitle"></span></h2>
							<div id="wildfiresEventSelect"><dl id="wildfiresEventList"></dl></div>
							<div id="wildfiresLayerSelect"><dl id="wildfiresLayerList"></dl></div>
						</div>
						<div id="wildfiresMap" class="map"></div>
					</div>
				</div>
			</div>
			<div class="tabb-tab">
				<input type="radio" id="tab-4" name="tabb-tabs">
				<label for="tab-4">Volcano</label>
				<div class="tabb-content">
					<div class="selection-wrapper" >
						<div id="volcanoes" class="selections">
							<h2> <span>Event Selection</span> <span id="volcanoesEventTitle"></span></h2>
							<div id="volcanoesEventSelect"><dl id="volcanoesEventList"></dl></div>
							<div id="volcanoesLayerSelect"><dl id="volcanoesLayerList"></dl></div>
						</div>
						<div id="volcanoesMap" class="map"></div>
					</div>
				</div>
			</div>
		</div>
<script src="js/script.js"></script>
</body>
</html>
