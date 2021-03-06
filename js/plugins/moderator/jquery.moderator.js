$(function() {
    var defaults = {
            next: $.noop,
            solve: $.noop,
            timerControls: false
        },
    
        tpl = '\
            <div id="question"><div></div></div>\
            <div id="info"></div>\
            \
            <div class="player blue">\
                <div class="name"><span>Blau</span></div>\
                <a href="javascript:" class="adjust minus" data-who="blue" data-points="-1">-</a>\
                <a href="javascript:" class="adjust plus" data-who="blue" data-points="1">+</a>\
                <div class="status"><span></span></div>\
            </div>\
            \
            <div class="player red">\
                <div class="name"><span>Rot</span></div>\
                <a href="javascript:" class="adjust minus" data-who="red" data-points="-1">-</a>\
                <a href="javascript:" class="adjust plus" data-who="red" data-points="1">+</a>\
                <div class="status"><span></span></div>\
            </div>\
            \
            <a href="javascript:" id="toggle-timer" class="button">Timer Start/Stop</a>\
            <a href="javascript:" id="reset-timer" class="button">Timer zurücksetzen</a>\
            <a href="javascript:" id="continue" class="button disabled"></a>\
        ',
            
        $game,
        $players,
        $playersName,
        $playersStatus,
        $question,
        $info,
        $toggleTimer,
        $resetTimer,
        $continue,
        
        currentQuiz,
        s,
        ws;
            
    $.moderator = function($elem, socket, opts) {
        (function init() {
            s = $.extend({}, defaults, opts);
            ws = socket;
            
            $game = $elem.append(tpl);
            
            $players = $('.player');
            $playersName = $('.name',$players);
            $playersStatus = $('.status', $players);
            $question = $('#question div');
            $info = $('#info');
            $toggleTimer = $('#toggle-timer');
            $resetTimer = $('#reset-timer');
            $continue = $('#continue');
            
            $continue.click(_continueClick);
            $('.adjust').click(_adjustClick);

            if (s.timerControls) {
                $toggleTimer.click(_toggleTimerClick);
                $resetTimer.click(_resetTimerClick);
            } else {
                $toggleTimer.hide();
                $resetTimer.hide();
            }
        })();
        
        this.next = function(quiz) {
            currentQuiz = quiz;
            
            $question.html('<span>' + currentQuiz.question + '</span>');
            $info.html('<span>' + (currentQuiz.info || currentQuiz.solution) + '</span>');
            $continue.text('Auflösen').addClass('disabled');
            $playersStatus.removeClass('ready');

            $game.fadeIn(1000);
            
            setTimeout(function() {
                $playersName.textfill();
                $info.textfill();
                $question.textfill();
            }, 50);
        };

        this.playerIsReady = function(who) {
            $('.player.' + who + ' .status').addClass('ready');
        };
        
        this.readyForNext = function() {
            currentQuiz = null;

            $continue.text('Nächste Frage').removeClass('disabled');
        };
        
        this.readyToSolve = function() {
            $continue.removeClass('disabled');
        };
        
        this.end = function(winner) {
            $continue.hide();
            $('.player.' + winner + ' .status').addClass('winner');
        };
        
        function _continueClick() {
            if (currentQuiz) {
                $continue.addClass('disabled');
                s.solve(currentQuiz.solution);
            } else {
                $game.fadeOut(1000, s.next);
            }
        }

        function _toggleTimerClick() {
            ws.emit('toggleTimer');
        }

        function _resetTimerClick() {
            ws.emit('resetTimer');
        }

        function _adjustClick() {
            ws.emit('adjustPoints', {receiver: $(this).attr('data-who'), points: $(this).attr('data-points')});
        }
        
        return this;
    };
});