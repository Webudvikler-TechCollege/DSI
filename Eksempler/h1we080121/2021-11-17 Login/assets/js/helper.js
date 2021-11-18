/**
 * Fetch Function 
 * @param {string} url 
 * @param {object} options (default: null)
 * @returns {JSON Object}
 */
export const myFetch = async (url, options = null) => {
    // Deklarerer response variabel
    let response;

    // Forsøger et kald
    try {
        // Hvis options er null
        if(!options) {
            // Fetch url
            response = await fetch(url);
        } else {
            // Fetch url & options
            response = await fetch(url, options);
        }
        // Parse respons som json
        const result = await response.json();
        // Reterner resultat
        return result;            
    }
    // Catcher eventuelle fejl
    catch(err) {
        // error logger fejl
        console.error(`Fejl i myFetch: ${err}`)
    }
}