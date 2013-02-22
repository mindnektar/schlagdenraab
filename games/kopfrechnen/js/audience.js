$(function() {
    var $question = $('#question'),
        $scoreboard = $('#scoreboard'),
        $info = $('.info'),

        ws,
        scoreboard,
        winner;

    (function init() {
        scoreboard = $.scoreboard($scoreboard, {
            gameOver: gameOver,
            size: 'large'
        });

        ws = $.socketio('audience', {
            solve: solve,
            start: start,
            playerInput: playerInput
        });
    })();

    function solve(data) {
        var opponent = data.guess.who === 'blue' ? 'red' : 'blue',
            receiver = data.solution == data.guess.value ? data.guess.who : opponent;

        scoreboard.addPoints(receiver);

        ws.emit('readyForNext');
    }

    function start(data) {
        $info.html('');
        $question.html('<span>' + data.question + '</span>').textfill();
    }

    function playerInput(data) {
        $info.filter('.' + data.who).html('<span>' + data.value + '</span>').textfill();
    }

    function gameOver(who) {
        winner = who;
        ws.emit('gameOver', {winner: winner});
    }
});