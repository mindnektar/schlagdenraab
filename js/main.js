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
        games = [
            [
                {name: 'abraeumen', title: 'Abräumen'},
                {name: 'armbrust', title: 'Armbrust'},
                {name: 'ball_wedeln', title: 'Ball wedeln'},
                {name: 'medizinbaelle', title: 'Medizinbälle'},
                {name: 'squash', title: 'Squash'},
                {name: 'ball_saugen', title: 'Ball saugen'},
                {name: 'staebchenessen', title: 'Stäbchenessen'},
                //{name: 'das_ei', title: 'Das Ei'},
                {name: 'pusteball', title: 'Pusteball'},
                {name: 'dosenschiessen', title: 'Dosenschießen'},
                {name: 'kartenpusten', title: 'Kartenpusten'},
                {name: 'maexchen', title: 'Mäxchen'},
                {name: 'wuerfeln', title: 'Würfeln'},
                {name: 'kartenduell', title: 'Kartenduell'},
                //{name: 'papierflieger', title: 'Papierflieger'},
                {name: 'katapult', title: 'Katapult'},
                {name: 'hochschuss', title: 'Hochschuss'},
                {name: 'schnibbeln', title: 'Schnibbeln'},
                {name: 'eierlauf', title: 'Eierlauf'},
                {name: 'buecher_tragen', title: 'Bücher tragen'},
                {name: 'bilboquet', title: 'Bilboquet'},
                {name: 'scheiben_schnappen', title: 'Scheiben schnappen'},
                {name: 'elfmeterschiessen', title: 'Elfmeterschießen'},
                {name: 'strippenzieher', title: 'Strippenzieher'}
            ],
            [
                {name: 'bechern', title: 'Bechern'},
                {name: 'wann_war_das', title: 'Wann war das?'},
                {name: 'schaetzen', title: 'Schätzen'},
                {name: 'wo_liegt_was', title: 'Wo liegt was?'},
                {name: 'golf', title: 'Golf'},
                {name: 'slalom', title: 'Slalom'},
                {name: 'curling', title: 'Curling'},
                {name: 'englisch_fussball', title: 'Englisch Fußball'},
                {name: 'entfernungen', title: 'Entfernungen'},
                {name: 'mikado', title: 'Mikado'},
                {name: 'wer_weiss_mehr', title: 'Wer weiß mehr?'},
                //{name: 'schachteltraeger', title: 'Schachtelträger'},
                {name: 'kreiseln', title: 'Kreiseln'},
                {name: 'kugellabyrinth', title: 'Kugellabyrinth'},
                {name: 'zungenbrecher', title: 'Zungenbrecher'},
                {name: 'die_theke', title: 'Die Theke'},
                {name: 'turm_bauen', title: 'Turm bauen'},
                {name: 'balancieren', title: 'Balancieren'},
                {name: 'suchmaschine', title: 'Suchmaschine'},
                {name: 'pachisi', title: 'Pachisi'},
                {name: 'torwand', title: 'Torwand'},
                {name: 'carrom', title: 'Carrom'},
                {name: 'jakkolo', title: 'Jakkolo'},
                {name: 'chipflip', title: 'Chipflip'},
                {name: 'darts', title: 'Darts'}
            ],
            [
                {name: 'memory', title: 'Memory'},
                {name: 'setzkasten', title: 'Setzkasten'},
                {name: 'kofferpacken', title: 'Kofferpacken'},
                {name: 'merk_mal', title: 'Merk mal!'},
                {name: 'buchstabieren', title: 'Buchstabieren'},
                {name: 'buchstaben_zaehlen', title: 'Buchstaben zählen'},
                //{name: 'lieder_summen', title: 'Lieder summen'},
                //{name: 'hoch-stapler', title: 'Hoch-Stapler'},
                {name: 'fremdsprachen', title: 'Fremdsprachen'},
                {name: 'was_fehlt', title: 'Was fehlt?'},
                {name: 'stimmts', title: 'Stimmt\'s?'},
                {name: 'kopfrechnen', title: 'Kopfrechnen'},
                //{name: 'lieder_malen', title: 'Lieder malen'},
                {name: 'sortieren', title: 'Sortieren'},
                {name: 'woerter_rueckwaerts', title: 'Wörter rückwärts'},
                {name: 'geld_fuehlen', title: 'Geld fühlen'},
                {name: 'laenderumrisse', title: 'Länderumrisse'},
                {name: 'marienkaefer', title: 'Marienkäfer'},
                {name: 'knobeln', title: 'Knobeln'},
                {name: 'kuenstlernamen', title: 'Künstlernamen'},
                {name: 'flaggen', title: 'Flaggen', playable: true},
                {name: 'blamieren_oder_kassieren', title: 'Blamieren oder Kassieren'},
                {name: 'autokennzeichen', title: 'Autokennzeichen'}
            ]
        ],
        currentGame = 0,
        shuffling = false,

        opts = {
            manual: location.href.indexOf('manual') >= 0
        };
    
    (function init() {
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
