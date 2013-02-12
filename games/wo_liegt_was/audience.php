<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab - Wo liegt was?</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="../../css/main.css" />
    <link rel="stylesheet" type="text/css" href="../../js/plugins/scoreboard/jquery.scoreboard.css" />
    <link rel="stylesheet" type="text/css" href="css/wo_liegt_was.css" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=geometry"></script>
    <script type="text/javascript" src="../../js/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="../../js/plugins/scoreboard/jquery.scoreboard.js"></script>
    <script type="text/javascript" src="../../js/plugins/socketio/jquery.socketio.js"></script>
    <script type="text/javascript" src="js/audience.js"></script>
</head>
<body>

<div class="wrapper">
    <div id="map" class="audience"></div>
    
    <div class="info blue"></div>
    <div class="info red"></div>
 
    <div id="scoreboard"></div>
</div>

</body>
</html>
