# Javascript Fetch - en mere advanceret tilgang

Vi har kigget på en simpel anvendelse af fetch. Denne guide giver et mere advanceret indblik i javascripts fetch API.

Fetch metoden tager to argumenter, hvor det første argument er den url som skal kaldes og dermed obligatorisk. 

Metodens andet argument skal være et request objekt med forskellige egenskaber for din forespørgsel og dette argument er valgfrit. Det betyder at hvis det ikke er angivet, vil kaldet som standard være et HTTP GET request - altså et kald der forsøger at hente data fra den pågældende url.

Følgende er et eksempel der viser et POST kald med fetch metoden:
```js
const url = 'https://api.mediehuset.net/comments';

fetch(url, { method: 'POST' })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
``` 
Du kan skrive metoden på en anden og mere overskuelig måde, ved at lægge request objektet i en seperat konstant. På den måde bliver det mere overskueligt når du tilføjer flere egenskaber til objektet:
```js
const url = 'https://api.mediehuset.net/comments';

const options = {
    method: 'PUT',
    body: formData   
}

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
``` 
Objektet er smart, da vi kan påvirke vores kald med mange forskellige elementer som request methods, postdata, authorization headers m.m.

De mest almindelige er:
- *method*: Request metoden f.eks. GET, POST osv. 

- *body*: Kroppen til dit request. Her kan du tilføje FormData, URLSearchParams mm. Bemærk, at requests af GET- eller HEAD-metoden, ikke kan have en krop.

Du kan se en liste over de alle forskellige options [her](https://developer.mozilla.org/en-US/docs/Web/API/fetch#syntax)
___
## Fetch som asynkron function

Hvis du vil undgå alt for meget then/catch chaining, kan du med fordel lave en custom function og benytte dig af en anden promise-based teknologi - nemlig *async/await*.

Med *async/await* kan du definere en asynkron function og derefter lave ventende kald i denne funktions scope.

Det betyder at du kan returnere svar direkte til funktionskaldet og så slippe du for at skulle behandle data inde i kodekæden af then og catch statements.

**Eksempel: function definition**
```js
// Definerer funktionen som asynkron med keywordet async
// og to parametre - url og options
async function myFetchFunction(url, options = null) {
    // Hvis options er null skal var sættes til objekt med metoden get
    if(!options) {
        options = {
            method: 'GET'   
        }
    }
    // Kalder fetch med await: vores kode venter på respons inden den går videre 
    let response = await fetch(url, options);
    // Kalder json parser: vores kode venter på respons inden den går videre 
    let data = await response.json();
    // returnerer data
    return data;
}
```
Ovenstående funktion vil returnere respons objektet direkte ved et kald af funktionen.

**NB!** Funktionen skal være defineret som asynkron før at du kan anvende await keywordet i scopet.

**Eksempel: function call**
```js
const data = myFetchData('https://url.to.my.endpoint.com');
``` 






