  // Aktuelles Datum und Uhrzeit im Input-Feld setzen
  const now = new Date();
  now.setMinutes(0, 0, 0); // Minuten & Sekunden auf 0 setzen
  const tzOffset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - tzOffset).toISOString().slice(0,16);
  document.getElementById('dateTime').value = localISOTime;