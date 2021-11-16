# Javascript Fetch med option objekt

Fetch metoden tager to argumenter, hvor det første argument er den url som skal fetches. Dette argument er obligatorisk.

Metodens andet argument er valgfrit og kan tage et request objekt med forskellige oplysninger om din forespørgsel. Hvis det ikke er angivet, vil kaldet som standard være et HTTP GET request - altså et kald der forsøger at hente data fra den pågældende url.

Følgende er et eksempel der viser et POST kald med fetch metoden:

```js
// URL til endpoint
const url = 'https://api.mediehuset.net/comments';

// Option objekt med metode og form body
const options = {
    method: 'PUT',
    body: formData   
}

// Fetch kald med then/catch
fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
``` 
Via dette objekt kan vi påvirke vores kald med mange forskellige elementer som *request methods*, *postdata*, *authorization headers* m.m.

De mest almindelige er:

- *method*: Request metoden som typisk er en af følgende:
    - GET (hente)
    - POST (oprette)
    - PUT (opdatere)
    - DELETE (slette)  
&nbsp;    
- *headers*: Request headers er en slags metadata med information om dit request. 

- *body*: "Kroppen" til dit request. Her kan du tilføje Form data, URLSearchParams mm. Requests af GET- eller HEAD-metoden har ikke en krop.

Du kan se en liste over de alle forskellige options [her](https://developer.mozilla.org/en-US/docs/Web/API/fetch#syntax)
___
