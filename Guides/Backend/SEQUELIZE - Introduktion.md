# Introduktion til Sequelize
Sequelize er en promise-based ORM (Object Relational Mapping) som kører på Node.js og kan interagere med MySQL, men også andre databasetyper.

Sequelize er et effektivt værktøj til at interagere og kommunikere med en database. 
___
## Sådan installerer du sequelize:

For at installere Sequelize skal du indsætte følgende i din terminal:
```
% npm install --save sequelize
```
___
## Sådan forbinder du til din database:
Du kan indsætte følgende i en config fil og importere den der hvor du har brug for at etablere en forbindelse til dsin database:
```js
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
	'database','username','password',
	{
		host: 'localhost',
		dialect: 'mysql'
	}
)
export default sequelize
```
Du kan efterfølgende teste om din forbindelse er ok:
```js
try {
  await sequelize.authenticate();
  console.log('Der er forbindelse til databasen');
} catch (error) {
  console.error('Fejl! Kunne ikke forbinde til databasen: ', error);
}
```
___
## Sådan lukker du forbindelsen til databasen:
Sequelize vil holde forbindelsen åben som standard og bruge den samme forbindelse til alle forespørgsler. Hvis du har brug for at lukke forbindelsen, skal du kalde `sequelize.close()`.
___
## Nye databaser kontra eksisterende databaser
Hvis du starter et projekt fra bunden, og din database stadig er tom, kan Sequelize bruges til at automatisere oprettelsen af hver tabel i din database.

Hvis du vil bruge Sequelize til at oprette forbindelse til en database, der allerede er fyldt med tabeller og data, vil dette også virke.
___
## Promises og async/await
De fleste af metoderne i Sequelize er asynkrone og returnerer derfor *promises* og derfor kan du bruge Promise API og `then`, `catch` og  `finally`.

Du kan selvfølgelig også anvende async and await på normal vis.
___
## Model koncept
Modeller er essensen af Sequelize. En model er en abstraktion, der repræsenterer en tabel i din database. I Sequelize er det en klasse, der udvider klassen Model.

Modellen fortæller Sequelize flere ting om den enhed, den repræsenterer, såsom navnet på tabellen i databasen, og hvilke felter den har og deres datatyper.

En model i Sequelize har et navn. Dette navn behøver ikke at være det samme navn på tabellen, som modellen repræsenterer i databasen. Normalt har modeller entalsnavne (såsom bruger), mens tabeller har flertalsnavne (såsom brugere), selvom dette kan konfigureres.
___
## Model definition
Modeller kan defineres på to måder i Sequelize:

- Du kan bruge `sequelize.define(modelName, attributes, options)`
- Udvidelse af model klassen og et kald af metoden `init(attributes, options)`

Når en model er defineret, er den tilgængelig i sequelize.models med sit modelnavn.

I nedenstående eksempel tages der udgangspunkt i en brugertabel med et fornavn og et efternavn. Modellen hedder *user* og refererer til tabellen *users* i databasen.
___
### Brug af sequelize.define:
```js
import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributter (felter) defineres her
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull bliver sat til true som standard
  }
}, {
  // Andre model indstillinger goes here
});

// `sequelize.define` returnerer modellen
console.log(User === sequelize.models.User); // true
```
___
### Udvidelse af Model Class
```js
import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // Model attributter defineres her
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  // Andre model indstillinger goes here
  sequelize, // Connection instance skal sendes med her
  modelName: 'User' // Modellens navn 
});

// den definerede model er selv klassen
console.log(User === sequelize.models.User); // true
```
Internt kalder `sequelize.define` metoden `Model.init`, så det er to sider af samme sag.