/**
 * JS Modul til aktiviteter
 */

// Imports
import { dayDateMonth2local, myFetch } from "./helper.js";

// Globale vars
const root = document.querySelector('#root'); // Root element

/**
 * Funktion til at hente og præsentere aktiviteter med 
 */
export const getActivityData = async () => {
    // Henter config settings
    const config = await myFetch('./config.json');

    // Henter data fra localStorage
    let data = JSON.parse(localStorage.getItem('activity_data'));
    let update = new Date(localStorage.getItem('activity_update'));

    // Henter dags dato + næste dag i sekunder
    let curdate = new Date();
    let cur_stamp = Math.round(curdate.getTime()/1000);
    let nextday_stamp = Math.round(curdate.setHours(0, 0, 0, 0)/1000) + 86400;    

    // Beregner antal sekunder siden sidste update
    let seconds_to_update = Math.round((curdate.getTime() - update.getTime()) / 1000);

    // Hvis data er false eller tid siden sidste update er overskredet
    if (!data || seconds_to_update > config.max_seconds_to_last_update) {
        // Henter data fra api 
        //const url = 'https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed';
        const url = './assets/data/data.json';
        const result = await myFetch(url);
        data = result.value;

        // Filtrerer data fdor uønskede uddannelser
        data = data.filter(elm => arr_valid_educations.includes(elm.Education));

        // Mapper data array
        data.map(item => {
            // Fikser tidszone problem i startdato
            item.StartDate = item.StartDate.replace("+01:00", "+00:00");

            // Sætter tidsformat til time:minut på property item.Time
            item.Time = new Date(item.StartDate).toLocaleTimeString(
                'en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            );

            // Sætter property Stamp til aktivitetens tid i antal sekunder
            item.Stamp = Math.round(new Date(item.StartDate).getTime()/1000);

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

    // Henter dags datos aktiviteter 
    let arr_subjects = [];
    arr_subjects.push(...data.filter(elm => elm.Stamp >= cur_stamp && elm.Stamp < nextday_stamp));    

    // Henter næste dags aktiviteter
    let arr_nextday_subjects = [];
    arr_nextday_subjects.push(...data.filter(elm => elm.Stamp >= nextday_stamp));

    // Tilføj næste dags dato og aktiviteter hvis der er nogle
    if(arr_nextday_subjects.length) {
        arr_subjects.push({ day: dayDateMonth2local(arr_nextday_subjects[0].StartDate) })
        arr_subjects.push(...arr_nextday_subjects);
    }

    // Begrænser antal aktiviteter - hent alle hvis 0
    if(config.max_num_activities) {
        arr_subjects = arr_subjects.slice(0,config.max_num_activities);
    }

    // Looper data
    arr_subjects.map(item => {
        if(item.Team) {
            // Udskriv række med aktivitets info hvis property Teams eksisterer
            acc_html += createRow(item);
        } else {
            // Udskriv række med dato 
            acc_html += createDayRow(item);
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
 * @returns {String} html
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
 * Returnerer html table row og dato
 * @param {Object} item 
 * @returns {String} html
 */
function createDayRow(item) {
    return `<tr>
              <td colspan="5">${item.day}</td>
            </tr>`;
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