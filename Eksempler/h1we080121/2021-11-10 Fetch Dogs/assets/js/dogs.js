import { myFetcher } from './helpers.js';

/**
 * Asynkron funktion til at hente hundebilleder med
 */
const getDogList = async number => {
    const data = await myFetcher(`https://dog.ceo/api/breeds/image/random/${number}`); // Afventer resultat fra myFetcher

    data && data.message.map(image => {
        const img = document.createElement('img');
        img.setAttribute('src', image);
        document.querySelector('.carousel-slide').append(img);
    })

    /*
    data && data.message.map(function(item, key) {
        console.log(item);
    })
    */    
}

getDogList(3);