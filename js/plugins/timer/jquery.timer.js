$(function() {
    var defaults = {
            dangerZone: 5,
            seconds: 60,
            timeOver: $.noop
        },
        
        $timer,

        s,
        remainingSeconds,
        stopTime,
        sound;
    
    $.timer = function($elem, opts) {
        (function init() {
            s = $.extend({}, defaults, opts);

            remainingSeconds = s.seconds;
            $timer = $elem.addClass();
            sound = $.sound(['warning', 'end']);

            displayTime();
        })();

        this.start = function() {
            stopTime = false;
            remainingSeconds = s.seconds;
            $timer.css({color: '#000'});
            step();
        };

        this.stop = function() {
            stopTime = true;
        };

        this.toggle = function() {
            stopTime = !stopTime;

            if (remainingSeconds === 0) {
                stopTime = true;
            }

            if (!stopTime) {
                setTimeout(step, 1000);
            }
        };

        return this;
    };

    function step() {
        if (stopTime) {
            return;
        }

        displayTime();

        if (remainingSeconds === 0) {
            sound.play('end');
            s.timeOver && s.timeOver();
        } else {
            if (remainingSeconds <= 4) {
                sound.play('warning');
            }

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

        if (remainingSeconds === s.dangerZone) {
            $timer.css({color: '#f00'});
        }

        $timer.text(minutes + ':' + seconds);
    }
});
