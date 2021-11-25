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
        // Gemmer response info i object key response
        result.response = {
            ok : response.ok,
            status : response.status,
            statusText : response.statusText
        }
        // Reterner resultat
        return result;            
    }
    // Catcher eventuelle fejl
    catch(err) {
        // error logger fejl
        console.error(`Fejl i myFetch: ${err}`)
    }
}

/**
 * 
 * @param {String} date 
 * @returns 
 */
 export const convert2Timezone = date => {
    const d = new Date(date);    
    const stamp = ((d.valueOf()/1000) - (d.getTimezoneOffset()*60))*1000;
    return new Date(stamp);
}