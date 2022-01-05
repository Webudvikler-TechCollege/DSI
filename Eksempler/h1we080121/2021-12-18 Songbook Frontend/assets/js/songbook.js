/* Importerer myFetch funktion fra helper fil */
import { myFetch } from './helper.js';
const main = document.querySelector('main');

/**
 * Funktionsvariabel til at hente liste 
 */
const getSongList = async () => {
    reset()
    // Deklarerer url var
    let strUrl;
    // Henter GET params
    const urlParams = new URLSearchParams(window.location.search);
    // Sætter var til array params
    const arrParams = [];

    // Tjekker om keyword er sat i url params og definerer endpoint url
    if (urlParams.has('keyword')) {
        strUrl = `http://localhost:4000/api/song/search`
        arrParams.push(`keyword=${urlParams.get('keyword')}`)
    } else {
        strUrl = 'http://localhost:4000/api/song';
    }

    // Tjekker om orderby eller limit er sat
    if (urlParams.has('orderby') || urlParams.has('limit') || urlParams.has('keyword')) {
        // Tilføjer query string til url
        strUrl += '?'

        // Tilføjer orderby + direction hvis de er sat
        if (urlParams.has('orderby')) {
            arrParams.push(`orderby=${urlParams.get('orderby')}`);
            if (urlParams.has('dir')) {
                arrParams.push(`dir=${urlParams.get('dir')}`);
            }
        }
        // Tilføjer limit hvis denne er sat 
        if (urlParams.has('limit')) {
            arrParams.push(`limit=${urlParams.get('limit')}`);
        }
    }
    // Bygger endpoint url med string og join metode
    const strEndpoint = strUrl += arrParams.join('&')
    console.log(strEndpoint);
    // Kalder fetch med endpoint
    const data = await myFetch(strEndpoint)

    const div = document.createElement('div')
    div.classList.add('listwrapper')

    const h2 = document.createElement('h2')
    h2.innerText = 'Oversigt'
    div.append(h2);

    const table = document.createElement('table')
    const trow = document.createElement('tr')

    const th1 = document.createElement('th')
    th1.innerText = 'ID'
    trow.append(th1)

    const th2 = document.createElement('th')
    th2.innerText = 'Titel'
    trow.append(th2)

    const th3 = document.createElement('th')
    th3.innerText = 'Handling'
    trow.append(th3)

    table.append(trow)

    // Mapper data
    data.map(function (item, key) {
        // Definerer div wrapper
        const trow = document.createElement('tr')

        const tdata1 = document.createElement('td')
        tdata1.innerText = item.id
        trow.append(tdata1)

        const tdata2 = document.createElement('td')

        // Definerer anchor tag med tekst og click event
        const link = document.createElement('a');
        link.innerText = item.title;

        // Click event kalder detalje funktion med målets id
        link.addEventListener('click', () => {
            getSongDetails(item.id);
        })

        // Appender link og wrapper
        tdata2.append(link);
        trow.append(tdata2);

        const tdata3 = document.createElement('td');

        const edit = document.createElement('a');
        edit.classList.add('edit')
        edit.addEventListener('click', () => {
            editSong(item.id)
        })
        tdata3.append(edit)

        const del = document.createElement('a');
        del.classList.add('del')
        del.addEventListener('click', () => {
            if (confirm(`Vil du slette sangen ${item.title} fra sangbogen?`)) {
                deleteSong(item.id)
            }
        })
        tdata3.append(del)
        trow.append(tdata3);
        table.append(trow)

    })
    div.append(table)
    main.append(div)
}

/**
 * Funktionsvariabel til at hente detaljer
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

/**
 * Funktionsvariabel til at slette
 * @param {number} song_id 
 */
const deleteSong = async song_id => {
    reset();

    let options = {
        method: 'DELETE'
    }

    // Kalder data
    const data = await myFetch(`http://localhost:4000/api/song/${song_id}`, options);

    window.location.reload()
}

function reset() {
    main.innerHTML = '';
}

export { getSongList, getSongDetails, deleteSong }
