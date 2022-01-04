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
    const data = await myFetch('http://localhost:4000/api/song');

    const table = document.createElement('table');
    const trow = document.createElement('tr')

    const th1 = document.createElement('th')
    th1.innerText = 'Titel'
    trow.append(th1)
    const th2 = document.createElement('th')
    th2.innerText = 'Handling'
    trow.append(th2)

    table.append(trow)

    // Mapper data
    data.map(function (item, key) {
        // Definerer div wrapper
        const trow = document.createElement('tr');

        const tdata1 = document.createElement('td');

        // Definerer anchor tag med tekst og click event
        const link = document.createElement('a');
        link.innerText = item.title;

        // Click event kalder detalje funktion med målets id
        link.addEventListener('click', () => {
            getSongDetails(item.id);
        })

        // Appender link og wrapper
        tdata1.append(link);
        trow.append(tdata1);

        const tdata2 = document.createElement('td');

        const edit = document.createElement('a');
        edit.classList.add('edit')
        edit.addEventListener('click', () => {
            editSong(item.id)
        })
        tdata2.append(edit)

        const del = document.createElement('a');
        del.classList.add('del')
        del.addEventListener('click', () => {
            deleteSong(item.id)
        })
        tdata2.append(del)
        trow.append(tdata2);
        table.append(trow)

    })
    main.append(table)
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

    const h3 = document.createElement('h3')
    h3.innerHTML = data.artist.name;
    div.append(h3);

    const pre = document.createElement('pre')
    pre.innerHTML = data.content;
    div.append(pre);


    main.append(div)
}

const deleteSong = async song_id => {
    console.log(song_id);
    reset();

    let options = {
        type: 'DELETE'
    }

    // Kalder data
    const data = await myFetch(`http://localhost:4000/api/song/${song_id}`);

    const div = document.createElement('div');
    div.classList.add('messagewrapper')

    const p = document.createElement('p');
    p.innerText = 'Sangen blev slettet';
    div.append(p);

    main.append(div)

}

function reset() {
    main.innerHTML = '';
}
