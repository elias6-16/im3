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