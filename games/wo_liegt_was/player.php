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
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="../../js/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="../../js/plugins/socketio/jquery.socketio.js"></script>
    <script type="text/javascript" src="js/player.js"></script>
</head>
<body>

<div class="wrapper">
    <div id="mapwrap">
        <div id="map"></div>
    </div>

    <a href="javascript:" id="submit" class="button disabled">Abschicken</a>
</div>

</body>
</html>
