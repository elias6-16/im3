<?php

$data = include('02_transform.php');

require_once '../config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue Variable "PDO" mit Werten aus config.php. PDO ist immer eine Verbindung von PHP zu einer Datenbank.
    $pdo = new PDO($dsn, $username, $password, $options);
    // Hier kommt der SQL-Befehl, um Daten in die Tabelle einzufügen. Fragezeichen sind Platzhalter für die Werte, die später gebunden werden.
    $sql = "INSERT INTO aare_data (brienz_flow, brienz_temperature, interlaken_flow, interlaken_temperature, thun_flow, thun_temperature, bern_flow, bern_temperature, hagneck_flow, hagneck_temperature, biel_flow, biel_temperature, olten_flow, olten_temperature, brugg_flow, brugg_temperature) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
        $stmt->execute([
            $data['brienz_flow'],
            $data['brienz_temperature'],
            $data['interlaken_flow'],
            $data['interlaken_temperature'],
            $data['thun_flow'],
            $data['thun_temperature'],
            $data['bern_flow'],
            $data['bern_temperature'],
            $data['hagneck_flow'],
            $data['hagneck_temperature'],
            $data['biel_flow'],
            $data['biel_temperature'],
            $data['olten_flow'],
            $data['olten_temperature'],
            $data['brugg_flow'],
            $data['brugg_temperature'],
            
        ]);


    echo "Daten erfolgreich eingefügt.";
}

// Wenn Try fehlschlägt, wird der Catch-Block ausgeführt
catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}