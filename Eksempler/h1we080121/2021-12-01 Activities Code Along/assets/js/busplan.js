import { myFetch } from './helpers/helper.js';

export const getBusPlan = async () => {
    // Henter data
    const url = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=8519734&format=json';
    const result = await myFetch(url);
    const data = result.MultiDepartureBoard.Departure.slice(0,5);

    data.map(dep => {
        const arr_date = dep.date.split('.');
        const dep_date = new Date(`20${arr_date[2]}-${arr_date[1]}-${arr_date[0]} ${dep.time}`);

        let diff = (dep_date - Date.now());

        const hours = Math.floor(diff / (1000 * 60 * 60) % 24); 
        diff -= (hours * 1000 * 60 * 60);
        const minutes = String(Math.floor(diff / (1000 * 60) % 60)).padStart(2, '0'); 
        diff -= (minutes * 1000 * 60);
        const minutes_left = (hours) ? `${hours} t ${minutes} min` : `${minutes} min`;

        console.log(`${dep.line} ${dep.direction} ${minutes_left}`)
    })

}