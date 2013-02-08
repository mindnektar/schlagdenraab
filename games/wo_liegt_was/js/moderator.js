$(function() {
    var $start = $('#start'),
        $game = $('#game'),
        $players = $('.player'),
        $playersReady = $('div', $players),
        $question = $('#question'),
        $info = $('#info'),
        $time = $('#time'),
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
                question: 'Wo ist der Geburtsort von Mahatma Gandhi?',
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
            },
            {
                question: 'Wo steht der K2?',
                info: 'Grenze zwischen Pakistan und China',
                solution: {lat: 35.880833, lng: 76.513333}
            },
            {
                question: 'Wo liegt die Hauptstadt von Mikronesien?',
                info: 'Pazifischer Ozean, nördöstlich von Papua-Neuguinea',
                solution: {lat: 6.914712, lng: 158.161027}
            },
            {
                question: 'Wo hat der Marianengraben seinen tiefsten Punkt?',
                info: 'Challengertief, östlich der Philippinen',
                solution: {lat: 11.333333, lng: 142.2}
            },
            {
                question: 'Wo befindet sich die größte Hindu-Tempelanlage der Welt',
                info: 'Angkor Wat, Angkor, Kambodscha',
                solution: {lat: 13.412469, lng: 103.866986}
            },
            {
                question: 'Wo befinden sich die Nazca-Linien?',
                info: 'Nazca-Wüste, im Süden Perus',
                solution: {lat: -14.739027, lng: -75.130005}
            },
            {
                question: 'Wo wurde das erste Eishotel errichtet?',
                info: 'Jukkasjärvi, Schweden',
                solution: {lat: 67.837828, lng: 20.608506}
            },
            {
                question: 'Wo fand im Jahr 2000 die Weltaustellung statt?',
                info: 'Hannover, Deutschland',
                solution: {lat: 52.375892, lng: 9.73201}
            },
            {
                question: 'Wo fand das erste Telefonat statt?',
                info: 'Durch Alexander Graham Bell in Boston, Massachusetts, Vereinigte Staaten (10. März 1876)',
                solution: {lat: 42.358431, lng: -71.059773}
            },
            {
                question: 'Wo wurde die Titanic gebaut?',
                info: 'Belfast, Nordirland',
                solution: {lat: 54.597285, lng: -5.93012}
            },
            {
                question: 'Wo fand das Tiananmen-Massaker statt?',
                info: 'Peking, China',
                solution: {lat: 39.906018, lng: 116.39767}
            },
            {
                question: 'Wo steht der Vulkan Ätna?',
                info: 'Nördlich von Catania, Italien',
                solution: {lat: 37.75, lng: 15}
            },
            {
                question: 'Wo befindet sich die berühmte Einkaufsmeile La Rambla?',
                info: 'Barcelona, Spanien',
                solution: {lat: 41.380628, lng: 2.173639}
            }
        ],

        currentQuiz,
        guesses = [],
        ws,
        time,
        stopTime;
    
    (function init() {
        ws = $.socketio('moderator', {
            connected: connected,
            playerInput: playerInput,
            readyForNext: readyForNext
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
            stopTime = true;
            $continue.show();
        }
    }

    function readyForNext() {
        currentQuiz = null;

        $continue.text('Nächste Frage').show();
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

            $continue.hide();

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
        $continue.text('Auflösen').hide();
        $playersReady.hide();

        guesses = [];

        ws.emit('start');

        $game.fadeIn(1000);
        
        setTimeout(adjustFontSize, 50);

        stopTime = false;
        time = 60;
        displayTime();
    }

    function displayTime() {
        var minutes = Math.floor(time / 60) + '',
            seconds = (time % 60) + '';

        while (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        while (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        $time.text(minutes + ':' + seconds);

        if (time === 0 || stopTime) {
            ws.emit('stop', {type: 'stop'});

            $continue.show();
        } else {
            time--;

            setTimeout(displayTime, 1000);
        }
    }

    function adjustFontSize() {
        var startHeight = $start.height(),
            questionHeight = $question.height() / 3,
            playerHeight = $players.height() / 4,
            infoHeight = $info.height(),
            timeHeight = $time.height(),
            continueHeight = $continue.height();

        $start.css({
            fontSize: startHeight - 16,
            lineHeight: startHeight + 'px'
        });
        
        $question.css({
            fontSize: questionHeight - 28,
            lineHeight: (questionHeight - 12) + 'px'
        });
        
        $players.css({
            fontSize: playerHeight - 16,
            lineHeight: playerHeight + 'px'
        });
        
        $info.css({
            fontSize: infoHeight - 16,
            lineHeight: infoHeight + 'px'
        });

        $time.css({
            fontSize: timeHeight - 16,
            lineHeight: timeHeight + 'px'
        });
        
        $continue.css({
            fontSize: continueHeight - 16,
            lineHeight: continueHeight + 'px'
        });
    }
});