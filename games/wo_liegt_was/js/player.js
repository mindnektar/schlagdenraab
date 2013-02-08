$(function() {
    var $map = $('#map'),
        $submit = $('#submit'),
        
        map,
        marker,
        ws,
        who = location.href.split('?')[1];
    
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
                icon: 'img/' + who + '.png',
                position: startPos
            };
        
        map = new google.maps.Map($map[0], mapOpts);
        marker = new google.maps.Marker(markerOpts);
        marker.setMap(map);

        adjustFontSize();

        ws = $.socketio(who, {
            start: start,
            stop: stop
        });

        google.maps.event.addListener(map, 'click', _mapClick);
        $submit.click(_submitClick);
    })();

    function start() {
        $submit.removeClass('disabled');
    }

    function stop() {
        $submit.addClass('disabled');
    }
    
    function _mapClick(e) {
        marker.setPosition(e.latLng);
    }
    
    function _submitClick() {
        var latLng = marker.getPosition();

        if ($submit.hasClass('disabled')) {
            return;
        }
        
        ws.emit('playerInput', {lat: latLng.lat(), lng: latLng.lng()});
        
        $submit.addClass('disabled');
    }

    function adjustFontSize() {
        var submitHeight = $submit.height();

        $submit.css({
            fontSize: submitHeight - 16,
            lineHeight: submitHeight + 'px'
        });
    }
});
