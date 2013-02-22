$(function() {
    var $map = $('#map'),
        $blue = $('.info.blue'),
        $red = $('.info.red'),
        $scoreboard = $('#scoreboard'),
        $time = $('.timer'),
        
        map,
        markers = {},
        polylines = {},
        distances = {},
        positions,
        ws,
        interval,
        scoreboard,
        timer,
        winner;
    
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
        
        scoreboard = $.scoreboard($scoreboard, {
            gameOver: gameOver
        });

        timer = $.timer($time, {
            timeOver: timeOver
        });

        ws = $.socketio('audience', {
            solve: solve,
            start: start,
            stop: stop,
            adjustPoints: adjustPoints
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
            if (map.getZoom() > 5) {
                map.setZoom(5);
            }

            interval = setInterval(placeMarker, 2000);
        });
    }

    function start() {
        $.each(markers, function(i, marker) {
            marker.setMap(null);
        });
        
        $.each(polylines, function(i, polyline) {
            polyline.setMap(null);
        });

        markers = {};
        polylines = {};
        distances = {};

        $blue.hide();
        $red.hide();

        timer.start();
    }

    function stop() {
        timer.stop();
    }

    function adjustPoints(data) {
        scoreboard.adjustPoints(data.receiver, data.points);
    }
    
    function gameOver(who) {
        winner = who;
        ws.emit('gameOver', {winner: winner});
    }

    function timeOver() {
        ws.emit('stop', {type: 'stop'});
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
        } else if ((distances.red && !distances.blue) || (distances.red < distances.blue)) {
            who = 'red';
        } else {
            ws.emit('readyForNext');
            return;
        }

        scoreboard.adjustPoints(who);
        
        if (!winner) {
            ws.emit('readyForNext');
        }
    }
});
