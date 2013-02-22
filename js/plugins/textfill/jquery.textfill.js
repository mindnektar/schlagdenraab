$(function() {
    $.fn.textfill = function($ourText) {
        var $elem = $(this);

        $ourText = $ourText || $('span:visible:first', this);

        function fill() {
            var maxHeight = $elem.height() * 0.95,
                maxWidth = $elem.width() * 0.95,
                fontSize = maxHeight,
                textHeight,
                textWidth;

            do {
                $ourText.css('font-size', fontSize);
                textHeight = $ourText.height();
                textWidth = $ourText.width();
                fontSize--;
            } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
        }

        fill();

        $(window).resize(fill);

        return this;
    }
});
