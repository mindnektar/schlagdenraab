$(function() {
    var defaults = {
            equalNumberOfTurns: false,
            gameOver: $.noop,
            layout: 'across', // across, stacked
            negativePossible: false,
            nextRound: $.noop,
            rounds: 1,
            scoreToWin: 7,
            size: 'small', // large, small
            type: 'list', // counter, list
            winningRule: 'equalOrAbove' // equalOrAbove, exactly
        },
        
        tpl = {
            wrapper: '\
                <div class="score {who} {type} {layout} {size}">\
                    <div class="gutter">\
                        <div class="name">{name}</div>\
                        <div class="points">\
                            <ul>{listItems}</ul>\
                        </div>\
                    </div>\
                </div>\
            ',
            listItem: '\
                <li><span>0</span></li>\
            '
        },

        emptyRound = {blue: 0, red: 0},
        score = [emptyRound],
        finalScore = emptyRound,
        round = 0,
        
        $score,
        
        s;
    
    $.scoreboard = function($elem, opts) {
        (function init() {
            s = $.extend({}, defaults, opts);
            
            $elem.html(getWrapperTemplate('blue', 'Blau') + getWrapperTemplate('red', 'Rot'));
            
            $score = $('.score');

            if (s.layout === 'stacked') {
                $score.css({marginLeft: -($score.width() / 2)})
            }
        })();
        
        this.adjustPoints = function(who, count) {
            var $list = $score.filter('.' + who).find('li');

            count = parseInt(count, 10) || 1;

            if (!s.negativePossible && score[round][who] + count < 0) {
                return this;
            }

            switch (s.type) {
                case 'list':
                    if (count > 0) {
                        $list.eq(score[round][who]).addClass('show');
                        score[round][who] += count;
                    } else {
                        score[round][who] += count;
                        $list.eq(score[round][who]).removeClass('show');
                    }
                    
                    break;

                case 'counter':
                    score[round][who] += count;
                    $list.eq(round).text(score[round][who]);

                    break;
            }

            switch (s.winningRule) {
                case 'exactly':
                    if (score[round][who] === s.scoreToWin) {
                        endRound();
                    }
                    
                    if (score[round][who] > s.scoreToWin) {
                        score[round][who] -= count;
                    }
                    break;
                    
                case 'equalOrAbove':
                    if (score[round][who] >= s.scoreToWin) {
                        endRound();
                    }
                    break;
            }
        };
        
        return this;
    };

    function endRound() {
        finalScore.blue += score[round].blue;
        finalScore.red += score[round].red;

        if (round === s.rounds - 1) {
            s.gameOver(getWinner());
        } else {
            score[++round] = emptyRound;
        }
    }

    function getWinner() {
        if (finalScore.blue > finalScore.red) {
            return 'blue';
        } else if (finalScore.red > finalScore.blue) {
            return 'red';
        } else {
            return 'draw';
        }
    }
    
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
            .replace(/{type}/, s.type)
            .replace(/{layout}/, s.layout)
            .replace(/{size}/, s.size)
            .replace(/{who}/, who)
            .replace(/{name}/, name)
            .replace('{listItems}', listHtml);
    }
});
