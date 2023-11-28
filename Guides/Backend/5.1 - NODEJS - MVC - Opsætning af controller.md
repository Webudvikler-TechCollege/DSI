# Opsætning af en controller
Vores controller skal bygges som en javascript klasse i en særskilt js fil og indeholde metoder som kan lave forskellige kald til vores model.

Controller filer ligge i mappen *Controllers*:

Eksempel på filnavn til en controller:
```
song.controller.js
```
Eksempel på indhold i en controller fil:
```js
class SongController {
	constructor() {
		console.log("Denne metode bliver eksekveret når klassen kaldes");
	}

	list = (request, response) => {
		console.log('List metode på SongController')
	}
}

export default SongController
```
Når vi skal bruge klassen skal vi kalde en instans af den inde fra vores router fil:
```js
// Importerer klassen 
import SongController from './Controllers/song.controller.js'
// Deklarerer var med instans af klassen 
const song = new SongController()
// Kalder metode på klassen - dette skal gøres i de enkelte routes
song.list()
```
___