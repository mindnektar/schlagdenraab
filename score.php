<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab - Punktestand</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/score.css" />
    <script type="text/javascript" src="js/jquery.js"></script>
</head>
<body>

<div class="wrapper" id="scoreboard">
    <ul id="gamelist">
<?php for ($i = 1; $i <= 15; $i++) { ?>
        <li><?php echo $i; ?></li>
<?php } ?>
    </ul>

    <div class="scorecontainer">
        <div class="name">ROT</div>
        <div class="totalscore"></div>
        <div class="progress"></div>
        <div class="scorelist"></div>
    </div>

    <div class="scorecontainer">
        <div class="name">BLAU</div>
        <div class="totalscore"></div>
        <div class="progress"></div>
        <div class="scorelist"></div>
    </div>
</div>

</body>
</html>
