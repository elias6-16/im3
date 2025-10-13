<?php

// Datenbank Zungangsdaten einbinden
require_once '../config.php'; 

// JSON aktivieren
header('Content-Type: application/json');

// Verbindung zur Datenbank herstellen
try {
    // Erstellt eine neue Variable "PDO" mit Werten aus config.php. PDO ist immer eine Verbindung von PHP zu einer Datenbank. -> Login zur Datenbank
    $pdo = new PDO($dsn, $username, $password, $options);
    $today = date('Y-m-d'); // Heutiges Datum im Format 'YYYY-MM-DD'
    // SQL-Befehl zum Laden der Daten 
    $sql = "SELECT * FROM aare_data WHERE DATE(timestamp) = :today"; 
    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);
    // SQL-Anweisung ausführen
        $stmt->execute(['today' => $today]);
    // Daten in Empfang nehmen
    $results = $stmt->fetchAll();
    // Daten als JSON ausgeben
    echo json_encode($results);
}

// Wenn Try fehlschlägt, wird der Catch-Block ausgeführt
catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}