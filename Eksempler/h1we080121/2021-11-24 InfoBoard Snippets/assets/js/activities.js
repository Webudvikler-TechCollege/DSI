import { convert2Timezone, myFetch } from "./helper.js";

const update_frequency = 3600;
const root = document.querySelector('#root');

export const getActivityData = async () => {
    let data = JSON.parse(localStorage.getItem('activity_data'));
    let update = (localStorage.getItem('activity_update')) ?
                     new Date(localStorage.getItem('activity_update')) : new Date();

    let curdate = new Date();
    console.log(curdate);

    let diff_seconds = Math.round((curdate.getTime() - update.getTime())/1000);

    if(!data || diff_seconds > update_frequency) {
        const url = 'https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed&$orderBy=StartDate';
        const result = await myFetch(url);
        data = result.value;    

        data = data.filter(elm => elm.Education !== 'Bager/konditor');

        data.map(item => {
            item.StartDate = item.StartDate.replace("+01:00", "+00:00");
            item.Education = replaceEducation(item.Education);
            item.Subject = replaceSubject(item.Subject);
        })

        data.sort((a,b) => a.Education.localeCompare(b.Education));

        localStorage.setItem('activity_data', JSON.stringify(data));
        localStorage.setItem('activity_update', new Date());        
    }


    let acc_html = `<table border="0">
                    <tr>
                      <th>Kl.</th>
                      <th>Uddannelse</th>
                      <th>Fag</th>
                      <th>Hold</th>
                      <th>Lokale</th>
                    </tr>
    `;

    data.map(item => {
        let item_date = new Date(item.StartDate);

        let hours = String(item_date.getHours()).padStart(2, '0');
        let minutes = String(item_date.getMinutes()).padStart(2, '0');

        item.Time = `${hours}:${minutes}`;
        //console.log(item);

        if(item_date > curdate) {
            acc_html += createRow(item);
        }
    })
    acc_html += '</table>';
    root.innerHTML = acc_html;

}

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

const replaceSubject = subject => {
    let friendly = '';
    switch(subject) {
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

const replaceEducation = education => {
    let friendly = '';
    switch(education) {
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