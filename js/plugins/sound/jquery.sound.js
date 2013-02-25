$(function() {
    var $body = $('body'),

        sounds = {};

    $.sound = function(names) {
        $.each(names, function(_, name) {
            sounds[name] = $(new Audio('/schlagdenraab/sound/' + name + '.ogg')).appendTo($body)[0];
        });

        this.play = function(name) {
            sounds[name].play();
        }

        return this;
    };
});
