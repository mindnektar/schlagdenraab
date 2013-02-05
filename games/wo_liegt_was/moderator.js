$(function() {
    var $start = $('#start'),
        $game = $('#game'),
        $players = $('.player div'),
        $question = $('#question'),
        $continue = $('#continue'),

        quiz = [
            {
                question: 'Wo steht das größte von Menschenhand erschaffene Gebäude der Welt?',
                info: 'Burj Khalifa, Dubai, Vereinigte Arabische Emirate',
                solution: {lat: 25.197139, lng: 55.274111}
            },
            {
                question: 'Wo fand das Endspiel der Fußball-Europameisterschaft 2004 statt?',
                info: 'Lissabon, Portugal',
                solution: {lat: 38.725299, lng: -9.150036}
            },
            {
                question: 'Was ist der Geburtsort von Mahatma Gandhi?',
                info: 'Porbandar, Gujarat, Indien',
                solution: {lat: 21.641707, lng: 69.629265}
            },
            {
                question: 'Wo endet der Gelbe Fluss?',
                info: 'Golf von Bohai, China',
                solution: {lat: 37.837644, lng: 119.090939}
            },
            {
                question: 'Wo wird der Friedensnobelpreis verliehen?',
                info: 'Oslo, Norwegen',
                solution: {lat: 59.913869, lng: 10.752245}
            },
            {
                question: 'Wo steht das Atomium?',
                info: 'Brüssel, Belgien',
                solution: {lat: 50.894947, lng: 4.341413}
            },
            {
                question: 'Wo wurde der Reißverschluss erfunden?',
                info: 'Chicago, Illinois, Vereinigte Staaten',
                solution: {lat: 41.878114, lng: -87.629798}
            }
        ],

        currentQuiz,
        guesses = [],
        ws;
    
    (function init() {
        ws = $.websocket("ws://127.0.0.1:8080/moderator", {
            events: {
                playerInput: playerInput,
                readyForNext: readyForNext
            }
        });

        adjustFontSize();

        $start.click(_startClick);
        $continue.click(_continueClick);

        $(window).resize(adjustFontSize);
    })();
    
    function playerInput(e) {
        guesses.push({
            who: e.data.player,
            lat: e.data.lat,
            lng: e.data.lng
        });
        
        $('.player.' + e.data.player + ' div').show();

        if (guesses.length === 2) {
            $continue.show();
        }
    }

    function readyForNext() {
        currentQuiz = null;

        $continue.text('Nächste Frage').show();
    }

    function _startClick() {
        $start.fadeOut(1000, pickQuiz);
    }
    
    function _continueClick() {
        if (currentQuiz) {
            guesses.push($.extend({who: 'solution'}, currentQuiz.solution));

            $continue.hide();

            ws.send('solve', {positions: guesses});
        } else {
            $game.fadeOut(1000, pickQuiz);
        }
    }

    function pickQuiz() {
        currentQuiz = quiz[parseInt(Math.random() * quiz.length)];

        $question.text(currentQuiz.question);
        $continue.text('Auflösen').hide();
        $players.hide();

        guesses = [];

        ws.send('start');

        $game.fadeIn(1000);
    }

    function adjustFontSize() {
        var startHeight = $start.height();

        $start.css({
            fontSize: startHeight - 16,
            lineHeight: startHeight + 'px'
        });
    }
});