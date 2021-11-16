/**
 * Modul til kommentarer 
 */
import { myFetch, date2local } from "../helpers/helper.js";

/**
 * Udskriver liste af kommentarer
 */
export async function commentList(goal_id) {
    
    const loginData = JSON.parse(sessionStorage.getItem('token'));

    const options = {
        method: 'GET',
        headers: {
            'Authorization' : `Baerer ${loginData.access_token}`
        }
    }
    const data = await myFetch(`https://api.mediehuset.net/sdg/comments/${goal_id}`, options);

    if(document.querySelector('.comment-wrapper')) {
        document.querySelector('.comment-wrapper').remove();
    }

    const commentwrapper = document.createElement('div');
    commentwrapper.classList.add('comment-wrapper');
    const h2 = document.createElement('h2');
    h2.innerText = 'Kommentarer';
    commentwrapper.append(h2);

    if(data && data.items) {

        data.items.map(item => {
            const wrapper = document.createElement('div');

            const date = document.createElement('span');
            date.classList.add('date');
            date.innerText = `${date2local(item.created)}:`;

            const title = document.createElement('span');
            title.classList.add('title');
            title.innerText = item.title;

            const author = document.createElement('span');
            author.classList.add('author');
            author.innerText = `Skrevet af ${item.user.firstname} ${item.user.lastname}`;

            const body = document.createElement('span');
            body.classList.add('body');
            body.innerText = item.comment;

            wrapper.append(date, title, author, body);

            commentwrapper.append(wrapper);
        })
    } else {
        const wrapper = document.createElement('p');
        wrapper.innerText = 'Der ingen kommentarer'
        commentwrapper.append(wrapper);
    }

    const link = document.createElement('a');
    link.innerText = 'Opret kommentar';
    link.addEventListener('click', () => {
        commentForm();
    })
    commentwrapper.append(link);

    document.querySelector('.user-wrapper').append(commentwrapper);
}

function commentForm() {
    console.log(1234565);
}