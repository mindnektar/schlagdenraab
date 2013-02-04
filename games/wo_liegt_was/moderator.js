$(function() {
    var $solve = $('#solve'),
    
        guesses = {
            blue: null,
            red: null
        },
        ws;
    
    (function init() {
        ws = $.websocket("ws://127.0.0.1:8080/moderator", {
            events: {
                playerInput: playerInput
            }
        });
        
        $solve.click(_solveClick);
    })();
    
    function playerInput(e) {console.log(e);
        guesses[e.data.player] = {
            lat: e.data.lat,
            lng: e.data.lng
        };
        
        $('#' + e.data.player + ' div').show();

        if (guesses.blue && guesses.red) {
            $solve.show();
        }
    }
    
    function _solveClick() {
        ws.send('solve', {positions: $.extend({solution: {lat: 0, lng: 0}}, guesses)});
    }
});