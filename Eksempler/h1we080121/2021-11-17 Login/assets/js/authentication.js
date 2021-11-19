/**
 * Authentification Module
 * Tjekker brugers login og viser login form / logout 
 */

// Importerer funktion modules
import { CommentList } from "./comments.js";
import { myFetch } from "./helper.js";

// deklarerer konstant til login form html 
const loginHtml = `<form method="post">
                        <div>
                            <label for="username"></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <div>
                            <label for="password"></label>
                            <input type="password" name="password" id="password">
                        </div>
                        <div>
                            <button type="button" id="login">Login</button>
                        </div>
                    </form>`;

// deklarerer konstant til logout button html 
const logoutHtml = `<div>
                        <p>Du er logget på som brugernavn</p>
                        <button id="logout">Log out</button>
                    </div>`;

// Auth function constant definition                    
const Auth = async () => {
    // Henter auth info fra session storage
    const loginData = sessionStorage.getItem('authInfo');
    // Henter root html element
    const root = document.querySelector('#root');

    // Hvis loginData er false...
    if(!loginData) {
        // Sætter root element til login html string
        root.innerHTML = loginHtml;
        // Henter login form ud som js objekt
        const form = root.querySelector('form');

        // Sætter click event på form button #login
        form.login.addEventListener('click', async () => {
            // Henter form input values
            const username = form.username.value;
            const password = form.password.value;

            // Validerer username
            if(!username) {
                alert('Du skal udfylde dit brugernavn');
                form.username.focus();
                return false;
            }

            // Validerer password
            if(!password) {
                alert('Du skal udfylde din adgangskode');
                form.password.focus();
                return false;
            }
            
            // Bygger formdata objekt
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            // Deklarerer option objekt
            const options = {
                method: 'post',
                body: formData
            }

            // Fetcher api endpoint med url og options
            const url = 'https://api.mediehuset.net/token';
            const data = await myFetch(url, options);
            console.log(data);
            // Hvis der ikke er en fejl meddelse i responsen
            if(data.response.ok) {
                // Gemmer json object som string i sessions storage
                sessionStorage.setItem('authInfo', JSON.stringify(data));
                // Reloader side
                location.reload();    
            } else {
                // Propmter fejl besked
                form.insertAdjacentHTML('afterend', '<p>Kunne ikke logge ind.</p>')
            }

        })
    } else {
        // Sætter root element til logout html string
        root.innerHTML = logoutHtml;
        // Henter logout knap ud som js objekt
        const button = root.querySelector('button');

        // Sætter click event på button 
        button.addEventListener('click', () => {
            // Kalder en confirm som bruger skal godkende for at logge ud
            if(confirm('Vil du logge ud?')) {
                // Sletter data i session storage
                sessionStorage.removeItem('authInfo');
                // Reloader site
                location.reload();
            }
        })
    }
}

// Kalder Auth
Auth();
// Kalder CommentList
CommentList();