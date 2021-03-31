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
		<h1 class="text">Space Weather Forecasters</h1>
		<div class="tabs">
			<div class="tabb-tab">
				<input type="radio" id="tab-1" name="tabb-tabs" checked>
				<label for="tab-1">Weather Activity</label>
				<div class="tabb-content">
					<div class="selection-wrapper" style="margin-bottom:20px" >
						<form id="searchForm" method="POST">
							<table>
								<tbody>
									<tr>
										<td>Space Weather Activity Type :</td>
										<td>
											<select id="eventName" name="eventName">
												<option value="ALL">--- ALL ---</option>
												<option value="FLR">Solar Flare</option>
												<option value="SEP">Solar Energetic Particle</option>
												<option value="CME">Coronal Mass Ejection</option>
												<option value="IPS">Interplanetary Shock</option>
												<option value="MPC">Magnetopause Crossing</option>
												<option value="GST">Geomagnetic Storm</option>
												<option value="RBE">Radiation Belt Enhancement</option>
												<option value="HSS">High Speed Stream</option>
												<option value="WSAEnlilSimulations">WSA-ENLIL+Cone Model</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Select Catalog :</td>
										<td>
											<select id="catalogName" name="catalogName">
												<option value="ALL">--- ALL ---</option>
												<option value="M2M_CATALOG">M2M_CATALOG</option>
												<option value="JANG_ET_AL_CATALOG">JANG_ET_AL_CATALOG</option>
												<option value="WINSLOW_MESSENGER_ICME_CATALOG">WINSLOW_MESSENGER_ICME_CATALOG</option>
												<option value="GRUESBECK_MAVEN_ICME_CATALOG">GRUESBECK_MAVEN_ICME_CATALOG</option>
												<option value="VALIDATION_CATALOG">VALIDATION_CATALOG</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Optional start date in format (e.g. 2013-01-31) :</td>
										<td>
											<input id="startSearchDate" name="startSearchDate" type="text" value="2016-01-01">
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Optional end date in format (e.g. 2013-06-30) :</td>
										<td>
											<input id="endSearchDate" name="endSearchDate" type="text" value="2016-01-30">
										</td>
										<td></td>
									</tr>
									<tr>
										<td colspan="3" style="display: flex;">
											<input type="submit" value="search">
										</td>
									</tr>
								</tbody>
							</table>
							<div>
								<input type="hidden" name="_csrf" value="d86f84b5-43ce-4c79-97b6-9693f82e6672">
							</div>
						</form>
					</div>
					<div class="table-wrapper">
						
					</div>
				</div>
			</div>
			
		</div>
<script src="js/cast.js"></script>
</body>
</html>
