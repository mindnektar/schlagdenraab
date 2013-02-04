<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab - Wo liegt was?</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="../../css/main.css" />
    <link rel="stylesheet" type="text/css" href="wo_liegt_was.css" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB5hgmMuTdpNpjyWlsvDlEnFOxBeqZHEtg&amp;sensor=false"></script>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="jquery.json-2.4.min.js"></script>
    <script type="text/javascript" src="jquery.websocket-0.0.1.js"></script>
    <script type="text/javascript" src="player.js"></script>
</head>
<body>

<div class="wrapper">
    <div id="map"></div>
    <button id="submit">Abschicken</button>
</div>

</body>
</html>
