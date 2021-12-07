# Guide til Node-Fetch
Følgende er en guide til hvordan du kan bruge node-fetch til at hente data fra et api med. 

## Forudsætninger
Guiden tager udgangspunkt i at du allerede har opsat dit Node projekt med express router og ejs views. Hvis du ikke har gjort det bør du først kigge på følgende guides:

* [Guide til opsætning af NodeJS, Express og EJS](Guide-Express-Ejs.md)
* [Guide til opsætning af Express Router](Guide-Express-Router.md)

## Opsætning af node-fetch
Guiden viser et fetch eksempel fra en route fil. Start derfor med at åbne en af dine route filer i VS Code. *(Eks: routes/my-routefile.js)*

1. Installer npm pakke til node-fetch:
```
npm install node-fetch
```
2. Gør node-fetch modulet tilgængeligt i din route fil. Tilføj følgende i toppen af filen:

```javascript
const fetch = require('node-fetch');
```
2. Skriv den route du vil lave fetch kaldet i - eksempelvis *list*. Handleren i din route skal kaldes som en asynkron funktion (*async*). Så kan vi bruge *await* foran fetch funktionen og sikre os at javascript venter på et svar fra fetch. På den måde kan vi tildele svaret fra fetch funktionen til en konstant (*requestToApi*). Det gør det ret nemt at bruge fetch.
```javascript
// Kalder router med async handler function
router.get("/list", async (req, res) {

    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://infoboard.mediehuset.net/api/');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();
});
```
3. Konstanten *apiResponse* indeholder nu et data array fra vores API. Det kan efterfølgende loopes med en foreach metode eller sendes direkte til vores ejs fil:
```javascript
// Kalder router med async handler function
router.get("/list", async (req, res) {

    const requestToApi = await fetch('https://infoboard.mediehuset.net/api/');
    const apiResponse = await requestToApi.json();

    return res.render("pages/list", {
      title: "Titel",
      apiResponse
    })
});
```
## Reflektion
Prøv eventuelt at gennemgå guiden hvor du  øver dig i at forklare de enkelte trin for dig selv eller en klassekammerat/ven. 

Skriv eventuelt ned hvilke dele kan du forstår, kan forklare og anvende. 

Skriv også ned hvis der er ord eller begreber som du ikke forstår. Du kan altid spørge mig om deres betydning men prøv også at søge på dem i Google og se om du selv kan finde mening.

## Læs mere
* [Express - hurtigt og minimalistisk server framework til Node.js &raquo;](https://expressjs.com/)

* [EJS - Embedded JavaScript templating &raquo;](https://ejs.co/)