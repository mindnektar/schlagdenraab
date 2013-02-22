$(function() {
    var $question = $('#question'),
        $input = $('input'),

        allowedKeys = [8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
        //             bs .   0   1   2   3   4   5   6   7   8   9

        ws,
        who = location.href.split('?')[1];
    
    (function init() {
        ws = $.socketio(who, {
            start: start,
            stop: stop
        });

        $input.addClass(who).keypress(_inputKeypress);
    })();

    function start(data) {
        $input.attr('disabled', false).focus();
        $question.html('<span>' + data.question + '</span>').textfill();
    }

    function stop() {
        $input.attr('disabled', true);
    }
    
    function _inputKeypress(e) {
        var value = this.value,
            prefix;

        switch (e.which) {
            case 13:
                if (parseInt(value, 10) === parseFloat(value)) {
                    value = parseInt(value, 10);
                } else {
                    value = parseFloat(value);
                }

                ws.emit('playerInput', {who: who, value: value});
                this.value = '';
                stop();

                return false;

            case 44:
            case 46:
                if (value.indexOf('.') === -1) {
                    this.value = value + '.';
                }

                return false;

            case 45:
                prefix = value.substring(0, 1);

                if (prefix === '-') {
                    this.value = value.substring(1);
                } else {
                    this.value = '-' + value;
                }

                return false;
        }

        return $.inArray(e.which, allowedKeys) !== -1;
    }
});
