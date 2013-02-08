$(function() {
    var $map = $('#map'),
        $blue = $('.info.blue'),
        $red = $('.info.red'),
        $score = $('.score'),
        
        map,
        markers = {},
        polylines = {},
        distances = {},
        score = {blue: 0, red: 0},
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

        ws = $.socketio('audience', {
            solve: solve,
            start: start
        });
    })();
    
    function solve(data) {
        var bounds = new google.maps.LatLngBounds();

        positions = data.positions;

        $.each(positions, function(_, latLng) {
            bounds.extend(new google.maps.LatLng(latLng.lat, latLng.lng));
        });

        map.fitBounds(bounds);

        google.maps.event.addListenerOnce(map, 'idle', function() {
            interval = setInterval(placeMarker, 2000);
        });
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
        distances = {};

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

        setTimeout(adjustScore, 2000);

        function showDistance(player, color) {
            distances[player] = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(markers[player].getPosition(), markers.solution.getPosition()) / 1000);

            polylines[player] = new google.maps.Polyline($.extend({strokeColor: color}, polylineOpts));
            polylines[player].setPath([markers[player].getPosition(), markers.solution.getPosition()]);

            $('.info.' + player).text(distances[player] + ' km').show();
        }
    }

    function adjustScore() {
        var who;

        if ((distances.blue && !distances.red) || (distances.blue < distances.red)) {
            who = 'blue';
        } else if ((distances.red && !distances.blue) || (distances.red > distances.blue)) {
            who = 'red';
        } else {
            return;
        }

        score[who]++;

        $('.' + who + ' .point', $score).eq(score[who]).show();

        ws.emit('readyForNext');
    }
});
