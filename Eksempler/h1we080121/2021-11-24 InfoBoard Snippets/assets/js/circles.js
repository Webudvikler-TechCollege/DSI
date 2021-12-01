const rootElm = document.querySelector('.animation-area');

const arr_colors = [
    { name: 'Snow', hex: 'FFFAFA', rgb: '255, 250, 250' },
    { name: 'HoneyDew', hex: 'F0FFF0', rgb: '240, 255, 240' },
    { name: 'MintCream', hex: 'F5FFFA', rgb: '245, 255, 250' },
    { name: 'Azure', hex: 'F0FFFF', rgb: '240, 255, 255' },
    { name: 'AliceBlue', hex: 'F0F8FF', rgb: '240, 248, 255' },
    { name: 'GhostWhite', hex: 'F8F8FF', rgb: '248, 248, 255' },
    { name: 'WhiteSmoke', hex: 'F5F5F5', rgb: '245, 245, 245' },
    { name: 'SeaShell', hex: 'FFF5EE', rgb: '255, 245, 238' },
    { name: 'Beige', hex: 'F5F5DC', rgb: '245, 245, 220' },
    { name: 'OldLace', hex: 'FDF5E6', rgb: '253, 245, 230' },
    { name: 'FloralWhite', hex: 'FFFAF0', rgb: '255, 250, 240' },
    { name: 'Ivory', hex: 'FFFFF0', rgb: '255, 255, 240' },
    { name: 'AntiqueWhite', hex: 'FAEBD7', rgb: '250, 235, 215' },
    { name: 'Linen', hex: 'FAF0E6', rgb: '250, 240, 230' },
    { name: 'LavenderBlush', hex: 'FFF0F5', rgb: '255, 240, 245' },
    { name: 'MistyRose', hex: 'FFE4E1', rgb: '255, 228, 225' }
]

const setBackgroundItem = () => {
    const div = document.createElement('div');
    div.classList.add('circle');

    let size = getRandomNumber(1,300);
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.left = `${getRandomNumber(0, 100)}%`;
    div.style.top = `${getRandomNumber(0, 100)}%`;
    div.style.animationDuration = `${getRandomNumber(5,20)}s`;
    div.style.zIndex = getRandomNumber(0, 30);
    div.style.backgroundColor = `rgba(${arr_colors[Math.floor((Math.random()*arr_colors.length))].rgb}, 0.7)`;
    rootElm.append(div);
}

setInterval(() => {
    setBackgroundItem();    
}, 1000);

setInterval(() => {
    for(let elm of rootElm.querySelectorAll('div')) {
        elm.addEventListener('animationend', () => {
            elm.remove();
        })
    }    
}, 1000);

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}