<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab - Wo liegt was?</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="../../css/main.css" />
    <link rel="stylesheet" type="text/css" href="../../css/scoreboard.css" />
    <link rel="stylesheet" type="text/css" href="css/wo_liegt_was.css" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB5hgmMuTdpNpjyWlsvDlEnFOxBeqZHEtg&amp;sensor=false&amp;libraries=geometry"></script>
    <script type="text/javascript" src="js/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.socketio.js"></script>
    <script type="text/javascript" src="js/audience.js"></script>
</head>
<body>

<div class="wrapper">
    <div id="map" class="audience"></div>
    
    <div class="info blue"></div>
    <div class="info red"></div>
 
    <div class="score blue">
        <div class="counter-inner">
            <div class="gutter">
                <div class="name">Blau</div>
                <div class="counts">
                    <ul>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="score red">
        <div class="counter-inner">
            <div class="gutter">
                <div class="name">Rot</div>
                <div class="counts">
                    <ul>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
