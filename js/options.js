$(function() {
    var $form = $('#options form'),
        $games = $('input', $form),
        $save = $('#save');

    (function init() {
        $save.click(_saveClick);
    })();

    function _saveClick() {
        var data = [];
        $.each($games, function(_, game) {

        });
    }
});