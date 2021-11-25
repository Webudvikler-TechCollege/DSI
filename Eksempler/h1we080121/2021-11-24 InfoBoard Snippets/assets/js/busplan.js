/**
 * Funktioner til busplan
 */


import { myFetch } from './helper.js';

// Kalder #root element
const root = document.querySelector('#root');

/**
 * Funktion til at hente og præsentere bus plan med
 */
export const getBusPlan = async () => {
    // Henter data
    const url = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=8519734&format=json';
    const data = await myFetch(url);

    root.innerHTML = null;

    // Sætter array med 5 kommende bustider
    let array_departures = data.MultiDepartureBoard.Departure.slice(0, 5);

    // Sætter dags dato med JS Date
    const current_stamp = Math.round(new Date().getTime()/1000);
    console.log(current_stamp);

    // Klargør HTML: UL element
    const ul = document.createElement('ul');
    ul.classList.add('busplan');
    
    // Mapper afgange
    array_departures.map(dep => {
        
        // Splitter date og time til array: 
        // 0 = Dato, 1 = Måned, 2 = År, 3 = Time, 4 = Minut
        const arr_date_spl = dep.date.split('.').concat(dep.time.split(':'));

        // Fikser årstal til fire cifre
        arr_date_spl[2] = arr_date_spl[2].padStart(4, '20');
        
        // Formaterer date så den passer med et JS Date format
        const date_formatted = `${arr_date_spl[2]}-${arr_date_spl[1]}-${arr_date_spl[0]} ${arr_date_spl[3]}:${arr_date_spl[4]}:00`;
        
        // Henter ind som JS Date og konverterer til sekunder
        const dep_stamp = Math.round(new Date(date_formatted).getTime()/1000);
        
        // Beregner antal minutter fra nu og til pågældende afgang
        const diff_seconds = Math.floor((dep_stamp - current_stamp)/60);
        
        // Tjek resultat
        // console.log(`${dep.time} => ${diff_seconds}`);
        
        // Bygger HTML

        // LI element
        const li = document.createElement('li');

        // Første SPAN element: linje
        const span_line = document.createElement('span');
        span_line.innerText = dep.line;

        // Andet SPAN element: retning
        const span_direction = document.createElement('span');
        span_direction.innerText = dep.direction;

        // Trejde SPAN element: minutter
        const span_minutes = document.createElement('span');
        span_minutes.innerText = `${diff_seconds} min`;

        // Tilføjer SPAN til LI
        li.append(span_line, span_direction, span_minutes);
        
        // Tilføjer LI til UL
        ul.append(li)
        
    })

    // Tilføjer UL til #root element
    root.append(ul);
}

