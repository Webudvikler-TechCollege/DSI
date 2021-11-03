# Javascript Promises - Forklaring

Promises anvendes i forbindelse med asynkron programmering.

Et promise er et løfte om at der kommer et svar retur uanset om  svaret er sandt eller falsk.

Hvis vi for eksempel sender en forespørgsel til en server som et promise, ved vi ikke altid hvor lang tid serveren skal bruge på at behandle vores forespørgsel, men promise teknologien garanterer at vi får en respons og gør, at vi kan få vores kode til at vente på denne respons.

Eksempel på et simpelt Promise objekt:
```js
let myPromise = new Promise(function(resolve, reject) {
  // executor (code der skal eksekveres)
});
```
___
## Resolve / Reject

Når vi sender en forespørgsel som et promise kan den enten blive opfyldt (*resolved* eller *fullfilled*) eller afvist (*rejected*). Disse argumenter kaldes *callbacks* og er funktioner 

Styrken i promises ligger så i, at vi kan sende et promise, vente på en repons og så sende det næste promise afhængig af hvilken respons vi får tilbage. 
___

## Læs mere om promises
- [MDN: Using promises &raquo;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Javascript Info: Promise Basics &raquo;](https://javascript.info/promise-basics)
___
## Se video om promises
- [WebDev: JavaScript Promises In 10 Minutes &raquo;](https://www.youtube.com/watch?v=DHvZLI7Db8E) 




