$(function() {
    var defaults = {
            equalNumberOfTurns: false,
            gameOver: $.noop,
            layout: 'opposite',
            rounds: 1,
            scoreToWin: 7,
            type: 'list',
            winningRule: 'equalOrAbove'
        },
        
        tpl = {
            wrapper: '\
                <div class="score {who}">\
                    <div class="gutter">\
                        <div class="name">{name}</div>\
                        <div class="points">\
                            <ul>{listItems}</ul>\
                        </div>\
                    </div>\
                </div>\
            ',
            listItem: '\
                <li><span></span></li>\
            '
        },
        
        score = {blue: 0, red: 0},
        
        $score,
        
        s;
    
    $.scoreboard = function($elem, opts) {
        (function init() {
            s = $.extend({}, defaults, opts);
            
            $elem.html(getWrapperTemplate('blue', 'Blau') + getWrapperTemplate('red', 'Rot'));
            
            $score = $('.score');
        })();
        
        this.addPoints = function(who, count) {
            switch (s.type) {
                case 'list':
                    $score.filter('.' + who).find('li').eq(score[who]).addClass('show');
                    count = 1;
                    
                    break;
            }
            
            score[who] += count;

            switch (s.winningRule) {
                case 'exactly':
                    if (score[who] === s.scoreToWin) {
                        s.gameOver(who);
                    }
                    
                    if (score[who] > s.scoreToWin) {
                        score[who] -= count;
                    }
                    break;
                    
                case 'equalOrAbove':
                    if (score[who] >= s.scoreToWin) {
                        s.gameOver(who);
                    }
                    break;
            }
        };
        
        return this;
    };
    
    function getWrapperTemplate(who, name) {
        var listHtml = '',
            i;
        
        switch (s.type) {
            case 'list':
                for (i = 0; i < s.scoreToWin; i++) {
                    listHtml += tpl.listItem;
                }
                
                break;

            case 'counter':
                for (i = 0; i < s.rounds; i++) {
                    listHtml += tpl.listItem;
                }

                break;
        }
        
        return tpl.wrapper
            .replace(/{who}/, who)
            .replace(/{name}/, name)
            .replace('{listItems}', listHtml);
    }
});
