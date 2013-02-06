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
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.json-2.4.min.js"></script>
    <script type="text/javascript" src="js/jquery.websocket-0.0.1.js"></script>
    <script type="text/javascript" src="js/moderator.js"></script>
</head>
<body>

<div class="wrapper">
    <a href="javascript:" id="start">Start</a>

    <div id="game">
        <div id="question"></div>
        <div id="info"></div>
        <div class="player blue">Blau<div>Bereit!</div></div>
        <div class="player red">Rot<div>Bereit!</div></div>
        <div id="time"></div>
        <a href="javascript:" id="continue"></a>
    </div>
</div>

</body>
</html>
