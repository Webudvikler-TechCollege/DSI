/**
 * JS Modul til aktiviteter
 */

// Imports
import { myFetch } from "./helper.js";

// Settings
const update_frequency = 3600; // Antal sekunder til ny update
const root = document.querySelector('#root'); // Root element 

/**
 * Funktion til at hente og præsentere aktiviteter med 
 */
export const getActivityData = async () => {

    // Henter data fra localStorage
    let data = JSON.parse(localStorage.getItem('activity_data'));
    let update = new Date(localStorage.getItem('activity_update'));

    // Henter aktuelle datotid
    let curdate = new Date();
    // Beregner antal sekunder siden sidste update
    let diff_seconds = Math.round((curdate.getTime() - update.getTime()) / 1000);

    // Hvis data er false eller tid siden sidste update er overskredet
    if (!data || diff_seconds > update_frequency) {
        // Henter data fra api 
        const url = 'https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed&$orderBy=StartDate';
        const result = await myFetch(url);
        data = result.value;

        // Filtrerer data fdor uønskede uddannelser
        data = data.filter(elm => elm.Education !== 'Bager/konditor');

        // Mapper data array
        data.map(item => {
            // Fikser tidszone problem i startdato
            item.StartDate = item.StartDate.replace("+01:00", "+00:00");
            // Friendly replace på uddannelse
            item.Education = replaceEducation(item.Education);
            // Friendly replace på fag
            item.Subject = replaceSubject(item.Subject);
        })

        // Sorterer data array efter startdate og education
        data.sort((a, b) => {
            if (a.StartDate === b.StartDate) {
                return a.Education < b.Education ? -1 : 1
            } else {
                return a.StartDate < b.StartDate ? -1 : 1
            }
        })

        // Gemmer data og update dato i localstorage
        localStorage.setItem('activity_data', JSON.stringify(data));
        localStorage.setItem('activity_update', new Date());
    }

    // Bygger html table
    let acc_html = `<table border="0">
                    <tr>
                      <th>Kl.</th>
                      <th>Uddannelse</th>
                      <th>Fag</th>
                      <th>Hold</th>
                      <th>Lokale</th>
                    </tr>
    `;

    // Looper data
    data.map(item => {
        // Kalder startdate som JS date objekt
        let item_date = new Date(item.StartDate);

        // Sætter tidsformat til time:minut på property item.Time
        let hours = String(item_date.getHours()).padStart(2, '0');
        let minutes = String(item_date.getMinutes()).padStart(2, '0');
        item.Time = `${hours}:${minutes}`;

        // Betinger at aktivitetstid er større end nu
        if (item_date > curdate) {
            acc_html += createRow(item);
        }
    })
    // Lukker table tag
    acc_html += '</table>';
    // Indsætter table html i root element
    root.innerHTML = acc_html;

}

/**
 * Returnerer html table row og data 
 * @param {Object} item 
 * @returns {String} Table row and data
 */
function createRow(item) {
    return `<tr>
              <td>${item.Time}</td>
              <td>${item.Education}</td>
              <td>${item.Subject}</td>
              <td>${item.Team}</td>
              <td>${item.Room}</td>
            </tr>
    `
}

/**
 * Udskifter fag koder med navn
 * @param {String} subject 
 * @returns {String} friendly name
 */
const replaceSubject = subject => {
    let friendly = '';
    switch (subject) {
        default:
            friendly = subject;
            break;
        case 'Afsl.prv: Webud':
        case 'Apr:1525, 1':
            friendly = 'Svendeprøve';
            break;
        case 'Graf.tekn.':
            friendly = 'Grafisk teknik';
            break;
        case 'Webudvikler':
            friendly = 'Webudvikling';
            break;
        case 'iværk innova':
            friendly = 'Iværksætteri';
            break;
        case 'graf tekno udv':
            friendly = 'Grafisk Teknologi';
            break;
        case 'komm formid lll':
            friendly = 'Kommunikation';
            break;
        case 'a3dtypo':
        case 'dmålgruppe':
            friendly = 'Adobe After Effects';
            break;
        case 'ggrafikopgaver':
            friendly = 'Adobe Illustrator';
            break;
        case 'andre trykmetod':
            friendly = 'Andre trykmetoder';
            break;
    }
    return friendly;
}

/**
 * Udskifter uddannelses koder med navn
 * @param {String} education 
 * @returns {String} friendly name
 */
const replaceEducation = education => {
    let friendly = '';
    switch (education) {
        default:
            friendly = education;
            break;
        case 'Grafisk teknik.':
            friendly = 'Grafisk tekniker';
            break;
        case 'Data/komm.udd.':
            friendly = 'Webudvikler';
            break;
        case 'AMU indmeld':
            friendly = 'AMU Kursus';
            break;
    }
    return friendly;
}