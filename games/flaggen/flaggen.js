$(function() {
    var $start = $('#start'),
        $flag = $('#flag'),
        $solution = $('#solution'),

        flags = [
            {name: 'Afghanistan', title: 'Afghanistan'},
            {name: 'Albania', title: 'Albanien'},
            {name: 'Algeria', title: 'Algerien'},
            {name: 'Andorra', title: 'Andorra'},
            {name: 'Angola', title: 'Angola'},
            {name: 'Antigua_and_Barbuda', title: 'Antigua und Barbuda'},
            {name: 'Argentina', title: 'Argentinien'},
            {name: 'Armenia', title: 'Armenien'},
            {name: 'Australia', title: 'Australien'},
            {name: 'Austria', title: 'Österreich'},
            {name: 'Azerbaijan', title: 'Aserbaidschan'},
            {name: 'the_Bahamas', title: 'Bahamas'},
            {name: 'Bahrain', title: 'Bahrain'},
            {name: 'Bangladesh', title: 'Bangladesch'},
            {name: 'Barbados', title: 'Barbados'},
            {name: 'Belarus', title: 'Weißrussland'},
            {name: 'Belgium', title: 'Belgien'},
            {name: 'Belize', title: 'Belize'},
            {name: 'Benin', title: 'Benin'},
            {name: 'Bhutan', title: 'Bhutan'},
            {name: 'Bolivia', title: 'Bolivien'},
            {name: 'Bosnia_and_Herzegovina', title: 'Bosnien und Herzegowina'},
            {name: 'Botswana', title: 'Botswana'},
            {name: 'Brazil', title: 'Brasilien'},
            {name: 'Brunei', title: 'Brunei'},
            {name: 'Bulgaria', title: 'Bulgarien'},
            {name: 'Burkina_Faso', title: 'Burkina Faso'},
            {name: 'Burundi', title: 'Burundi'},
            {name: 'Cambodia', title: 'Kambodscha'},
            {name: 'Cameroon', title: 'Kamerun'},
            {name: 'Canada', title: 'Kanada'},
            {name: 'Cape_Verde', title: 'Kap Verde'},
            {name: 'the_Central_African_Republic', title: 'Zentralafrikanische Republik'},
            //{name: 'Chad', title: 'Tschad'},
            {name: 'Chile', title: 'Chile'},
            {name: 'the_People\'s_Republic_of_China', title: 'China'},
            {name: 'Colombia', title: 'Kolumbien'},
            {name: 'the_Comoros', title: 'Komoren'},
            {name: 'the_Democratic_Republic_of_the_Congo', title: 'Demokratische Republik Kongo'},
            {name: 'the_Republic_of_the_Congo', title: 'Republik Kongo'},
            {name: 'Costa_Rica', title: 'Costa Rica'},
            {name: 'Cote_d\'Ivoire', title: 'Elfenbeinküste'},
            {name: 'Croatia', title: 'Kroatien'},
            {name: 'Cuba', title: 'Kuba'},
            {name: 'Cyprus', title: 'Zypern'},
            {name: 'the_Czech_Republic', title: 'Tschechische Republik'},
            {name: 'Denmark', title: 'Dänemark'},
            {name: 'Djibouti', title: 'Dschibuti'},
            {name: 'Dominica', title: 'Dominica'},
            {name: 'the_Dominican_Republic', title: 'Dominikanische Republik'},
            {name: 'Ecuador', title: 'Ecuador'},
            {name: 'Egypt', title: 'Ägypten'},
            {name: 'El_Salvador', title: 'El Salvador'},
            {name: 'Equatorial_Guinea', title: 'Äquatorialguinea'},
            {name: 'Eritrea', title: 'Eritrea'},
            {name: 'Estonia', title: 'Estland'},
            {name: 'Ethiopia', title: 'Äthiopien'},
            {name: 'Fiji', title: 'Fidschi'},
            {name: 'Finland', title: 'Finnland'},
            {name: 'France', title: 'Frankreich'},
            {name: 'Gabon', title: 'Gabun'},
            {name: 'The_Gambia', title: 'Gambia'},
            {name: 'Georgia', title: 'Georgien'},
            {name: 'Germany', title: 'Deutschland'},
            {name: 'Ghana', title: 'Ghana'},
            {name: 'Greece', title: 'Griechenland'},
            {name: 'Grenada', title: 'Grenada'},
            {name: 'Guatemala', title: 'Guatemala'},
            {name: 'Guinea', title: 'Guinea'},
            {name: 'Guinea-Bissau', title: 'Guinea-Bissau'},
            {name: 'Guyana', title: 'Guyana'},
            {name: 'Haiti', title: 'Haiti'},
            {name: 'Honduras', title: 'Honduras'},
            {name: 'Hungary', title: 'Ungarn'},
            {name: 'Iceland', title: 'Island'},
            {name: 'India', title: 'Indien'},
            {name: 'Indonesia', title: 'Indonesien'},
            {name: 'Iran', title: 'Iran'},
            {name: 'Iraq', title: 'Irak'},
            {name: 'Ireland', title: 'Irland'},
            {name: 'Israel', title: 'Israel'},
            {name: 'Italy', title: 'Italien'},
            {name: 'Jamaica', title: 'Jamaika'},
            {name: 'Japan', title: 'Japan'},
            {name: 'Jordan', title: 'Jordanien'},
            {name: 'Kazakhstan', title: 'Kasachstan'},
            {name: 'Kenya', title: 'Kenia'},
            {name: 'Kiribati', title: 'Kiribati'},
            {name: 'North_Korea', title: 'Nordkorea'},
            {name: 'South_Korea', title: 'Südkorea'},
            {name: 'Kuwait', title: 'Kuwait'},
            {name: 'Kyrgyzstan', title: 'Kirgisistan'},
            {name: 'Laos', title: 'Laos'},
            {name: 'Latvia', title: 'Lettland'},
            {name: 'Lebanon', title: 'Libanon'},
            {name: 'Lesotho', title: 'Lesotho'},
            {name: 'Liberia', title: 'Liberia'},
            {name: 'Libya', title: 'Libyen'},
            {name: 'Liechtenstein', title: 'Liechtenstein'},
            {name: 'Lithuania', title: 'Litauen'},
            {name: 'Luxembourg', title: 'Luxemburg'},
            {name: 'Macedonia', title: 'Mazedonien'},
            {name: 'Madagascar', title: 'Madagaskar'},
            {name: 'Malawi', title: 'Malawi'},
            {name: 'Malaysia', title: 'Malaysia'},
            {name: 'Maldives', title: 'Malediven'},
            {name: 'Malta', title: 'Malta'},
            {name: 'the_Marshall_Islands', title: 'Marshallinseln'},
            {name: 'Mauritania', title: 'Mauretanien'},
            {name: 'Mauritius', title: 'Mauritius'},
            {name: 'Mexico', title: 'Mexiko'},
            {name: 'the_Federated_States_of_Micronesia', title: 'Mikronesien'},
            {name: 'Moldova', title: 'Moldawien'},
            //{name: 'Monaco', title: 'Monaco'},
            {name: 'Mongolia', title: 'Mongolei'},
            {name: 'Montenegro', title: 'Montenegro'},
            {name: 'Morocco', title: 'Marokko'},
            {name: 'Mozambique', title: 'Mosambik'},
            {name: 'Myanmar', title: 'Myanmar'},
            {name: 'Namibia', title: 'Namibia'},
            {name: 'Nauru', title: 'Nauru'},
            {name: 'Nepal', title: 'Nepal'},
            {name: 'the_Netherlands', title: 'Niederlande'},
            {name: 'New_Zealand', title: 'Neuseeland'},
            {name: 'Nicaragua', title: 'Nicaragua'},
            {name: 'Niger', title: 'Niger'},
            {name: 'Nigeria', title: 'Nigeria'},
            {name: 'Norway', title: 'Norwegen'},
            {name: 'Oman', title: 'Oman'},
            {name: 'Pakistan', title: 'Pakistan'},
            {name: 'Palau', title: 'Palau'},
            {name: 'Palestine', title: 'Palästina'},
            {name: 'Panama', title: 'Panama'},
            {name: 'Papua_New_Guinea', title: 'Papua-Neuguinea'},
            {name: 'Paraguay', title: 'Paraguay'},
            {name: 'Peru', title: 'Peru'},
            {name: 'the_Philippines', title: 'Philippinen'},
            //{name: 'Poland', title: 'Polen'},
            {name: 'Portugal', title: 'Portugal'},
            {name: 'Qatar', title: 'Katar'},
            //{name: 'Romania', title: 'Rumänien'},
            {name: 'Russia', title: 'Russland'},
            {name: 'Rwanda', title: 'Ruanda'},
            {name: 'Saint_Kitts_and_Nevis', title: 'St. Kitts und Nevis'},
            {name: 'Saint_Lucia', title: 'St. Lucia'},
            {name: 'Saint_Vincent_and_the_Grenadines', title: 'St. Vincent und die Grenadinen'},
            {name: 'Samoa', title: 'Samoa'},
            {name: 'San_Marino', title: 'San Marino'},
            {name: 'Sao_Tome_and_Principe', title: 'São Tomé und Príncipe'},
            {name: 'Saudi_Arabia', title: 'Saudi-Arabien'},
            {name: 'Senegal', title: 'Senegal'},
            {name: 'Serbia', title: 'Serbien'},
            {name: 'Seychelles', title: 'Seychellen'},
            {name: 'Sierra_Leone', title: 'Sierra Leone'},
            {name: 'Singapore', title: 'Singapur'},
            {name: 'Slovakia', title: 'Slovakei'},
            {name: 'Slovenia', title: 'Slowenien'},
            {name: 'the_Solomon_Islands', title: 'Salomonen'},
            {name: 'Somalia', title: 'Somalia'},
            {name: 'South_Africa', title: 'Südafrika'},
            {name: 'South_Sudan', title: 'Südsudan'},
            {name: 'Spain', title: 'Spanien'},
            {name: 'Sri_Lanka', title: 'Sri Lanka'},
            {name: 'Sudan', title: 'Sudan'},
            {name: 'Suriname', title: 'Suriname'},
            {name: 'Swaziland', title: 'Swasiland'},
            {name: 'Sweden', title: 'Schweden'},
            {name: 'Switzerland', title: 'Schweiz'},
            {name: 'Syria', title: 'Syrien'},
            {name: 'the_Republic_of_China', title: 'Taiwan'},
            {name: 'Tajikistan', title: 'Tadschikistan'},
            {name: 'Tanzania', title: 'Tansania'},
            {name: 'Thailand', title: 'Thailand'},
            {name: 'East_Timor', title: 'Osttimor'},
            {name: 'Togo', title: 'Togo'},
            {name: 'Tonga', title: 'Tonga'},
            {name: 'Trinidad_and_Tobago', title: 'Trinidad und Tobago'},
            {name: 'Tunisia', title: 'Tunesien'},
            {name: 'Turkey', title: 'Türkei'},
            {name: 'Turkmenistan', title: 'Turkmenistan'},
            {name: 'Tuvalu', title: 'Tuvalu'},
            {name: 'Uganda', title: 'Uganda'},
            {name: 'Ukraine', title: 'Ukraine'},
            {name: 'the_United_Arab_Emirates', title: 'Vereinigte Arabische Emirate'},
            {name: 'the_United_Kingdom', title: 'Vereinigtes Königreich'},
            {name: 'the_United_States', title: 'Vereinigte Staaten'},
            {name: 'Uruguay', title: 'Uruguay'},
            {name: 'Uzbekistan', title: 'Usbekistan'},
            {name: 'Vanuatu', title: 'Vanuatu'},
            {name: 'the_Vatican_City', title: 'Vatikanstadt'},
            {name: 'Venezuela', title: 'Venezuela'},
            {name: 'Vietnam', title: 'Vietnam'},
            {name: 'Yemen', title: 'Jemen'},
            {name: 'Zambia', title: 'Sambia'},
            {name: 'Zimbabwe', title: 'Simbabwe'}
        ],
        
        solved = false,
        interactable = true,
        delay = 1000;

    (function init() {
        adjustFontSize();

        $start.click(_startClick);
        $flag.click(_flagClick);

        $(window).resize(adjustFontSize);
    })();

    function _startClick() {
        interactable = false;

        $start.fadeOut(delay, pickFlag).unbind('click');
    }

    function _flagClick() {
        if (!interactable) {
            return;
        }

        interactable = false;

        if (solved) {
            solved = false;

            $flag.add($solution).fadeOut(delay).promise().done(function() {
                $solution.css({right: '-100%'}).show();

                pickFlag();
            });
        } else {
            solved = true;

            $solution.animate({
                right: 0
            }, {
                duration: delay / 2,
                complete: function() {
                    interactable = true;
                }
            });
        }
    }

    function pickFlag() {
        var flag = flags[parseInt(Math.random() * flags.length)],
            fileName = 'Flag_of_' + flag.name + '.svg',
            fileNameHash = md5(fileName),
            pA = fileNameHash.substring(0, 1),
            pB = fileNameHash.substring(0, 2),
            url = 'http://upload.wikimedia.org/wikipedia/commons/' + pA + '/' + pB + '/' + fileName;

        $('<img>').attr({src: url}).load(function() {
            $flag
                .css({backgroundImage: 'url(' + url + ')'})
                .fadeIn(delay, function()  {
                    interactable = true;
                });
        });

        $solution.text(flag.title);
    }

    function adjustFontSize() {
        var startHeight = $start.height();

        $start.css({
            fontSize: startHeight - 16,
            lineHeight: startHeight + 'px'
        });

        $solution.css({fontSize: $solution.height() - 22});
    }
});
