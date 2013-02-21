$(function() {
    var defaults = {
            next: $.noop,
            solve: $.noop
        },
    
        tpl = '\
            <div id="question">\
                <span></span>\
            </div>\
            <div id="info"></div>\
            <div class="player blue">Blau<div>ist bereit!</div></div>\
            <div class="player red">Rot<div>ist bereit!</div></div>\
            <a href="javascript:" id="continue" class="button disabled"></a>\
        ',
            
        $game,
        $players,
        $playersReady,
        $question,
        $info,
        $continue,
        
        currentQuiz;
            
    $.moderator = function($elem, opts) {
        (function init() {
            s = $.extend({}, defaults, opts);
            
            $game = $elem.html(tpl);
            
            $players = $('.player');
            $playersReady = $('div', $players);
            $question = $('#question');
            $info = $('#info');
            $continue = $('#continue');
            
            $continue.click(_continueClick);
            
            adjustFontSize();
            
            $(window).resize(adjustFontSize);
        })();
        
        this.next = function(quiz) {
            currentQuiz = quiz;
            
            $question.text(currentQuiz.question);
            $info.text(currentQuiz.info || currentQuiz.solution);
            $continue.text('Auflösen').addClass('disabled');
            $playersReady.hide();

            $game.fadeIn(1000);
            
            setTimeout(adjustFontSize, 50);
        };
        
        this.readyForNext = function() {
            currentQuiz = null;

            $continue.text('Nächste Frage').removeClass('disabled');
        };
        
        this.readyToSolve = function() {
            $continue.removeClass('disabled');
        };
        
        this.end = function(winner) {
            $playersReady.hide();
            $('.player.' + winner + ' div').text('gewinnt!').show();
        };
        
        function _continueClick() {
            if (currentQuiz) {
                $continue.addClass('disabled');
                s.solve(currentQuiz.solution);
            } else {
                $game.fadeOut(1000, s.next);
            }
        }
        
        return this;
    };

    function adjustFontSize() {
        var fontSizeDifference = Math.floor(window.innerHeight / 52),
            questionHeight = $question.innerHeight() / 3,
            playerHeight = $players.height() / 4,
            infoHeight = $info.height();
        
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