import { myFetch } from "./helper.js"

const CommentList = async () => {

    const loginData = JSON.parse(localStorage.getItem('token'));

    const options = {
        headers : {
            'Authorization' : `Bearer ${loginData.access_token}`
        }
    }

    const data = await myFetch('https://api.mediehuset.net/sdg/comments', options);
    console.log(data)
}

CommentList();