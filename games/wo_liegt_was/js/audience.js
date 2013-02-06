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

        ws = $.websocket('ws://' + location.host + ':8080/audience', {
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

        markers = {};
        polylines = {};

        $blue.add($red).hide();
    }

    function placeMarker() {
        var position = positions.splice(0, 1)[0],
            markerOpts = {
                clickable: false,
                icon: 'img/' + position.who + '.png',
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
            };

        if (markers.blue) {
            showDistance('blue', '09f');
        }

        if (markers.red) {
            showDistance('red', 'f00');
        }

        ws.send('readyForNext');

        function showDistance(player, color) {
            var distance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(markers[player].getPosition(), markers.solution.getPosition()) / 1000);

            polylines[player] = new google.maps.Polyline($.extend({strokeColor: color}, polylineOpts));
            polylines[player].setPath([markers[player].getPosition(), markers.solution.getPosition()]);

            $('.info.' + player).text(distance + ' km').show();
        }
    }
});
