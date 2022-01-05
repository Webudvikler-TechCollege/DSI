import { getSongList } from "./songbook.js"

const siteUrl = window.location.href.substring(window.location.href.lastIndexOf('/')+1, window.location.href.indexOf('.htm'))

switch(siteUrl) {
	case 'index':
		getSongList()
		break
}

document.querySelector('#search').addEventListener('click', () => {
	console.log('Search is clicked');
	getSongList(true)
})
