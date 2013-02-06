$(function() {
    var $map = $('#map'),
        $submit = $('#submit'),
        
        map,
        marker,
        ws,
        color = location.href.split('?')[1];
    
    (function init() {
        var startPos = new google.maps.LatLng(30, 0),
            mapOpts = {
                draggableCursor: 'crosshair',
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                maxZoom: 3,
                minZoom: 3,
                panControl: false,
                center: startPos,
                scaleControl: false,
                streetViewControl: false,
                zoom: 3,
                zoomControl: false
            },
            markerOpts = {
                clickable: false,
                icon: 'img/' + color + '.png',
                position: startPos
            };
        
        map = new google.maps.Map($map[0], mapOpts);
        marker = new google.maps.Marker(markerOpts);
        marker.setMap(map);

        ws = $.websocket('ws://' + location.host + ':8080/' + color, {
            events: {
                start: function() {
                    $submit.attr('disabled', false);
                },
                stop: function() {
                    $submit.attr('disabled', true);
                }
            }
        });
        
        google.maps.event.addListener(map, 'click', _mapClick);
        $submit.click(_submitClick);
    })();
    
    function _mapClick(e) {
        marker.setPosition(e.latLng);
    }
    
    function _submitClick() {
        var latLng = marker.getPosition();
        
        ws.send('playerInput', {lat: latLng.lat(), lng: latLng.lng()});
        
        $submit.attr('disabled', true);
    }
});
