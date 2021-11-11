/**
 * Global fetch funktion
 * @param {string} url API Endpoint 
 * @returns JSON response
 */
const myFetcher = async url => {
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

/**
 * Asynkron funktion til at hente hundebilleder med
 */
const getDogs = async () => {
    const data = await myFetcher('https://dog.ceo/api/breeds/image/random/6'); // Afventer resultat fra myFetcher
    console.log(data);
}

/**
 * Asynkron funktion til at hente brugere med
 */
const getUserList = async () => {
    const data = await myFetcher('./userdata.json'); // Afventer resultat fra myFetcher

    // Hvis data findes og data.users kan mappes som et array...
    data && data.users.map(function(item) {
        // I dette scope behandles brugerdata
        console.log(item);
    })
}