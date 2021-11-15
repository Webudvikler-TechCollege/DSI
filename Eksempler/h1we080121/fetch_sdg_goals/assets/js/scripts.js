import { myFetch } from "./helper.js";

// Function definition: list goals
const goalList = async () => {
    const data = await myFetch('https://api.mediehuset.net/sdg/goals');
    
    data.items.map(item => {
        const listwrapper = document.querySelector('.list-wrapper');

        const goalwrapper = document.createElement('div');

        const h2 = document.createElement('h2');
        h2.innerText = item.title;

        goalwrapper.append(h2);

        goalwrapper.addEventListener('click', () => {
            goalDetails(item.id)
        })

        listwrapper.append(goalwrapper);
    })

    //goalDetails(1);
}

// Function definition: list details
const goalDetails = async (goal_id) => {
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);
    console.log(data.item.title);
}

goalList();