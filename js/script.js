 // Fetch
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


    async function getByDate(date) {
   const url = `https://im3.bevoelker-o-mat.ch/backend/api/getByDate.php?date=${date}`;
    try {
        const response = await fetch(url); // holt die Daten von der API
        const data = await response.json(); // lädt die Daten als JSON
        console.log(data); // gibt die Daten der API in der Konsole aus
            const zahlFlow = document.querySelector('.Zahl-Flow');
            zahlFlow.textContent = data.bern_flow;
    } catch (error) {
    console.error(error)
    }
    }
    getByDate();

 const datepicker = document.querySelector('#datePicker');
    datepicker.addEventListener('change', function() {
        const date = datepicker.value;
        getByDate(date);
        console.log(date);
    });

// Eventlistener für Radiobuttons
const radios = document.querySelectorAll('#hauptmenue input[name="ort"]');
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const ort = radio.value;
    const heute = new Date().toISOString().split('T')[0]; // z. B. "2025-10-13"
    getByDate(heute, ort);
  });
});
    
  // Aktuelles Datum und Uhrzeit abrufen
  const now = new Date();
  now.setMinutes(0, 0, 0); // Minuten & Sekunden auf 0 setzen

  // Zeitzonen-Korrektur (lokale Zeit)
  const tzOffset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - tzOffset).toISOString().slice(0,16);

  // Feldwert auf aktuelle (letzte volle) Stunde setzen
  const input = document.getElementById('dateTime');
  input.value = localISOTime;

  // Nur Vergangenes erlauben → max = aktuelles Datum/Zeit
  input.max = localISOTime;

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

