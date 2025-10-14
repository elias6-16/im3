 // Fetch mit getAll.php
 /*async function getAll() {
   const url = 'https://im3.bevoelker-o-mat.ch/backend/api/getALL.php';
    try {
    const response = await fetch(url); // holt die Daten von der API
    const data = await response.json(); // lädt die Daten als JSON
    console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
    console.error(error)
    }
    }
    getAll(); */

 // Fetch mit getByDate.php
async function getByDate(date) {
    const url = `https://im3.bevoelker-o-mat.ch/backend/api/getByDate.php?date=${date}`;
    try {
        const response = await fetch(url); // holt die Daten von der API
        const data = await response.json(); // lädt die Daten als JSON
        console.log(data); // gibt die Daten der API in der Konsole aus
            // Übergabe der Daten an die Render-Funktion
            renderFromApi(data);
    } catch (error) {
    console.error(error)
    }
    }


const datepicker = document.querySelector('#datePicker');

datepicker.addEventListener('change', function() {
    // Eingabe lesen und Date-Objekte erstellen
    let selected = new Date(this.value);
    const now = new Date();
    // Falls Datum in der Zukunft → auf aktuelle Zeit zurücksetzen
    if (selected > now) {
        selected = now;
        // Sichtbar im Input-Feld aktualisieren (lokales Format)
        const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16); // z. B. "2025-10-14T11:00"
        this.value = localISO; 
    }
    // Minuten, Sekunden & Millisekunden auf 0 setzen → volle Stunde
    selected.setMinutes(0, 0, 0);
    console.log('Gerundetes, verwendetes Datum:', selected);
    // Formatierung: "YYYY-MM-DD HH:00:00" (SQL-kompatibel)
    const date = (() => {
        const year = selected.getFullYear();
        const month = String(selected.getMonth() + 1).padStart(2, '0');
        const day = String(selected.getDate()).padStart(2, '0');
        const hour = String(selected.getHours()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:00:00`;
    })();
    console.log(date); // z. B. "2025-10-14 11:00:00", formatiert für API
    getByDate(date); // API-Aufruf mit dem formatierten Datum
});



// — Datenpuffer —
let latestData = null;

// Normalisieren: Array[0] oder Objekt
function normalizeResult(result) {
  return Array.isArray(result) ? result[0] : result;
}

// Wird vom Fetch aufgerufen
function renderFromApi(result) {
  latestData = normalizeResult(result);
  updateCityValues(); // direkt aktuelle Auswahl anzeigen
}

// Werte laut ausgewählter Stadt schreiben
function updateCityValues() {
  if (!latestData) return;

  const active = document.querySelector('input[name="city"]:checked');
  if (!active) return;

  const city = active.value; // z.B. "bern"
  const flow = latestData[`${city}_flow`];
  const temp = latestData[`${city}_temperature`];

  const flowEl = document.getElementById("cityFlow");
  const tempEl = document.getElementById("cityTemp");

  if (flowEl) flowEl.textContent = (flow ?? "—");
  if (tempEl) tempEl.textContent = (temp ?? "—");
}

// ---- ROBUST: Warten bis DOM fertig & Event-Delegation ----
document.addEventListener("DOMContentLoaded", () => {
  // Delegation: funktioniert auch, wenn Radios dynamisch gerendert werden
  document.addEventListener("change", (e) => {
    if (e.target && e.target.matches('input[name="city"]')) {
      updateCityValues();
    }
  });

  // Initial versuchen zu rendern (falls schon Daten da)
  updateCityValues();
});







// Navigation Animiert

 const dropdown = document.querySelector('.dropdown');
  const toggleButton = document.querySelector('.dropdown-toggle');
  const form = document.getElementById('hauptmenue');
  const labels = form.querySelectorAll('label');
  const selectedText = document.getElementById('selected-location').childNodes[0];
  const arrow = document.querySelector('.arrow');

  // Menü auf/zu bei Klick auf Button
  toggleButton.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });

  // Klick auf Label -> Auswahl übernehmen + speichern
  labels.forEach(label => {
    label.addEventListener('click', () => {
      const input = label.querySelector('input');
      input.checked = true;

      const ortName = label.textContent.trim();
      selectedText.textContent = ortName;

      // Speichern im localStorage
      localStorage.setItem('ausgewählterOrt', ortName.toLowerCase());

      dropdown.classList.remove('active');
    });
  });

  // Klick außerhalb -> Menü schließen
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // Beim Laden: gespeicherten Wert abrufen
  window.addEventListener('DOMContentLoaded', () => {
    const gespeicherterOrt = localStorage.getItem('ausgewählterOrt');
    if (gespeicherterOrt) {
      // Button-Text anpassen
      const capitalized = gespeicherterOrt.charAt(0).toUpperCase() + gespeicherterOrt.slice(1);
      selectedText.textContent = capitalized;

      // Das passende Radio-Feld aktivieren
      const input = document.querySelector(`input[value="${gespeicherterOrt}"]`);
      if (input) input.checked = true;
    }
  });




