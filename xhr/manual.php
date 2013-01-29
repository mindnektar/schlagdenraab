<?php
$manual = '404';

if (isset($_POST['game'])) {
    $game = $_POST['game'];
    $filename = '../games/' . $game . '.html';

    if (is_file($filename)) {
        $manual = file_get_contents($filename);
    }
}

echo $manual;
