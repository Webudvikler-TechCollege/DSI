import { myFetch } from "./helper.js";

const Auth = async () => {
    const username = document.getElementById('username').value;
    const password = document.querySelector('#password').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Log med spread operator
    console.log([...formData]);

    // Log key value pairs med for/of loop og destructuring assignment 
    for(let [key, value] of formData) {
        console.log(key, value);
    }

    const options = {
        method: 'POST',
        body: formData
    }   
    
    const data = await myFetch('https://api.mediehuset.net/token', options);

   localStorage.setItem('token', JSON.stringify(data));
}


document.querySelector('#sendLogin').addEventListener('click', () => {
   Auth();
})

const loginData = JSON.parse(localStorage.getItem('token'));

if(loginData && loginData.username) {
    console.log(`Du er logget ind som ${loginData.username}`);
} else {
    console.log('Du skal logge ind')
}

