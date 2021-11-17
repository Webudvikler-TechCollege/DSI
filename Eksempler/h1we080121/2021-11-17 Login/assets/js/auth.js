import { myFetch } from "./helper.js";

const Auth = async () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const options = {
        method: 'POST',
        body: formData
    }   
    
    const data = await myFetch('https://api.mediehuset.net/token', options);
    
    sessionStorage.setItem('token', JSON.stringify(data));
}

document.querySelector('#sendLogin').addEventListener('click', () => {
   Auth();

   const loginData = JSON.parse(sessionStorage.getItem('token'));
   console.log(loginData.access_token);
   if(sessionStorage.getItem('token')) {
       console.log('du er logget ind');
   }
})