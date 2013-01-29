$(function() {
    var $form = $('#options form'),
        $save = $('#save');

    (function init() {
        $save.click(_saveClick);
    })();

    function _saveClick() {
        $.post(
            'xhr/options.php',
            $form.serialize()
        );
    }
});