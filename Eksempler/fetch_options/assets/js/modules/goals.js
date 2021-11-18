/**
 * Modul til verdensmål 
 */

 import { myFetch } from "../helpers/helper.js";
 import { commentList } from "./comments.js";

 /**
  * Udskriver liste af kommentarer
  */
 export async function goalList() {
 
     const data = await myFetch('https://api.mediehuset.net/sdg/goals');

     const listwrapper = document.querySelector('.list-wrapper');
     
     data.items.map(item => {
         const goalwrapper = document.createElement('div');
         goalwrapper.style.backgroundColor = `#${item.color}`;

         const figure = document.createElement('figure');
         figure.innerHTML = item.icon;
         figure.children[0].style.fill = 'white';

         goalwrapper.append(figure);

         goalwrapper.addEventListener('click', () => {
             goalDetails(item.id)
         })

         listwrapper.append(goalwrapper);
     }) 
 }

 export async function goalDetails(goal_id) {
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);

    sessionStorage.setItem('goal_id', goal_id);

    const detailwrapper = document.querySelector('.detail-wrapper');
    detailwrapper.innerHTML = null;

    const title = document.createElement('h1');
    title.innerText = data.item.title;

    const byline = document.createElement('h2');
    byline.innerText = data.item.byline;

    const img = document.createElement('img');
    img.src = data.item.image;

    const body = document.createElement('p');
    body.innerText = data.item.description;

    detailwrapper.append(title, byline, img, body);

    if(sessionStorage.getItem('token')) {
        commentList(goal_id);
    }
    
 }