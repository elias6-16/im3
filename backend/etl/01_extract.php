<?php

function fetchAareData() {
    $url = "https://aareguru.existenz.ch/v2018/widget?app=my.app.ch&version=1.0.42";

    // Die nächsten 4 Zeilen können immer so gelassen werden. Sie sind notwendig, um die API anzusprechen.
    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);
    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);
    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}

// Das Pre ist ein HTML-Element, um die Ausgabe lesbarer zu machen.
/*
echo '<pre>';
var_dump(fetchAareData());
echo '</pre>';
*/

return fetchAareData();

?>