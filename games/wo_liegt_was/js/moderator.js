$(function() {
    var $start = $('#start'),
        $game = $('#game'),

        guesses = [],
        ws,
        moderator;
    
    (function init() {
        ws = $.socketio('moderator', {
            connected: connected,
            playerInput: playerInput,
            stop: stop,
            readyForNext: readyForNext,
            gameOver: gameOver
        });
        
        moderator = $.moderator($game, ws, {
            next: pickQuiz,
            solve: solve
        });

        $start.textfill().click(_startClick);
    })();

    function connected() {
        $start.removeClass('disabled');
    }
    
    function playerInput(data) {
        guesses.push({
            who: data.who,
            lat: data.lat,
            lng: data.lng
        });

        if (guesses.length === 2) {
            ws.emit('stop');
            stop();
        }

        moderator.playerIsReady(data.who);
    }

    function stop() {
        moderator.readyToSolve();
    }

    function readyForNext() {
        moderator.readyForNext();
    }
    
    function gameOver(data) {
        moderator.end(data.winner);
    }
    
    function solve(solution) {
        guesses.push($.extend({who: 'solution'}, solution));

        ws.emit('solve', {positions: guesses});
    }

    function _startClick() {
        if ($start.hasClass('disabled')) {
            return;
        }

        $start.fadeOut(1000, pickQuiz);
    }

    function pickQuiz() {
        var quizId = parseInt(Math.random() * quiz.length);

        moderator.next(quiz[quizId]);

        quiz.splice(quizId, 1);

        guesses = [];

        ws.emit('start');
    }
});