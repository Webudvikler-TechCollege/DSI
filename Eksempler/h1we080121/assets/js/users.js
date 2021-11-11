import { myFetcher } from './helpers.js';

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