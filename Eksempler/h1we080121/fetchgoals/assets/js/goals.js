/**
 * Fil med specifikke funktioner 
 * Bruges til verdensmål
 */

/* Importerer myFetch funktion fra helper fil */
import { myFetch } from './helper.js';

/**
 * Funktionsvariabel til at hente liste af mål
 */
const getGoalList = async () => {
    // Kalder data
    const data = await myFetch('https://api.mediehuset.net/sdg/goals');

    // Mapper data
    data.items.map(function(item, key) {
        // Definerer div wrapper
        const wrapper = document.createElement('div');
        
        // Definerer anchor tag med tekst og click event
        const link = document.createElement('a');
        link.innerText = item.title;

        // Click event kalder detalje funktion med målets id
        link.addEventListener('click', () => {
            getGoalDetails(item.id);
        })

        // Appender link og wrapper
        wrapper.append(link);
        document.querySelector('.goalcontainer').append(wrapper);
    }) 
}

/* Funktionskald til at hente liste med mål */
getGoalList();

/**
 * Funktionsvariabel til at hente mål detaljer
 * @param {number} goal_id 
 */
const getGoalDetails = async goal_id => {
    // Kalder data
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);

    // Definerer titel element
    const title = document.createElement('h1');
    title.innerText = data.item.title;

    // Definerer div element til svg html
    const icon = document.createElement('div');
    icon.innerHTML = data.item.icon;

    // Henter svg ind som et js dom objekt 
    const svg = icon.querySelector('svg');
    svg.style.fill = `#${data.item.color}`;

    // Appender elementer til .goalcontainer element
    document.querySelector('.goalcontainer').append(title);
    document.querySelector('.goalcontainer').append(icon);
}