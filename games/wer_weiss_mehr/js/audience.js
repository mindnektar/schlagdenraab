$(function() {
    var $question = $('#question div'),
        $scoreboard = $('#scoreboard'),
        $timer = $('#timer'),
        $solutions = $('#solutions'),
        $solutionsList,

        ws,
        scoreboard,
        timer,
        solution;

    (function init() {
        scoreboard = $.scoreboard($scoreboard, {
            gameOver: gameOver,
            layout: 'stacked',
            scoreToWin: 4,
            size: 'large'
        });

        timer = $.timer($timer, {
            seconds: 30
        });

        ws = $.socketio('audience', {
            solve: solve,
            start: start,
            adjustPoints: adjustPoints,
            toggleTimer: toggleTimer,
            resetTimer: resetTimer
        });
    })();

    function solve() {
        $solutionsList.addClass('unsolved');

        ws.emit('readyForNext');
    }

    function start(data) {
        solution = data.solution;
        $question.html('<span>' + data.question + '</span>').textfill();

        // TODO: solution list

        $solutionsList = $('li', $solutions);
    }

    function adjustPoints(data) {
        scoreboard.adjustPoints(data.receiver, data.points);
    }

    function toggleTimer() {
        timer.toggle();
    }

    function resetTimer() {
        timer.start();
    }

    function gameOver(who) {
        ws.emit('gameOver', {winner: who});
    }
});