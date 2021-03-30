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
		<h1>Near Earth Objects</h1>
		<div class="tabs">
			<div class="tabb-tab">
				<input type="radio" id="tab-1" name="tabb-tabs" checked>
				<label for="tab-1">Tropical Storm</label>
				<div class="tabb-content">
					<div class="selection-wrapper" >
						<div id="selections" class="selections">
						    <h2>Event Selection <span id="eventTitle"></span></h2>
						    <div id="eventSelect"><dl id="eventList"></dl></div>
						    <div id="layerSelect"><dl id="layerList"></dl></div>
						</div>
						<div id="map" class="map"></div>
					</div>
				</div>
			</div>
			<div class="tabb-tab">
				<input type="radio" id="tab-2" name="tabb-tabs">
				<label for="tab-2">Cyclone</label>
				<div class="tabb-content">
					<img src="https://s3-us-west-2.amazonaws.com/courses-images-archive-read-only/wp-content/uploads/sites/567/2015/05/21153100/105516592.jpg" width="350" height="304" />
					<p>ABCD</p>
				</div>
			</div>
			<div class="tabb-tab">
				<input type="radio" id="tab-3" name="tabb-tabs">
				<label for="tab-3">Wildfire</label>
				<div class="tabb-content">
					<img src="https://static.scientificamerican.com/sciam/cache/file/38A06FAD-787A-4C6E-8EAF7961B4A15286_source.jpg?w=590&h=800&E88BF874-B829-4466-80F6C05B82F21F2D" width="350" height="304" />
					<p>ABCD</p>
				</div>
			</div>
			<div class="tabb-tab">
				<input type="radio" id="tab-4" name="tabb-tabs">
				<label for="tab-4">Volcano</label>
				<div class="tabb-content">
					<img src="https://api.timeforkids.com/wp-content/uploads/2018/08/Hero-Volcano.jpg?w=1024" width="350" height="304" />
					<p>ABCD</p>
				</div>
			</div>
		</div>
<script src="js/script.js"></script>
</body>
</html>
