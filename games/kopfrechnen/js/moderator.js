$(function() {
    var $start = $('#start'),
        $game = $('#game'),

        guess,
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
        if (guess) {
            return;
        }

        guess = {
            who: data.who,
            value: data.value
        };

        moderator.playerIsReady(data.who);

        ws.emit('stop');
        stop();
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
        ws.emit('solve', {solution: solution, guess: guess});
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

        guess = null;

        ws.emit('start', {question: quiz[quizId].question});

        quiz.splice(quizId, 1);
    }
});
