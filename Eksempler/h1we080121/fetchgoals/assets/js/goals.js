// Funktioner til det specifikke projekt
import { myFetch } from './helper.js';

const getGoalList = async () => {
    const data = await myFetch('https://api.mediehuset.net/sdg/goals');
    data.items.map(function(item, key) {
        const wrapper = document.createElement('div');
        const link = document.createElement('a');
        link.innerText = item.title;
        link.addEventListener('click', () => {
            getGoalDetails(item.id);
        })
        wrapper.append(link);
        document.querySelector('.goalcontainer').append(wrapper);
    }) 
}

getGoalList();

const getGoalDetails = async goal_id => {
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);
    const title = document.createElement('h1');
    title.innerText = data.item.title;
    document.querySelector('.goalcontainer').append(title);
}