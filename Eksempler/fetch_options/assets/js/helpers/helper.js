/**
 * Fil med globale funktioner
 * 
 * Keywordet export gør at alle 
 * funktioner kan ekporteres individuelt.
 * For at kunne anvende denne metode
 * i Vanilla Javascript skal script 
 * tagget have attributten type 
 * med værdien module
 */ 

/**
 * Funktion til globale fetch kald
 * @param {string} url 
 * @param {object} options 
 * @returns json object
 */
 export const myFetch = async (url, options = null) => {
    if(!options) {
        options = {
            method: 'GET'
        }
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;    
    }
    catch(err) {
        console.error(`myFetch Error: ${err}`)
    }
}

/**
 * Function til at udskrive form elementer med
 * @param {string} element 
 * @param {object} options 
 * @returns html element object
 */
export function createFormElement(element, options) {
    let html;
    let label;

    const wrapper = document.createElement('div');
    wrapper.classList.add('row');

    switch(element.toUpperCase()) {
        case 'INPUT':
            label = document.createElement('label');
            label.for = options.name;
            label.innerText = `${options.display}: `;

            html = document.createElement('input');
            html.name = options.name;
            html.id = options.name;
            html.type = options.type;
            break;
        case 'TEXTAREA':
            label = document.createElement('label');
            label.for = options.name;
            label.innerText = `${options.display}: `;

            html = document.createElement('textarea');
            html.name = options.name;
            html.id = options.name;
            break;
        case 'BUTTON':
            html = document.createElement('button');
            html.id = options.name;
            html.type = options.type;
            html.innerText = options.display;
            break;
    }

    if(label) {
        wrapper.append(label, html);
    } else {
        wrapper.append(html);
    }
    return wrapper;
}

export function date2local(timestamp) {
    const date = new Date(timestamp*1000);
    const day = date.getUTCDate();
    const month = date.getUTCMonth()+1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
