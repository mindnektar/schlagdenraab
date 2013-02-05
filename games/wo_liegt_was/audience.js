$(function() {
    var $map = $('#map'),
        $blue = $('.info.blue'),
        $red = $('.info.red'),
        
        map,
        markers = {},
        polylines = {},
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
                solve: solve,
                start: start
            }
        });
    })();
    
    function solve(e) {
        positions = e.data.positions;

        interval = setInterval(placeMarker, 2000);
    }

    function start() {
        $.each(markers, function(i) {
            markers[i].setMap(null);
        });
        $.each(polylines, function(i) {
            polylines[i].setMap(null);
        });

        $blue.add($red).hide();
    }

    function placeMarker() {
        var position = positions.splice(0, 1)[0],
            markerOpts = {
                clickable: false,
                icon: position.who + '.png',
                map: map
            };

        markerOpts.position = new google.maps.LatLng(position.lat, position.lng);

        markers[position.who] = new google.maps.Marker(markerOpts);

        if (!positions.length) {
            clearInterval(interval);
            setTimeout(showDistances, 2000);
        }
    }

    function showDistances() {
        var polylineOpts = {
                clickable: false,
                map: map
            },
            distanceBlue = parseInt(google.maps.geometry.spherical.computeDistanceBetween(markers.blue.getPosition(), markers.solution.getPosition()) / 1000),
            distanceRed = parseInt(google.maps.geometry.spherical.computeDistanceBetween(markers.red.getPosition(), markers.solution.getPosition()) / 1000);

        polylines.blue = new google.maps.Polyline($.extend({strokeColor: '#09f'}, polylineOpts));
        polylines.blue.setPath([markers.blue.getPosition(), markers.solution.getPosition()]);


        polylines.red = new google.maps.Polyline($.extend({strokeColor: '#f00'}, polylineOpts));
        polylines.red.setPath([markers.red.getPosition(), markers.solution.getPosition()]);

        $blue.text(distanceBlue + ' km').show();
        $red.text(distanceRed + ' km').show();

        ws.send('readyForNext');
    }
});
