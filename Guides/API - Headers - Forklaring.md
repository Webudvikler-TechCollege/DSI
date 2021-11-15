# Hvad er en API header?

API *headers* er som en ekstra kilde til information for hvert API-kald, du foretager. Deres opgave er at repræsentere de metadata, der er forbundet med en API-anmodning og -svar.

Hvis du nogensinde støder på problemer med en API, er det første sted, du skal se, overskrifterne, da de kan hjælpe dig med at spore eventuelle potentielle problemer. Dette gør dem til en meget vigtig del af hver anmodning.

API-headere fortæller dig om:

Anmodnings- og svarorgan
Anmod om autorisation
Svar Caching
Svar-cookies
Hvor kan jeg se overskrifterne i min API-anmodning?
Du kan se overskrifter i meddelelsesteksten. Det er den del af data, der inkluderer alt i anmodningen eller svaret. Overskrifterne kommer normalt efter anmodningslinjen eller svarlinjen.

Nu, hvis du ikke ved, hvad det er, så fortvivl ikke. Bare se efter et bestemt format. Overskrifter ser alle ens ud; de har et oplagt format, som du kan se på en kilometers afstand.

Overskrifter er et nøgle-værdi-par i tekststrengformat adskilt af et kolon. For at se, hvordan de ser ud i praksis, tjek eksemplet nedenfor:

{

 "key1": "værdi1",

 "key2": "værdi2",

 "key3": "værdi3",

}

Reelle overskrifter siger dog normalt ikke nøgle og værdi. Jeg brugte bare disse udtryk for klarhedens skyld. Normalt er de brugte strenge længere og mere tilfældige, som det der sker, når din kat sidder på dit tastatur, fordi det er varmt.

Men uanset hvor lang eller tilfældig en streng ser ud, forbliver det generelle format det samme: "nøgle" : "værdi"

For at se en liste over de mest almindelige overskriftsfelter, klik her.

Eksempler på API-headere
Her er nogle af de mest almindelige API-headere, du vil støde på, når du tester enhver API.

Autorisation: Indeholder godkendelsesoplysningerne for HTTP-godkendelse.
WWW-Authenticate: Serveren sender muligvis dette som et indledende svar, hvis den har brug for en form for godkendelse, før den svarer med den faktiske ressource, der anmodes om. Efter denne overskrift følger ofte svarkoden 401, som betyder "uautoriseret".
Accept-Charset: Denne overskrift er sat sammen med anmodningen og fortæller serveren, hvilke tegnsæt (f.eks. UTF-8, ISO-8859-1, Windows-1251 osv.) der er acceptable af klienten.
Content-Type: Fortæller klienten, hvilken medietype (f.eks. applikation/json, applikation/javascript osv.) et svar sendes i. Dette er et vigtigt overskriftsfelt, der hjælper klienten med at vide, hvordan man behandler svarteksten korrekt.
Cache-kontrol: Cache-politikken defineret af serveren for dette svar, et cache-svar kan gemmes af klienten og genbruges indtil det tidspunkt, der er defineret af Cache-Control-headeren.