<?php
$path = '../db/games';

$data = json_decode(file_get_contents($path), true);

foreach ($data as $i => $games) {
    foreach ($games as $j => $game) {
        $data[$i][$j]['active'] = isset($_POST[$game['name']]);
    }
}

file_put_contents($path, json_encode($data));
