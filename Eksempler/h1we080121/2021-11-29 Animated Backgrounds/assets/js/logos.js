let ul = document.querySelector('.box-area');

let arr_construction_icons = [
    "fa-wrench",
    "fa-screwdriver",
    "fa-paint-roller",
    "fa-ruler-combined",
    "fa-toolbox",
    "fa-hammer",
    "fa-tools"
]

let arr_media_icons = [
    "fa-apple",
    "fa-angular",
    "fa-css3-alt",
    "fa-docker",
    "fa-internet-explorer",
    "fa-github",
    "fa-react",
    "fa-html5",
    "fa-js",
    "fa-sass",
    "fa-php",
    "fa-node-js",
    "fa-git-square",
    "fa-wordpress",
    "fa-vuejs",
    "fa-stack-overflow",
    "fa-rasberry-pi",
    "fa-node",
    "fa-java",
    "fa-git-square",
    "fa-youtube",
    "fa-trello",
    "fa-umbraco",
    "fa-uikit",
    "fa-snapchat",
    "fa-slack-hash",
    "fa-napster",
    "fa-npm",
    "fa-redhat",
    "fa-windows",
    "fa-unity",
    "fa-stripe",
    "fa-linkedin",
    "fa-less",
    "fa-js-fiddle",
    "fa-itunes-note",
    "fa-instagram",
    "fa-gulp",
    "fa-google",
    "fa-font-awesome",
    "fa-facebook-square",
    "fa-firefox-browser",
    "fa-chrome",
]

let arr_position = [];
for(i = 10; i <= 90; i++) {
    if(i % 10 === 0) {
        arr_position.push(i);
    }
}

const createLiTag = () => {
    const random_position = arr_position[Math.floor((Math.random()*arr_position.length))];
    const random_size = Math.round(Math.random() * (80 - 50) + 50);
    const random_delay = Math.round(Math.random() * (5 - 2) + 2);
    const random_duration = Math.round(Math.random() * (8 - 4) + 4);

    let li = document.createElement('li');
    li.classList.add('fab');
    li.classList.add(arr_media_icons[Math.floor((Math.random()*arr_media_icons.length))]);
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
