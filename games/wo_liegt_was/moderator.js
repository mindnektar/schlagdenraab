$(function() {
    var $solve = $('#solve'),
    
        guesses = [],
        ws;
    
    (function init() {
        ws = $.websocket("ws://127.0.0.1:8080/moderator", {
            events: {
                playerInput: playerInput
            }
        });
        
        $solve.click(_solveClick);
    })();
    
    function playerInput(e) {
        guesses.push({
            who: e.data.player,
            lat: e.data.lat,
            lng: e.data.lng
        });
        
        $('#' + e.data.player + ' div').show();

        if (guesses.length === 2) {
            $solve.show();
        }
    }
    
    function _solveClick() {
        guesses.push({who: 'solution', lat: 0, lng: 0});

        ws.send('solve', {positions: guesses});
    }
});