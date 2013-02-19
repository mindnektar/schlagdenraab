$(function() {
    var $scoreboard = $('#scoreboard'),
        $score;
    
    (function init() {
        var scoreboardOpts = {};
        
        $.each(location.search.substring(1).split('&'), function(_, param) {
            var option = param.split('=');
            
            scoreboardOpts[option[0]] = option[1];
        });
        
        $.scoreboard($scoreboard, scoreboardOpts);
        
        $score = $('.score', $scoreboard)
        
        $score.css({marginLeft: -($score.width() / 2)})
    })();
});
