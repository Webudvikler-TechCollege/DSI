/**
 * Global fetch funktion
 * @param {string} url API Endpoint 
 * @returns JSON response
 */
export const myFetcher = async url => {
    // Forsøger følgende...
    try {
        const response = await fetch(url); // Afventer respons fra fetch kald
        const result = await response.json(); // Afventer json parse af respons
        return result; 
    }
    // Fanger fejl hvis der er en
    catch(err) {
        // Logger fejl
        console.error(`myFetcher Fejl: ${err}`);
    }
}