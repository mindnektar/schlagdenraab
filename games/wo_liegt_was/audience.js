$(function() {
    var $map = $('#map'),
        $button = $('#button'),
        
        map,
        markers = {},
        ws;
    
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
            },
            i;
        
        map = new google.maps.Map($map[0], mapOpts);

        ws = $.websocket("ws://127.0.0.1:8080/audience", {
            events: {
                solve: solve
            }
        });
    })();
    
    function solve(e) {
        var markerOpts = {
                clickable: false,
                map: map
            };

        $.each(e.data.positions, function(key, position) {
            markerOpts.position = new google.maps.LatLng(position.lat, position.lng);
            
            markers[key] = new google.maps.Marker(markerOpts);
        });
        
        console.log(google.maps.geometry.spherical.computeDistanceBetween(markers.blue.getPosition(), markers.solution.getPosition()));
        console.log(google.maps.geometry.spherical.computeDistanceBetween(markers.red.getPosition(), markers.solution.getPosition()));
    }
});
