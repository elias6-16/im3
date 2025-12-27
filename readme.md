Kurzbeschreibung
Wir haben eine interaktive Webseite erstellt, auf der die Besucher:innen den Wasserstand der Aare an verschiedenen Standorten zu verschiedenen Zeitpunkten nachschauen können. Der datenjournalistische Nutzen liegt in der strukturierten Aufbereitung von Daten, der transparenten Darstellung von Zusammenhängen sowie der nutzerfreundlichen Darstellung auf verschiedenen Endgeräten. Um die Darstellung attraktiver zu gestalten, haben wir im Hintergrund eine Animation von Wasser, die sich abhängig vom Wasserstand weiter nach oben oder unten schiebt. 

Learnings
Wir konnten unsere Kenntnisse in HTML, CSS und JavaScript verbessern. Dabei besonders
    Event Listener gezielt einsetzen und korrekt auslösen
	Kleine Strukturfehler können grosse Auswirkungen haben
    Wenn im CSS eine Angabe mehrfach definiert wird auf verschiedenen Objekten, führt dies zu Fehlern -> mehrere Stunden Fehlersuche, weil wir den Z-Index mehrfach definiert haben. 
Wir haben zum ersten Mal den ETL-Prozess durchgespielt und eine eigene API mit einer Datenbank erstellt. 
Wir haben den sicheren Umgang mit sensiblen Daten gelernt, damit diese nicht auf Github landen. 

Schwierigkeiten
Dropdown-Menüs funktionierten auf Mobile zunächst nicht korrekt, da der Z-Index mehrfach definiert war und diese sich gegenseitig überschrieben haben.
Die automatische Aktualisierung der Daten bei der Eingabe von einem neuen Ort funktionierte lange nicht. Beim Datum funktionierte es. 
Die Positionierung von Header-Elementen über Video war fehleranfällig.
Das Video verschiebte sich lange nicht korrekt mit den neuen Daten vom Wasserstand. Das Problem war, dass wir mit den falschen CSS-Attributen arbeiteten. 



Benutzte Ressourcen
Eigenes Knowhow (insbesondere im HTML, CSS, JavaScript)
Aufzeichnungen vom IM-Team der FHGR
Online-Dokumentationen (z. B. W3Schools und andere Blogs)
Testen auf verschiedenen Geräten und Bildschirmgrössen
ChatGPT und Gemini zum finden von Fehlern im Code. Insbesondere im JavaScript
