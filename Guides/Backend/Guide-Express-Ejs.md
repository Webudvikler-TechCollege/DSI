# Guide til Node.js, Express & EJS 
Følgende er en guide til at sætte et Node projekt op med Express og EJS. I guiden er der fokus på opsætte en simpel løsning med Express og EJS. 

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
npm install -gD nodemon
```
9. Skriv i index.js for at starte express server:
```javascript
const express = require('express');
const app = express();
```
10. Skriv følgende for at klargøre EJS engine:
```javascript
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'))
```
11. Opsæt route til forside:
```javascript
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Sidetitel',
        content: 'Side Indhold'
    });
});
```
12. Sæt express til at lytte på en port:
```javascript
app.listen(3000, () => {
    console.log('Express kører på port 3000');
});
```
13. Opret fil til views: views/pages/index.ejs og indtast følgende:
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
* [Express - hurtigt og minimalistisk server framework til Node.js &raquo;](https://expressjs.com/)

* [EJS - Embedded JavaScript templating &raquo;](https://ejs.co/)