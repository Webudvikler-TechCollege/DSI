/**
 * Main fil bruger vi til at kalde vores forskellige 
 * importerede js funktioner. 
 */
import { getActivityData } from "./activities.js";
import { getNews, Marquee } from "./news.js";

/**
 * Sætter interval til at kalde funktion getBusPlan 
 * hvert halve minut (30000 milisecs)
 */

/*
setInterval(() => {
    getBusPlan();    
},30000)
*/

getActivityData();
getNews();
