
    var server = "https://c2bgsowb9c.execute-api.ap-south-1.amazonaws.com/prod";

    // First, show the list of events
    $( document ).ready(function() {
        loadEvents('severeStorms');
        loadEvents('wildfires');
        loadEvents('volcanoes');
    });

    function loadEvents(eventID){

        $( "#"+eventID+"EventTitle" ).html('<div class="loader"></div>');

        $.getJSON( server + "/events", {
            status: "open",
            limit: 20
        })
        .done(function( data ) {
            let count = 0;
            $( "#"+eventID+"EventTitle" ).html('');

            $.each( data.events, function( key, event ) {
                console.log(event["categories"][0]["id"]);
                if(event["categories"][0]["id"]==eventID){
                    count++;
                    $( "#"+eventID+"EventList" ).append(
                        "<dt class='event'>" +
                        "<a class='show-layers' href='#' data-container='"+eventID+"' data-event='" + event.id+ "'>" +
                        event.title + "</a></dt>"
                    );
                    if (event.description != null &&event.description.length) {
                        $( "#"+eventID+"EventList" ).append(
                            "<dd>" + event.description + "</dd>"
                        );
                    }
                }    
                
            });
            if (count == 0) {
                if(eventID == 'severeStorms'){
                    $( "#"+eventID+"EventList" ).html("No Ongoing Severe Storms!!");
                    return;
                }
                $( "#"+eventID+"EventList" ).html("No Ongoing "+eventID+"!!");
            }   
        });
    }

    // Show the available layers for the event category
    $(document).on('click','.show-layers', function(e){

        e.preventDefault();

        let eventId = $(this).attr('data-event');
        let eventContainerID = $(this).attr('data-container');

        $( "#"+eventContainerID+"EventTitle" ).html('<div class="loader"></div>');
       
        // hide the events list
        $( "#"+eventContainerID+"EventSelect" ).hide();
        $( "#"+eventContainerID+"LayerSelect" ).show();

        // reset elements
        $( "#"+eventContainerID+"LayerList" ).empty();
       

        
        // fetch the single event feed
        $.getJSON( server + "/events/" + eventId )
            .done(function( event ) {
                
                // Get the date and first location of the event.
                // Events can have multiple locations but we are simplifying here.
                var location = event.geometry[0];

                $( "#"+eventContainerID+"EventTitle" ).html(": "+event.title+", "+location.date.substring(0,10));

                // Show list of categories and children layers
                $.each( event.categories, function( key, category ) {
                    $( "#"+eventContainerID+"LayerList" ).append(
                        "<dt>"+category.title+"</dt> "
                    );

                    // Get the applicable layers for the specific event category.
                    // Only include WMTS_1_0_0 layers for now, will add WMS example later.
                    $.getJSON( server + "/layers/" + category.id )
                        .done(function( data ) {
                            var layers = data['categories'][0]['layers'];
                            $( "#"+eventContainerID+"LayerList" ).append('<a href="#" class="load-events" data-event="'+eventContainerID+'">Go Back</a>');
                            $.each( layers, function( key, layer ) {
                                if (layer.serviceTypeId == "WMTS_1_0_0") {
                                    $( "#"+eventContainerID+"LayerList" ).append(
                                        "<dd>" +
                                        "<a href='#' class='showMap' data-container='"+eventContainerID+"' data-encodedLayer='" + encodeURIComponent(JSON.stringify(layer)) + "' data-encodedLocation='" + encodeURIComponent(JSON.stringify(location)) + "' >" +
                                        layer.name+"</a></dd> "
                                    );
                                }
                            });
                        });
                });
            });

    })

    // Back function
    $(document).on('click','.load-events', function(e){
        e.preventDefault();
        
        eventContainerID = $(this).attr('data-event');
        
        $( "#"+eventContainerID+"EventSelect" ).show();
        $( "#"+eventContainerID+"LayerSelect" ).hide();
        $( "#"+eventContainerID+"Map" ).empty();

    });


    //show Map
    $(document).on('click','.showMap', function(e){

        e.preventDefault();
        
        let encodedLayer = $(this).attr('data-encodedLayer');
        let encodedLocation = $(this).attr('data-encodedLocation');
        let eventContainerID = $(this).attr('data-container');

        var layer = JSON.parse(decodeURIComponent(encodedLayer));
        var location = JSON.parse(decodeURIComponent(encodedLocation));

        var center = getCenter(location);

        // quick and dirty way to extract day string from full ISO datetime
        var mapTime = new Date(location.date).toJSON().substring(0,10);

        displayMap(layer.serviceUrl, layer.name,
            center, mapTime,
            layer.parameters[0].FORMAT, layer.parameters[0].TILEMATRIXSET,eventContainerID);
    })


    function getCenter(geojson) {
        if (geojson.type == "Point") {
            return geojson.coordinates;
        } else if (geojson.type == "Polygon") {
            /*
            For this test we are going to compute the center point of the bounding box
             that encloses the geoJson Polygon.

             Since the Polygon specification consists of an outer ring and then inner holes,
             we will only compute the center of the first (outer) LinearRing in the Polygon.

             Convert these coordinates to 0-360 to make it easier
             */

            // use the first point of the first LinearRing as the default for calculations
            var ullat = geojson.coordinates[0][0][1] + 90;
            var ullon = geojson.coordinates[0][0][0] + 180;
            var lrlat = geojson.coordinates[0][0][1] + 90;
            var lrlon = geojson.coordinates[0][0][0] + 180;

            for (i = 0; i < geojson.coordinates[0].length; i++) {

                // longitudes
                if (geojson.coordinates[0][i][0] + 180 > ullon) {
                    ullon = geojson.coordinates[0][i][0] + 180;
                }
                if (geojson.coordinates[0][i][0] + 180 < lrlon) {
                    lrlon = geojson.coordinates[0][i][0] + 180;
                }

                // latitudes
                if (geojson.coordinates[0][i][1] + 90 > ullat) {
                    ullat = geojson.coordinates[0][i][1] + 90;
                }
                if (geojson.coordinates[0][i][1] + 90 < lrlat) {
                    lrlat = geojson.coordinates[0][i][1] + 90;
                }
            }

            centerX = (ullon + ((lrlon - ullon) / 2)) - 180;
            centerY = (lrlat + ((ullat - lrlat) / 2)) - 90;

            return [centerX, centerY];
        }
    }

    function displayMap(serviceUrl, layerName, center, dateStr, format, matrixSet,eventContainerID) {
        // call empty() to make sure another map doesn't already exist there
        $( "#"+eventContainerID+"Map" ).empty();

        var map = new ol.Map({
            view: new ol.View({
                maxResolution: 0.5625,
                projection: ol.proj.get("EPSG:4326"),
                extent: [-180, -90, 180, 90],
                center: center,
                zoom: 3,
                maxZoom: 8
            }),
            target: eventContainerID+"Map",
            renderer: ["canvas", "dom"]
        });

        /*
         This determination of resolutions is based solely on the capabilities
         of the NASA GIBS WMTS as it is currently the only WMTS server represented
         in EONET. More information about GIBS: https://go.nasa.gov/1GTDj3V
         */
        var source = new ol.source.WMTS({
            url: serviceUrl + "?time=" + dateStr,
            layer: layerName,
            format: format,
            matrixSet: matrixSet,
            tileGrid: new ol.tilegrid.WMTS({
                origin: [-180, 90],
                resolutions: [
                    0.5625,
                    0.28125,
                    0.140625,
                    0.0703125,
                    0.03515625,
                    0.017578125,
                    0.0087890625,
                    0.00439453125,
                    0.002197265625
                ],
                matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                tileSize: 512
            })
        });

        var layer = new ol.layer.Tile({
            source: source
        });

        map.addLayer(layer);
    }

    $(document).on('click','.tabb-tab label', function(e){
         
        let eventContainerID = $(this).next().find('.selections').attr('id');
        $( "#"+eventContainerID+"EventSelect" ).show();
        $( "#"+eventContainerID+"LayerSelect" ).hide();
        $( "#"+eventContainerID+"Map" ).empty();
        $( "#"+eventContainerID+"EventTitle" ).empty();
    })

