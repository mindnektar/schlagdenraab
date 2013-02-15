$(function() {
    var $start = $('#start'),
        $game = $('#game'),
        $players = $('.player'),
        $playersReady = $('div', $players),
        $question = $('#question'),
        $info = $('#info'),
        $continue = $('#continue'),

        currentQuiz,
        guesses = [],
        ws;
    
    (function init() {
        ws = $.socketio('moderator', {
            connected: connected,
            playerInput: playerInput,
            stop: stop,
            readyForNext: readyForNext,
            gameOver: gameOver
        });

        adjustFontSize();

        $start.click(_startClick);
        $continue.click(_continueClick);

        $(window).resize(adjustFontSize);
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
        
        $('.player.' + data.who + ' div').show();

        if (guesses.length === 2) {
            ws.emit('stop');
            stop();
        }
    }

    function stop() {
        $continue.removeClass('disabled');
    }

    function readyForNext() {
        currentQuiz = null;

        $continue.text('Nächste Frage').removeClass('disabled');
    }
    
    function gameOver(data) {
        $playersReady.hide();
        $('.player.' + data.winner + ' div').text('gewinnt!').show();
    }

    function _startClick() {
        if ($start.hasClass('disabled')) {
            return;
        }

        $start.fadeOut(1000, pickQuiz);
    }
    
    function _continueClick() {
        if (currentQuiz) {
            guesses.push($.extend({who: 'solution'}, currentQuiz.solution));

            $continue.addClass('disabled');

            ws.emit('solve', {positions: guesses});
        } else {
            $game.fadeOut(1000, pickQuiz);
        }
    }

    function pickQuiz() {
        var quizId = parseInt(Math.random() * quiz.length);

        currentQuiz = quiz[quizId];

        quiz.splice(quizId, 1);

        $question.text(currentQuiz.question);
        $info.text(currentQuiz.info);
        $continue.text('Auflösen').addClass('disabled');
        $playersReady.hide();

        guesses = [];

        ws.emit('start');

        $game.fadeIn(1000);
        
        setTimeout(adjustFontSize, 50);
    }

    function adjustFontSize() {
        var fontSizeDifference = Math.floor(window.innerHeight / 52),
            startHeight = $start.height(),
            questionHeight = $question.innerHeight() / 3,
            playerHeight = $players.height() / 4,
            infoHeight = $info.height();

        $start.css({
            fontSize: startHeight - fontSizeDifference,
            lineHeight: startHeight + 'px'
        });
        
        $question.css({
            fontSize: questionHeight - fontSizeDifference,
            lineHeight: (questionHeight) + 'px'
        });
        
        $players.css({
            fontSize: playerHeight - fontSizeDifference,
            lineHeight: playerHeight + 'px'
        });
        
        $info.css({
            fontSize: infoHeight - fontSizeDifference,
            lineHeight: infoHeight + 'px'
        });
    }
});