let ul = document.querySelector('.box-area');

let arr_icons = [
    "fa-wrench",
    "fa-truck-pickup",
    "fa-ruler-combined",
    "fa-toolbox",
    "fa-hammer",
    "fa-tools"
]

const createLiTag = () => {
    const random_position = Math.round(Math.random() * 100);
    const random_size = Math.round(Math.random() * (80 - 50) + 50);
    const random_delay = Math.round(Math.random() * (5 - 2) + 2);
    const random_duration = Math.round(Math.random() * (8 - 4) + 4);

    let li = document.createElement('li');
    li.classList.add('fas');
    li.classList.add(arr_icons[Math.floor((Math.random()*arr_icons.length))]);
    li.style.left = `${random_position}%`;
    li.style.fontSize = `${random_size}px`;
    li.style.animationDelay = `${random_delay}s`;
    li.style.animationDuration = `${random_duration}s`;
    ul.append(li);
}

createLiTag();

setInterval(() => {
    createLiTag();
}, 2000)

setInterval(() => {
    for(let elm of ul.querySelectorAll('li')) {
        //console.clear();
        elm.addEventListener('animationend', function(e) { 
            elm.remove()
        });
    }
},1000)
