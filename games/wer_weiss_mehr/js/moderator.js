$(function() {
    var $start = $('#start'),
        $game = $('#game'),

        ws,
        moderator;

    (function init() {
        ws = $.socketio('moderator', {
            connected: connected,
            stop: stop,
            gameOver: gameOver
        });

        moderator = $.moderator($game, ws, {
            next: pickQuiz,
            solve: solve,
            timerControls: true
        });

        $start.textfill().click(_startClick);
    })();

    function connected() {
        $start.removeClass('disabled');
    }

    function stop() {
        moderator.readyToSolve();
    }

    function gameOver(data) {
        moderator.end(data.winner);
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

        // TODO: solution list

        ws.emit('start', quiz[quizId]);

        quiz.splice(quizId, 1);
    }

    function solve() {
        ws.emit('solve');
    }
});
