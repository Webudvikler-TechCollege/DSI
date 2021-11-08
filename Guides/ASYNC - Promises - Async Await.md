# Javascript Promises - Async Await

Der er en særlig syntaks til at arbejde med promises på en mere behagelig måde, kaldet "async/await". Det er overraskende nemt at forstå og bruge.

## Asynkrone funktioner
Lad os starte med det keywordet `async`. Den placeres før en funktion, som i denne defination:
```js
async function f() {
   retur 1;
}
```
Når vi sætter `async` foran en funktion betyder det ganske enkelt at funktionen skal returnere et promise.

For eksempel returnerer denne funktion et opfyldt promise med resultatet 1:
```js
async function f() {
   retur 1;
}

f().then(alert); // 1
```
Vi kunne udtrykkeligt returnere et promise, som ville være det samme:
```js
async function f() {
   return Promise.resolve(1);
}
f().then(alert); // 1
```
Så async sikrer altså, at vores funktion returnerer et promise. Der findes et andet keyword som kun virker i async-funktioner, og som er ganske effektivt når vi arbejder med asynkrone kald.
___
## Await
```js
// virker kun i async-funktioner
let value = await promise;
```
Nøgleordet await får JavaScript til at vente, indtil et promise bliver løst og returnerer resultatet.

Følgende er et eksempel med et promise, der løser sig på 1 sekund:
```js
async function f() {

  let promise = new Promise((afgør, afvis) => {
    setTimeout(() => resolve("Done!"), 1000)
  });

  let result = await promise; // vent indtil løftet løser sig (*)

  alert(result); // "Færdig!"
}

// Kalder funktion
f();

```
I eksemplet "pauser" funktionskaldet ved linjen med `await` keywordet og genoptages først, når vores promise er afviklet og returneret et resultat. 

Dermed suspenderer `await` funktionsudførelsen, indtil et promise er afviklet, og genoptager det derefter med resultatet af det promise. Det koster ingen CPU-ressourcer, fordi JavaScript-motoren kan udføre andre opgaver i mellemtiden som at udføre andre scripts, håndtere begivenheder osv.

Denne måde er bare en mere elegant syntaks end .then og catch metoden. Og så er det nemmere at læse og skrive.

Kan ikke bruge vente i almindelige funktioner
Hvis vi forsøger at bruge await i en ikke-asynkron funktion, vil der være en syntaksfejl:

funktion f() {
  lad løfte = Promise.resolve(1);
  lad resultat = afvent løfte; // Syntaks fejl
}
Vi får muligvis denne fejl, hvis vi glemmer at sætte async før en funktion. Som tidligere nævnt fungerer afvent kun i en asynkronfunktion.

Lad os tage showAvatar()-eksemplet fra kapitlet Promises chaining og omskrive det ved hjælp af async/await:

Vi bliver nødt til at erstatte .dan opkald med afventer.
Vi bør også gøre funktionen asynkroniseret, så de kan fungere.
asynkron funktion showAvatar() {

  // læs vores JSON
  lad svar = await fetch('/article/promise-chaining/user.json');
  lad bruger = afvent svar.json();

  // læs github-bruger
  lad githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  lad githubUser = await githubResponse.json();

  // vis avataren
  lad img = document.createElement('img');
  img.src = githubBruger.avatar_url;
  img.className = "løfte-avatar-eksempel";
  document.body.append(img);

  // vent 3 sekunder
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  returner githubUser;
}

showAvatar();
Temmelig ren og let at læse, ikke? Meget bedre end før.