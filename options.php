<?php
header('Content-Type: text/html; charset=utf-8');

$data = json_decode(file_get_contents('db/games'), true);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Schlag den Raab</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/options.js"></script>
</head>
<body>

<div id="options" class="container">
    <div class="content">
        <h1>Aktive Spiele</h1>
        <form action="">
<?php
foreach ($data as $games) {
?>
            <div>
<?php
    foreach ($games as $game) {
?>
                <label>
                    <input type="checkbox" name="<?php echo $game['name']; ?>"<?php echo $game['active'] ? ' checked="checked"' : ''; ?> /> <?php echo $game['title']; ?>
                </label>
<?php
    }
?>
                <br class="clear" />
            </div>
<?php
}
?>
        </form>
        <input id="save" type="submit" value="Speichern" />
    </div>
</div>

</body>
</html>
