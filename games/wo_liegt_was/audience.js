$(function() {
    var $map = $('#map'),
        
        map,
        markers = {},
        positions,
        ws,
        interval;
    
    (function init() {
        var startPos = new google.maps.LatLng(30, 0),
            mapOpts = {
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                panControl: false,
                center: startPos,
                scaleControl: false,
                streetViewControl: false,
                zoom: 3,
                zoomControl: false
            };
        
        map = new google.maps.Map($map[0], mapOpts);

        ws = $.websocket("ws://127.0.0.1:8080/audience", {
            events: {
                solve: solve
            }
        });
    })();
    
    function solve(e) {
        positions = e.data.positions;

        interval = setInterval(placeMarker, 2000);
    }

    function placeMarker() {
        var markerOpts = {
                clickable: false,
                map: map
            },
            position = positions.splice(0, 1)[0];

        markerOpts.position = new google.maps.LatLng(position.lat, position.lng);

        markers[position.who] = new google.maps.Marker(markerOpts);

        if (!positions.length) {
            clearInterval(interval);
            showDistances();
        }
    }

    function showDistances() {
        var polylineOpts = {
                clickable: false,
                map: map
            },
            polylineBlue = new google.maps.Polyline(polylineOpts),
            polylineRed = new google.maps.Polyline(polylineOpts);

        polylineBlue.setPath([markers.blue.getPosition(), markers.solution.getPosition()]);
        polylineRed.setPath([markers.red.getPosition(), markers.solution.getPosition()]);

        console.log(google.maps.geometry.spherical.computeDistanceBetween(markers.blue.getPosition(), markers.solution.getPosition()));
        console.log(google.maps.geometry.spherical.computeDistanceBetween(markers.red.getPosition(), markers.solution.getPosition()));
    }
});
