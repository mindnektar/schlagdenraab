$(function() {
    var $start = $('#start'),
        $letters = $('#letters'),
        $puzzle = $('#puzzle'),
        $solution = $('#solution'),
        $category = $('#cat'),
        
        words = [
            {title: 'EMMENTALER', category: 'Käsesorte'},
            {title: 'LIMBURGER', category: 'Käsesorte'},
            {title: 'ROQUEFORT', category: 'Käsesorte'},
            {title: 'CAMEMBERT', category: 'Käsesorte'},
            {title: 'MOZZARELLA', category: 'Käsesorte'},
            {title: 'GROSSBRITANNIEN', category: 'Insel'},
            {title: 'SARDINIEN', category: 'Insel'},
            {title: 'WANGEROOGE', category: 'Insel'},
            {title: 'NORDERNEY', category: 'Insel'},
            {title: 'FUERTEVENTURA', category: 'Insel'},
            {title: 'MAURITIUS', category: 'Insel'},
            {title: 'NACHTIGALL', category: 'Vogel'},
            {title: 'ROTKEHLCHEN', category: 'Vogel'},
            {title: 'STEINKAUZ', category: 'Vogel'},
            {title: 'BACHSTELZE', category: 'Vogel'},
            {title: 'BUNTSPECHT', category: 'Vogel'},
            {title: 'RINGELTAUBE', category: 'Vogel'},
            {title: 'FELDSPERLING', category: 'Vogel'},
            {title: 'GEWICHTHEBEN', category: 'Sportart'},
            {title: 'SPRINGREITEN', category: 'Sportart'},
            {title: 'LEICHTATHLETIK', category: 'Sportart'},
            {title: 'BAUMSTAMMWERFEN', category: 'Sportart'},
            {title: 'BEACHVOLLEYBALL', category: 'Sportart'},
            {title: 'BOGENSCHIESSEN', category: 'Sportart'},
            {title: 'EISSCHNELLLAUF', category: 'Sportart'},
            {title: 'INLINESKATING', category: 'Sportart'},
            {title: 'SKILANGLAUF', category: 'Sportart'},
            {title: 'STABHOCHSPRUNG', category: 'Sportart'},
            {title: 'SCHLAGZEUG', category: 'Musikinstrument'},
            {title: 'BASSKLARINETTE', category: 'Musikinstrument'},
            {title: 'AKKORDEON', category: 'Musikinstrument'},
            {title: 'KONTRABASS', category: 'Musikinstrument'},
            {title: 'FANFARENTROMPETE', category: 'Musikinstrument'},
            {title: 'VIOLONCELLO', category: 'Musikinstrument'},
            {title: 'BULGARISCH', category: 'Europäische Sprache'},
            {title: 'UNGARISCH', category: 'Europäische Sprache'},
            {title: 'PORTUGIESISCH', category: 'Europäische Sprache'},
            {title: 'ITALIENISCH', category: 'Europäische Sprache'},
            {title: 'GRIECHISCH', category: 'Europäische Sprache'},
            {title: 'WESTFRIESISCH', category: 'Europäische Sprache'},
            {title: 'ABENDKLEID', category: 'Kleidungsstück'},
            {title: 'STRUMPFHOSE', category: 'Kleidungsstück'},
            {title: 'SCHLAFANZUG', category: 'Kleidungsstück'},
            {title: 'BÜSTENHALTER', category: 'Kleidungsstück'},
            {title: 'FAHRRADHELM', category: 'Kleidungsstück'},
            {title: 'FLANELLHEMD', category: 'Kleidungsstück'},
            {title: 'GUMMISTIEFEL', category: 'Kleidungsstück'},
            {title: 'KNICKERBOCKER', category: 'Kleidungsstück'},
            {title: 'MATROSENANZUG', category: 'Kleidungsstück'},
            {title: 'PLATEAUSCHUHE', category: 'Kleidungsstück'},
            {title: 'INGENIEUR', category: 'Beruf'},
            {title: 'DOLMETSCHER', category: 'Beruf'},
            {title: 'HAFENSCHIFFER', category: 'Beruf'},
            {title: 'STEUERBERATER', category: 'Beruf'},
            {title: 'DACHDECKER', category: 'Beruf'},
            {title: 'BANKKAUFMANN', category: 'Beruf'},
            {title: 'FAHRRADMONTEUR', category: 'Beruf'},
            {title: 'MECHATRONIKER', category: 'Beruf'},
            {title: 'BAUGERÄTEFÜHRER', category: 'Beruf'},
            {title: 'RAUMAUSSTATTER', category: 'Beruf'},
            {title: 'SCHORNSTEINFEGER', category: 'Beruf'},
            {title: 'CHEMIELABORANT', category: 'Beruf'},
            {title: 'SEETEUFEL', category: 'Fisch'},
            {title: 'GOLDFISCH', category: 'Fisch'},
            {title: 'BACHFORELLE', category: 'Fisch'},
            {title: 'SILBERKARPFEN', category: 'Fisch'},
            {title: 'SPIEGELROCHEN', category: 'Fisch'},
            {title: 'HECHTDORSCH', category: 'Fisch'},
            {title: 'MINERALWASSER', category: 'Getränk'},
            {title: 'CHAMPAGNER', category: 'Getränk'},
            {title: 'MAGENBITTER', category: 'Getränk'},
            {title: 'MILCHSHAKE', category: 'Getränk'},
            {title: 'MATHEMATIK', category: 'Schulfach'},
            {title: 'GESCHICHTE', category: 'Schulfach'},
            {title: 'GEMEINSCHAFTSKUNDE', category: 'Schulfach'},
            {title: 'HAUSWIRTSCHAFT', category: 'Schulfach'},
            {title: 'PHILOSOPHIE', category: 'Schulfach'},
            {title: 'VERGISSMEINNICHT', category: 'Blume'},
            {title: 'SONNENBLUME', category: 'Blume'},
            {title: 'SCHWERTLILIE', category: 'Blume'},
            {title: 'RHODODENDRON', category: 'Blume'},
            {title: 'GÄNSEBLÜMCHEN', category: 'Blume'},
            {title: 'MAIGLÖCKCHEN', category: 'Blume'},
            {title: 'PFAFFENHÜTCHEN', category: 'Blume'},
            {title: 'SOMMERFLIEDER', category: 'Blume'}
        ],
    
        interactable = true,
        currentSolution,
        currentPuzzle,
        currentLetter,
        delay = 1000,
        gameState = 0,
        t;

    (function init() {
        adjustFontSize();

        $start.click(_startClick);
        $letters.click(_lettersClick);

        $(window).resize(adjustFontSize);
    })();

    function _startClick() {
        interactable = false;

        $start.fadeOut(delay, initWord).unbind('click');
    }
    
    function _lettersClick() {
        if (!interactable) {
            return;
        }

        switch (gameState) {
            case 0:
                gameState = 1;
                clearTimeout(t);

                break;
                
            case 1:
                gameState = 2;
                interactable = false;

                revealLetter();

                break;
                
            case 2:
                gameState = 0;
                interactable = false;

                if (words.length) {
                    $letters.fadeOut(delay, initWord);
                }
        }
    }

    function initWord() {
        var wordId = parseInt(Math.random() * words.length),
            word = words[wordId],
            solution = word.title,
            puzzle = shuffle(solution),
            solutionHtml = '',
            puzzleHtml = '',
            width = (100 - solution.length) / solution.length,
            height = width * 6.18,
            i;

        words.splice(wordId, 1);

        for (i = 0; i < solution.length; i++) {
            solutionHtml += '<li><span>' + solution[i] + '</span></li>';
            puzzleHtml += '<li><span>' + puzzle[i] + '</span></li>';
        }
        
        $solution.html(solutionHtml);
        $puzzle.html(puzzleHtml);
        $category
            .text(word.category)
            .css({bottom: (height + 65) + '%'});
        
        $('li', $letters).width(width + '%');
        $('ul', $letters).height(height + '%');
        
        currentLetter = 0;
        currentPuzzle = puzzle;
        currentSolution = solution;
        
        $letters.fadeIn(delay, revealLetter);
        
        setTimeout(adjustFontSize, 50);
    }
    
    function revealLetter() {
        var $puzzleLetters = $('span', $puzzle),
            $solutionLetters = $('span', $solution),
            posInSolution,
            possibleKeys = [];
        
        if (gameState === 1) {
            return;
        }
        
        if (gameState === 0) {
            interactable = true;
        }
        
        $puzzleLetters.eq(currentLetter).slideUp(200, function() {
            $.each(currentSolution, function(key, letter) {
                if (currentPuzzle[currentLetter] === letter) {
                    possibleKeys.push(key);
                }
            });
            
            posInSolution = possibleKeys[parseInt(Math.random() * possibleKeys.length)];
            currentSolution = currentSolution.substring(0, posInSolution) + '_' + currentSolution.substring(posInSolution + 1);

            $solutionLetters.eq(posInSolution).slideDown(200, function() {
                currentLetter++;
                
                if (currentLetter < currentPuzzle.length) {
                    t = setTimeout(revealLetter, gameState === 0 ? 2000 : 100);
                } else {
                    interactable = true;
                    gameState = 2;
                }
            });
        });
    }
    
    function shuffle(word) {
        var tmp,
            rand,
            i;
        
        word = word.split('');
        
        for (i = 0; i < word.length; i++){
            rand = Math.floor(Math.random() * word.length);
            tmp = word[i]; 
            word[i] = word[rand]; 
            word[rand] = tmp;
        }
        
        return word.join('');
    }

    function adjustFontSize() {
        var startHeight = $start.height(),
            puzzleHeight = $puzzle.height();

        $start.css({
            fontSize: startHeight - 16,
            lineHeight: startHeight + 'px'
        });
        
        $letters.css({
            fontSize: puzzleHeight - 16,
            lineHeight: puzzleHeight + 'px'
        });
        
        $category.css({
            fontSize: puzzleHeight - 32
        })
    }
});
