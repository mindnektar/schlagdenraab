$(function() {
    var defaults = {
            seconds: 60,
            timeOver: $.noop
        },
        
        $timer,

        s,
        remainingSeconds,
        stopTime;
    
    $.timer = function($elem, opts) {
        (function init() {
            s = $.extend({}, defaults, opts);

            remainingSeconds = s.seconds;
            $timer = $elem.addClass();

            displayTime();
        })();

        this.start = function() {
            stopTime = false;
            remainingSeconds = s.seconds;
            step();
        };

        this.stop = function() {
            stopTime = true;
        };

        return this;
    };

    function step() {
        displayTime();

        if (remainingSeconds === 0 || stopTime) {
            s.timeOver && s.timeOver();
        } else {
            remainingSeconds--;

            setTimeout(step, 1000);
        }
    }

    function displayTime() {
        var minutes = Math.floor(remainingSeconds / 60) + '',
            seconds = (remainingSeconds % 60) + '';

        while (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        while (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        $timer.text(minutes + ':' + seconds);
    }
});
