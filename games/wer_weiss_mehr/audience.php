<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab - Wer weiß mehr?</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="../../css/main.css" />
    <link rel="stylesheet" type="text/css" href="../../js/plugins/scoreboard/jquery.scoreboard.css" />
    <link rel="stylesheet" type="text/css" href="../../js/plugins/timer/jquery.timer.css" />
    <link rel="stylesheet" type="text/css" href="css/wer_weiss_mehr.css" />
    <script type="text/javascript" src="../../js/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="../../js/plugins/scoreboard/jquery.scoreboard.js"></script>
    <script type="text/javascript" src="../../js/plugins/textfill/jquery.textfill.js"></script>
    <script type="text/javascript" src="../../js/plugins/timer/jquery.timer.js"></script>
    <script type="text/javascript" src="../../js/plugins/socketio/jquery.socketio.js"></script>
    <script type="text/javascript" src="js/audience.js"></script>
</head>
<body>

<div class="wrapper">
    <div id="question" class="audience"><div></div></div>

    <div id="solutions"></div>

    <div id="scoreboard"></div>

    <div id="timer"></div>
</div>

</body>
</html>
