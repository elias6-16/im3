<?php

// Datenbank Zungangsdaten einbinden
require_once '../config.php'; 

// JSON aktivieren
header('Content-Type: application/json');

// Verbindung zur Datenbank herstellen
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $date = $_GET['date']; // Datum aus der URL abfragen, z.B. getByDate.php?date=2025-10-13
    $sql = "SELECT * FROM aare_data WHERE DATE(timestamp) = :date"; 
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['date' => $date]);
    $results = $stmt->fetchAll();
    echo json_encode($results);
}

// Wenn Try fehlschlägt, wird der Catch-Block ausgeführt
catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}