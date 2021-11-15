# Sådan bruger du JavaScript Fetch API til at post data

`Fetch()` er som standard sat til at lave et GET request, men du kan bruge alle andre typer af requests. For at gøre dette skal du oprette et objekt og sende det med som det andet argument i dit fetch request.

Før du opretter en POST-anmodning, skal du oprette de data, du gerne vil sende til API'en. Dette vil være et objekt kaldet data med nøglenavnet og værdien Sammy (eller dit navn):
```js
const url = 'https://randomuser.me/api';

let postdata = {
  navn: 'Sammy'
}
```
Sørg for at inkludere en konstant variabel, der indeholder linket til Random User API.

Da dette er en POST-anmodning, skal du angive det eksplicit. Opret et objekt kaldet fetchData:
```js
let fetchOptions = {

}
```
Dette objekt skal inkludere tre nøgler: metode, brødtekst og overskrifter. Metodenøglen skal have værdien 'POST'. body skal sættes lig med det dataobjekt, der lige blev oprettet. overskrifter skal have værdien af ​​nye overskrifter():
```js
let fetchOptions = {
  method: 'POST',
  body: postdata,
  headers: new Headers()
}
```
Headers-grænsefladen er en egenskab ved Fetch API, som giver dig mulighed for at udføre forskellige handlinger på HTTP-anmodnings- og svarheadere. Hvis du gerne vil vide mere om dette, kan denne artikel kaldet Sådan definerer du ruter og HTTP-anmodningsmetoder i Express give dig flere oplysninger.

Med denne kode på plads kan POST-anmodningen foretages ved hjælp af Fetch API. Du vil inkludere url og fetchData som argumenter for din hentning POST-anmodning:
```js
fetch(url, fetchOptions)
``` 
Funktionen then() vil inkludere kode, der håndterer svaret modtaget fra Random User API-serveren:

fetch(url, fetchData)
.then(funktion() {
    // Håndter svar du får fra serveren
});
 
For at oprette et objekt og bruge funktionen fetch() , er der også en anden mulighed. I stedet for at oprette et objekt som fetchData, kan du bruge anmodningskonstruktøren til at oprette dit anmodningsobjekt. For at gøre dette skal du oprette en variabel kaldet anmodning:

const url = 'https://randomuser.me/api';

lad data = {
  navn: 'Sara'
}

var anmodning =
 
Forespørgselsvariablen skal sættes lig med ny anmodning. Den nye Request-konstruktion tager to argumenter: API url (url) og et objekt. Objektet skal også inkludere metode-, brødtekst- og headernøglerne ligesom fetchData:

var request = new Request(url, {
    metode: 'POST',
    krop: data,
    overskrifter: nye overskrifter()
});
 
Nu kan anmodning bruges som det eneste argument for fetch(), da den også inkluderer API url:

hente (anmodning)
.then(funktion() {
    // Håndteringssvar vi får fra API'et
})
 
Alt i alt vil din kode se sådan ud:

const url = 'https://randomuser.me/api';

lad data = {
  navn: 'Sara'
}

var request = new Request(url, {
    metode: 'POST',
    krop: data,
    overskrifter: nye overskrifter()
});

hente (anmodning)
.then(funktion() {
    // Håndteringssvar vi får fra API'et
})
 
Nu kender du to metoder til at oprette og udføre POST-anmodninger med Fetch API.

Konklusion
Selvom Fetch API endnu ikke understøttes af alle browsere, er det et godt alternativ til XMLHttpRequest. Hvis du gerne vil lære, hvordan du kalder web-API'er ved hjælp af React, så tjek denne artikel om netop dette emne.