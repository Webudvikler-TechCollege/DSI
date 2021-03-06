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
 * @returns json object
 */
export const myFetch = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;    
    }
    catch(err) {
        console.error(`myFetch Error: ${err}`)
    }
}