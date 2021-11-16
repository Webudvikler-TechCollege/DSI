import { myFetch } from './helper.js';

const getToken = async () => {
    const formData = new FormData();
    formData.append('username', 'admin');
    formData.append('password', '1234');

    let options = {
        method: 'POST',
        body: formData
    }

    const data = await myFetch('https://api.mediehuset.net/token', options);
    console.log(data);

}

getToken();