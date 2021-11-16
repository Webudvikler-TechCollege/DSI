import { myFetch } from "./helper.js";

// Function definition: list goals
const goalList = async () => {
    const data = await myFetch('https://api.mediehuset.net/sdg/goals');
    
    data.items.map(item => {
        const listwrapper = document.querySelector('.list-wrapper');

        const goalwrapper = document.createElement('div');
        goalwrapper.style.backgroundColor = `#${item.color}`;   

        const h2 = document.createElement('h2');
        h2.innerText = item.title;
        goalwrapper.append(h2);

        const icon = document.createElement('div');
        icon.innerHTML = item.icon;
        icon.children[0].style.fill = '#fff';
        goalwrapper.append(icon);


        goalwrapper.addEventListener('click', () => {
            goalDetails(item.id)
        })

        listwrapper.append(goalwrapper);
    })

}

// Function definition: list details
const goalDetails = async (goal_id) => {
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);
    console.log(data.item.title);

    const wrapper = document.querySelector('.detail-wrapper');
    wrapper.innerHTML = '';

    const h1 = document.createElement('h1');
    h1.innerText = data.item.title;

    const button = document.createElement('button');
    button.innerText = 'Luk vindue';
    button.addEventListener('click', () => {
        wrapper.classList.toggle('active');        
    })

    wrapper.append(h1, button);
    wrapper.classList.toggle('active');
}

goalList();