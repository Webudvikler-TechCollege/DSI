import { myFetch } from "./helper.js";
import { createFormElement } from './helper.js';

/**
 * Udskriver form til login
 */
export function loginForm() {
    const loginData = JSON.parse(sessionStorage.getItem('token'));

    const userwrapper = document.querySelector('.user-wrapper');


    if(!loginData) {        

        const form = document.createElement('form');
        form.setAttribute('action', 'POST');

        const username = createFormElement('input', { name: 'username', type: 'text', display: 'Brugernavn'});
        form.append(username);

        const password = createFormElement('input', { name: 'password', type: 'password', display: 'Adgangskode'});
        form.append(password);

        const button = createFormElement('button', {name: 'sendLogin', type: 'button', display: 'Login'});
        button.addEventListener('click', () => { getToken() })
        form.append(button);

        userwrapper.append(form);

    } else {
        const wrapper = document.createElement('p');
        wrapper.innerText = `Du er logget på som ${loginData.username}`;

        const button = createFormElement('button', {name: 'logout', type: 'button', display: 'Log ud'});
        button.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            location.reload();
        })
        const row = document.createElement('hr');

        userwrapper.append(wrapper, button, row);

    }
}

/**
 * Henter token fra API ud fra brugernavn og adgangskode
 */
export async function getToken() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let options = {
        method: 'POST',
        body: formData
    }

    const data = await myFetch('https://api.mediehuset.net/token', options);
    sessionStorage.setItem('token', JSON.stringify(data));
    location.reload();
}

