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


// Datumsauswahl
const datepicker = document.querySelector('#datePicker');
// Funktion zur Aktualisierung des Datums
function updateDate(dateObj) {
    // Minuten, Sekunden & Millisekunden auf 0 setzen → volle Stunde
    dateObj.setMinutes(0, 0, 0);
    // ISO-Format für Input-Feld (lokale Zeit)
    const localISO = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // z. B. "2025-10-14T11:00"
    datepicker.value = localISO;
    // Formatierung: "YYYY-MM-DD HH:00:00" (SQL-kompatibel)
    const formatted = (() => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hour = String(dateObj.getHours()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:00:00`;
    })();
    console.log('Gerundetes, verwendetes Datum:', formatted);
    getByDate(formatted); // API-Aufruf mit formatiertem Datum
    updateStatusText(); // Status-Text aktualisieren
}
// Eventlistener für manuelle Änderung vom Datum
datepicker.addEventListener('change', function() {
    let selected = new Date(this.value);
    const now = new Date();
    // Falls Datum in der Zukunft → auf aktuelle Zeit zurücksetzen
    if (selected > now) selected = now;
    updateDate(selected);
});

// Beim Laden der Seite: aktuelles Datum setzen und abrufen
window.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    updateDate(now);
    updateStatusText();
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

// Stadtwerte aktualisieren, wenn sich die Stadt ändert
function updateCityValues() {
  if (!latestData) return;

  const active = document.querySelector('input[name="city"]:checked');
  if (!active) return;

  const city = active.value; // z.B. "bern"

  // Keys aus der API: bern_flow, bern_temperature, usw.
  const flow = latestData[`${city}_flow`];
  const temp = latestData[`${city}_temperature`];

  const flowEl = document.getElementById("cityFlow");
  const tempEl = document.getElementById("cityTemp");

  if (flowEl) flowEl.textContent = (flow ?? "—");
  if (tempEl) tempEl.textContent = (temp != null ? `${temp}°C` : "—");

  // Video-Shift passend zum Flow
  if (typeof setWaveShiftFromFlow === "function") {
    setWaveShiftFromFlow(flow);
  }
}

function updateStatusText() {
  const statusText = document.getElementById("statusText");
  const dateInput = document.getElementById("datePicker");
  const activeCity = document.querySelector('input[name="city"]:checked');

  if (!statusText || !dateInput || !dateInput.value || !activeCity) return;

  const dateObj = new Date(dateInput.value);

  const datePart = dateObj.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const timePart = dateObj.toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const label = activeCity.closest("label");
  const cityName = label ? label.textContent.trim() : "";

  statusText.textContent = `flossen am ${datePart}, ${timePart} Uhr in ${cityName}.`;
}





document.addEventListener("DOMContentLoaded", () => {
  // Datum initial laden
  updateDate(new Date());

  // Dropdown / Ort Auswahl
  const dropdown = document.querySelector(".dropdown");
  const toggleButton = document.querySelector(".dropdown-toggle");
  const form = document.getElementById("hauptmenue");
  const selectedLocation = document.getElementById("selected-location");
  const selectedText = selectedLocation?.childNodes?.[0];

  if (!dropdown || !toggleButton || !form || !selectedText) return;

  const setCity = (input) => {
    if (!input) return;

    input.checked = true;
    localStorage.setItem("ausgewaehlterOrt", input.value);

    const label = input.closest("label");
    if (label) selectedText.textContent = label.textContent.trim();

    // sofort neu zeichnen (falls Daten schon da sind)
    updateCityValues();
    updateStatusText();
  };

  // Dropdown auf/zu
  toggleButton.addEventListener("click", () => dropdown.classList.toggle("active"));

  // Klick ausserhalb schliesst Dropdown
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("active");
  });

  // Ein einziger Listener fuer die ganze Liste (statt labels.forEach)
  form.addEventListener("click", (e) => {
    const label = e.target.closest("label");
    if (!label) return;

    const input = label.querySelector('input[name="city"]');
    if (!input) return;

    dropdown.classList.remove("active");
    setCity(input);
  });

  // Beim Laden: gespeicherten Ort setzen (oder die HTML-Default-Auswahl nehmen)
  const saved = localStorage.getItem("ausgewaehlterOrt");
  const initialInput =
    (saved && form.querySelector(`input[name="city"][value="${saved}"]`)) ||
    form.querySelector('input[name="city"]:checked');

  setCity(initialInput);
});


// Konfiguration für die Kalibrierung vom Video
const FLOW_MIN = 0;
const FLOW_MAX = 400;

const SHIFT_LOW = 20;     // in % (tief: nach unten)
const SHIFT_HIGH = -20;   // in % (hoch: nach oben)

const VIDEO_SCALE = 1.5;

let lastFlow = null;

function mapFlowToShiftPercent(flow) {
  if (flow == null || isNaN(flow)) return 0;
  const t = Math.max(0, Math.min(1, (flow - FLOW_MIN) / (FLOW_MAX - FLOW_MIN)));
  return SHIFT_LOW + (SHIFT_HIGH - SHIFT_LOW) * t;
}

function setWaveShiftFromFlow(flow) {
  const video = document.getElementById("background-video");
  if (!video) return;

  lastFlow = flow;

  const shiftPercent = mapFlowToShiftPercent(flow);
  const shiftPx = (shiftPercent / 100) * window.innerHeight;

  video.style.transform =
    `translate(-50%, calc(-50% + ${shiftPx}px)) scale(${VIDEO_SCALE})`;
}

// Bei Resize neu berechnen, sonst stimmt die Umrechnung % -> px nicht mehr
window.addEventListener("resize", () => {
  if (lastFlow !== null) setWaveShiftFromFlow(lastFlow);
});
