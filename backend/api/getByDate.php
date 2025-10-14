<?php

// Datenbank Zungangsdaten einbinden
require_once '../config.php'; 

// JSON aktivieren
header('Content-Type: application/json');

// Verbindung zur Datenbank herstellen
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $date = $_GET['date']; // Datum aus der URL abfragen, z.B. getByDate.php?date=2025-10-13
        // Start- und Endzeit derselben Stunde berechnen
        $start = date('Y-m-d H:00:00', strtotime($date));
        $end   = date('Y-m-d H:59:59', strtotime($date));
    $sql = "SELECT * FROM aare_data WHERE timestamp BETWEEN :start AND :end"; 
    //$sql = "SELECT * FROM aare_data WHERE timestamp BETWEEN '2025-10-14 09:00:00' AND '2025-10-14 09:59:59';"; // Dieser Code funktioniert
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['start' => $start, 'end' => $end]);
    $results = $stmt->fetchAll();
    echo json_encode($results);
}

// Wenn Try fehlschlägt, wird der Catch-Block ausgeführt
catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}


