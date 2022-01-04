/**
 * Fil med specifikke funktioner 
 * Bruges til verdensmål
 */

/* Importerer myFetch funktion fra helper fil */
import { myFetch } from './helper.js';

const main = document.querySelector('main');

/**
 * Funktionsvariabel til at hente liste af mål
 */
const getSongList = async () => {
    // Kalder data

    const fetchHeaders = new Headers();
    fetchHeaders.append("Accept", "application/json");

    const options = {
        headers: fetchHeaders
    }
    const data = await myFetch('http://localhost:4000/api/song?orderby=title', options);

    // Mapper data
    data.map(function(item, key) {
        // Definerer div wrapper
        const wrapper = document.createElement('li');
        
        // Definerer anchor tag med tekst og click event
        const link = document.createElement('a');
        link.innerText = item.title;

        // Click event kalder detalje funktion med målets id
        link.addEventListener('click', () => {
            getSongDetails(item.id);
        })

        // Appender link og wrapper
        wrapper.append(link);
        main.append(wrapper);
    }) 
}

/* Funktionskald til at hente liste med mål */
getSongList();

/**
 * Funktionsvariabel til at hente mål detaljer
 * @param {number} song_id 
 */
const getSongDetails = async song_id => {
    reset();

    // Kalder data
    const data = await myFetch(`http://localhost:4000/api/song/${song_id}`);

    const div = document.createElement('div');
    div.classList.add('detailwrapper')
    const h2 = document.createElement('h2')
    h2.innerText = data.title;
    div.append(h2)    

    const pre = document.createElement('pre')
    pre.innerHTML = data.content;
    div.append(pre);

    main.append(div)
}

function reset() {
    main.innerHTML = '';
}
