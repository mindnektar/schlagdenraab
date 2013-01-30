<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/games.css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript">
        var games = <?php echo file_get_contents('db/games'); ?>;
    </script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>

<div class="wrapper">
    <div id="category"></div>

    <div id="game">
        <ul id="list"></ul>
    </div>
</div>

<div id="manual" class="container">
    <a href="javascript:" class="close">Schließen</a>
    <a href="" target="_blank" class="play">Spielen</a>
    
    <div class="content"></div>
</div>

</body>
</html>
