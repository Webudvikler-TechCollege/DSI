# Guide til routing med Express & EJS
Følgende er en guide til at sætte et Node projekt op med Express og EJS. I guiden er der fokus på anvende Express' .Router() og en struktur hvor routes ligger i en seperat folder. 

1. Opret mappe i din stifinder

2. Åbn mappe i VS Code

3. Åbn terminal i VS Code (Ctrl + J / Cmd + J)

4. Skriv i terminal: 
```
npm init
```

5. Lav ny fil: index.js

6. Installer express i terminal:
```
npm install -g express
```
7. Installer ejs i terminal:
```
npm install -g ejs
```
8. Installer nodemon i terminal:
```
npm install -g nodemon
```
9. Skriv i index.js for at starte express server:
```javascript
const express = require('express');
const app = express();
const port = 4242;
```
10. Skriv følgende for at klargøre EJS engine:
```javascript
app.set('view engine', 'ejs');
app.use(express.static('/assets'));
```
11. Opsæt router til side med sangliste. Start med at lave en kostant som henter fil med vores router. (Den laver vi senere).
```javascript
const songRouter = require('./routes/songrouter.js')
```
12. Derefter skal vi sætte vores app objekt til at bruge songrouter når der kommer en forespørgsel (request) på stien http://localhost/songs/: 
```javascript
app.use("/songs", songRouter);
```
13. Sæt express til at lytte på en port. Læg mærke til at hele url'en bliver udskrevet i konsollen med portnummeret som variabel. 
```javascript
app.listen(3000, () => {
    console.log('Express kører på http://localhost:${port}');
});
```
14. Nu skal du lave en fil til din router. Opret mappen routes og lav en ny fil i denne. Kald filen for songrouter.js.
15. Åbn fil og skriv følgende i den:
```javascript
const express = require('express');
const router = express.Router();
```
16. Nu kan du lave dine request på router objektet. Nedenstående vil reagere når der kommer en forespørgsel på url'en http://localhost/fetch/list/:
```javascript
router.get("/list", (req, res) => {
  return res.render("pages/songlist", {
    title: "Sangliste",
    content: "Syng en sang fra listen"
  });
});
```
17. For at vores app kan få adgang til vores nye router er vi nødt til at gøre router objektet tilgængelig for andre filer. Det kan vi gøre ved at lave en module.exports på router objektet i bunden af filen. Skriv derfor følgende ind i bunden af din router fil:
```javascript
module.exports = router;
```
18. Opret fil til views: views/pages/songlist.ejs og indtast følgende:
```html
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
     <%= content %>
  </body>
</html>
```
14. Kør applikationen fra din terminal:
```
nodemon index.js
```
## Reflektion
Prøv eventuelt at gennemgå guiden hvor du  øver dig i at forklare de enkelte trin for dig selv eller en klassekammerat/ven. 

Skriv eventuelt ned hvilke dele kan du forstår, kan forklare og anvende. 

Skriv også ned hvis der er ord eller begreber som du ikke forstår.

## Læs mere
* [Express Routing &raquo;](https://expressjs.com/en/guide/routing.html)