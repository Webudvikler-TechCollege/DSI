// Imports
import { myFetch } from "./helper.js";

export const getNews = async () => {
	const url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23';
	const result = await myFetch(url);
	let html = '<h1>';
	result.items.map(item => {
		html += item.title;
	})
	html += '</h1>';

	document.querySelector('.marquee').innerHTML = html;
	window.addEventListener('load', Marquee('.marquee', 0.2))
}

export const Marquee = (selector, speed) => {
	const parentSelector = document.querySelector(selector);
	const clone = parentSelector.innerHTML;
	const firstElement = parentSelector.children[0];
	let i = 0;
	//console.log(firstElement);
	parentSelector.insertAdjacentHTML('beforeend', clone);
	parentSelector.insertAdjacentHTML('beforeend', clone);
  
	setInterval(function () {
	  firstElement.style.marginLeft = `-${i}px`;
	  if (i > firstElement.clientWidth) {
		i = 0;
	  }
	  i = i + speed;
	}, 0);
  }
  
