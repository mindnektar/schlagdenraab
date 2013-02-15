<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab - Wo liegt was?</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="../../css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/wo_liegt_was.css" />
    <script type="text/javascript" src="../../js/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="../../js/plugins/socketio/jquery.socketio.js"></script>
    <script type="text/javascript" src="js/moderator.js"></script>
    <script type="text/javascript" src="js/quiz.js"></script>
</head>
<body>

<div class="wrapper">
    <a href="javascript:" id="start" class="button disabled">Start</a>

    <div id="game">
        <div id="question"><span></span></div>

        <div id="info"></div>

        <div class="player blue">Blau<div>ist bereit!</div></div>
        <div class="player red">Rot<div>ist bereit!</div></div>

        <a href="javascript:" id="continue" class="button disabled"></a>
    </div>
</div>

</body>
</html>
