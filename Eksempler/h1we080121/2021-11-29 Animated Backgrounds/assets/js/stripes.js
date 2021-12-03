const setStripe	 = () => {
	const span = document.createElement('span');
	span.classList.add('expand');
	span.style.backgroundColor = `rgb(${generateRGB()})`;

	span.addEventListener('animationend', () => {
		span.classList.add('contract');
		span.addEventListener('animationend', () => {
			span.style.backgroundColor = '#fff';
		})
	})
	document.querySelector('#root').append(span);

}


setTimeout(() => {
	setInterval(() => {
		setStripe();
	},100)	
},1000)



function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function generateRGB() {
	let values = [];
	for(let i = 1; i <= 3; i++) {
		values.push(getRandomNumber(0,255));
	}
	return values.join(',');
}