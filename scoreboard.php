<?php
header('Content-Type: text/html; charset=utf-8');
$cameraUrl = isset($_GET['camera']) ? $_GET['camera'] : 'http://localhost:8080';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/scoreboard.css" />
    <link rel="stylesheet" type="text/css" href="js/plugins/scoreboard/jquery.scoreboard.css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/plugins/scoreboard/jquery.scoreboard.js"></script>
    <script type="text/javascript" src="js/scoreboard.js"></script>
</head>
<body>

<div class="wrapper">
    <iframe id="camera" src="<?php echo $cameraUrl; ?>" width="1280" height="720"></iframe>

    <div id="scoreboard"></div>
</div>

</body>
</html>