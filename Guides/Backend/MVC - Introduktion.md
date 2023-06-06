# MVC - Model, View, Controller

Model-View-Controller (fork. MVC) er et design mønster anvendt i programmering til at adskille Modellen (database eller anden data-kilde), Controlleren (logikken) og Viewet (de visuelle elementer) på en måde, så de enkelte dele bliver mere overskuelige og gør det nemmere at vedligeholde kildekoden.

Forestil dig, at du har en opskrift på at lave en sandwich. I MVC-terminologi ville opskriften være din model. Den beskriver, hvilke ingredienser der skal bruges, og hvordan de skal kombineres for at lave sandwichen.

Nu har du en kok, der tager opskriften og følger den for at lave sandwichen. Kokken er din controller, som styrer processen og håndterer interaktionen mellem modellen (opskriften) og brugeren.

Endelig har du en tjener, der serverer den færdige sandwich for brugeren. Tjeneren er dit view, som præsenterer sandwichen på en pæn og indbydende måde, så man kan nyde den.

På denne måde er opskriften (modellen) adskilt fra selve madlavningen (controlleren) og præsentationen af den færdige sandwich (viewet). Dette giver dig mulighed for at ændre opskriften uden at skulle ændre selve madlavningen eller måden, sandwichen præsenteres på.

På samme måde anvendes MVC-arkitekturen i softwareudvikling. Modellen repræsenterer data og forretningslogikken bag applikationen. Controlleren håndterer interaktionen mellem brugeren og modellen. Og viewet er ansvarligt for præsentationen af dataene for brugeren.
___
## MVC i vores Node projekt

Vi kan sagtens med fordel anvende principperne i MVC i vores Node projekt. Men da vi bygger et API kommer vores  output i et rent json format og derfor har vi ikke brug for view delen. Men vi kan bruge både controller og model.

Vores MVC struktur vil derfor bestå af følgende:
- Router
- Controller
- Model

Hvert element i strukturen skal have sin egen folder.
___
### Router i en MVC struktur
I mange MVC sammenhænge er routeren en del af controlleren, men i vores projekt arbejder vi med routes som en selvstændig del. Derfor skal route filer ligge i mappen *Routes*:

Eksempel på route fil:
```
song.router.js
```
De enkelte routes skal fremover kalde metoder fra vores controller.
___
### Controller i en MVC struktur
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
Når vi skal bruge klassen skal vi kalde en instans af den:
```js
// Importerer klassen 
import SongController from './Controllers/song.controller.js'
// Deklarerer var med instans af klassen
const song = new SongController()
// Kalder metode på klassen
song.list()
```
___