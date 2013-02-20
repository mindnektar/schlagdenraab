$(function() {
    var $scoreboard = $('#scoreboard');
    
    (function init() {
        var scoreboardOpts = {};
        
        $.each(location.search.substring(1).split('&'), function(_, param) {
            var option = param.split('=');
            
            scoreboardOpts[option[0]] = option[1];
        });
        
        $.scoreboard($scoreboard, scoreboardOpts);
    })();
});
