$(function() {
    var $wrapper = $('#wrapper'),
        $game = $('#game'),
        $category = $('#category'),
        $list = $('#list'),
        $manual = $('#manual'),
        $manualContent = $('#manual .content'),
        $close = $('#manual .close'),
        $play = $('#manual .play'),
        
        gameHeight = $game.height(),
        categories = [
            {name: 'Action & Risiko', color: '#000'},
            {name: 'Glück & Geschick', color: '#75726c'},
            {name: 'Knobeln & Köpfchen', color: '#eb961e'}
        ],
        currentCategory = 0,
        currentGame = 0,
        shuffling = false,

        opts = {
            manual: location.href.indexOf('manual') >= 0
        };
    
    (function init() {
        removeInactiveGames();

        switchCategory(0);
        
        adjustFontSize();
        
        $list.click(_gameClick);
        $category.click(_categoryClick);
        $close.click(_closeClick);
        
        $(window).resize(adjustFontSize);
    })();
    
    function _categoryClick() {
        if (shuffling) {
            return;
        }
        
        currentCategory++;
        
        if (currentCategory >= categories.length) {
            currentCategory = 0;
        }

        switchCategory(currentCategory);
    }
    
    function _gameClick() {
        if (shuffling) {
            return;
        }
        
        shuffling = true;
        
        shuffle(0, 70, parseInt(Math.random() * 35) + 15);
    }

    function _closeClick() {
        $manual.fadeOut(500, function() {
            $play.hide();
            
            $wrapper.animate({
                bottom: '35%',
                left: '18%',
                right: '18%',
                top: '35%'
            }, {
                duration: 1000,
                step: adjustFontSize,
                complete: function() {
                    shuffling = false;
                }
            });
        });
    }

    function removeInactiveGames() {
        for (var i = 0; i < games.length; i++) {
            for (var j = 0; j < games[i].length; j++) {
                if (!games[i][j].active) {
                    games[i].splice(j, 1);
                    j--;
                }
            }
        }
    }
    
    function shuffle(iteration, interval, slowDownAt) {
        var top = currentGame * -gameHeight;

        currentGame++;
        top -= gameHeight;

        $list.animate({
            top: top
        }, {
            duration: interval,
            complete: function() {
                if (currentGame >= games[currentCategory].length) {
                    currentGame = 0;
                    top = 0;
                    $list.css({top: top});
                }

                if (iteration >= slowDownAt) {
                    interval *= 1.3;
                }
                
                if (interval >= 600) {
                    if (opts.manual) {
                        displayManual();
                    } else {
                        shuffling = false;
                    }
                    return;
                }
                
                shuffle(++iteration, interval, slowDownAt);
            }
        });
    }

    function switchCategory(category) {
        var listHtml = '';

        $category
            .css({background: categories[category].color})
            .text(categories[category].name);

        $.each(games[category], function(_, game) {
            listHtml += '<li>' + game.title + '</li>';
        });

        listHtml += '<li>' + games[category][0].title + '</li>';

        currentGame = 0;

        $list
            .html(listHtml)
            .css({
                color: categories[category].color,
                top: 0
            });
    }

    function displayManual() {
        var game = games[currentCategory][currentGame],
            manual = '';
        
        $.post(
            'xhr/manual.php',
            {game: game.name},
            function(html) {
                manual = html;
            }
        );
        
        $wrapper.animate({
            bottom: '85%',
            left: '2%',
            right: '75%',
            top: '2%'
        }, {
            duration: 1000,
            step: adjustFontSize,
            complete: function() {
                if (!manual) {
                    return setTimeout(arguments.callee, 200);
                }
                
                $manualContent.html('<h1>' + game.title + '</h1>' + manual);
                
                if (game.playable) {
                    $play
                        .attr('href', 'games/' + game.name + '/index.php')
                        .show();
                }

                $manual.fadeIn(500);
            }
        });
    }
    
    function adjustFontSize() {
        gameHeight = $game.height();

        $list.add($category).css({
            fontSize: gameHeight - 16,
            lineHeight: gameHeight + 'px'
        });
        
        $list.css({top: currentGame * -gameHeight});
    }
});
