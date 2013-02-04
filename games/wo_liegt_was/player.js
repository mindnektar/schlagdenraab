$(function() {
    var $map = $('#map'),
        $submit = $('#submit'),
        
        map,
        marker,
        ws,
        color;
    
    (function init() {
        var startPos = new google.maps.LatLng(30, 0),
            mapOpts = {
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                panControl: false,
                center: startPos,
                scaleControl: false,
                streetViewControl: false,
                zoom: 3
            },
            markerOpts = {
                clickable: false,
                position: startPos
            };
        
        map = new google.maps.Map($map[0], mapOpts);
        marker = new google.maps.Marker(markerOpts);
        marker.setMap(map);
        
        color = location.href.split('?')[1];
        
        ws = $.websocket("ws://127.0.0.1:8080/" + color);
        
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
