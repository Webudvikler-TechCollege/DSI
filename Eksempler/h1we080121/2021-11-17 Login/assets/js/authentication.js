import { CommentList } from "./comments.js";
import { myFetch } from "./helper.js";

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

const logoutHtml = `<div>
                        <p>Du er logget på som brugernavn</p>
                        <button id="logout">Log out</button>
                    </div>`;

const Auth = async () => {
    // Henter auth info fra session storage
    const loginData = sessionStorage.getItem('authInfo');
    // Henter root html element
    const root = document.querySelector('#root');

    // Hvis loginData er falsk
    if(!loginData) {
        root.innerHTML = loginHtml;
        const form = root.querySelector('form');

        form.login.addEventListener('click', async () => {
            const username = form.username.value;
            const password = form.password.value;

            if(!username) {
                alert('Du skal udfylde dit brugernavn');
                form.username.focus();
                return false;
            }

            if(!password) {
                alert('Du skal udfylde din adgangskode');
                form.password.focus();
                return false;
            }
            
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const options = {
                method: 'post',
                body: formData
            }

            const data = await myFetch('https://api.mediehuset.net/token', options);

            if(!data.message) {
                sessionStorage.setItem('authInfo', JSON.stringify(data));
                location.reload();    
            } else {
                alert('Kunne ikke logge ind!')
            }

        })
    } else {
        root.innerHTML = logoutHtml;
        const button = root.querySelector('button');

        button.addEventListener('click', () => {
            if(confirm('Vil du logge ud?')) {
                sessionStorage.removeItem('authInfo');
                location.reload();
            }
        })
    }
    //console.log(loginData);
}



Auth();
CommentList();