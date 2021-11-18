/**
 * Modul til kommentarer 
 */
import { myFetch, date2local, createFormElement } from "../helpers/helper.js";

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
        data.items.reverse();

        data.items.map(item => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('comment');
            wrapper.id = `comment_${item.id}`;

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

            const actions = document.createElement('span');
            actions.classList.add('actions');

            const del = document.createElement('a');
            del.innerText = 'X';
            del.addEventListener('click', () => {
                deleteComment(item.id);
            })
            const edit = document.createElement('a');
            edit.innerText = 'V';
            edit.addEventListener('click', () => {
                updateComment();
            })
            actions.append(del, edit);

            wrapper.append(date, title, author, body, actions);

            commentwrapper.append(wrapper);
        })
    } else {
        const wrapper = document.createElement('p');
        wrapper.innerText = 'Der ingen kommentarer'
        commentwrapper.append(wrapper);
    }

    const h3 = document.createElement('h3');
    h3.innerText = 'Opret kommentar';
    commentwrapper.append(h3);

    document.querySelector('.user-wrapper').append(commentwrapper);
    commentForm();

}

function commentForm() {
    const commentwrapper = document.querySelector('.comment-wrapper');

    const formwrapper = document.createElement('div');
    formwrapper.classList.add('commentform');

    const form = document.createElement('form');
    form.setAttribute('action', 'POST');

    const title = createFormElement('input', { name: 'title', type: 'text', display: 'Titel'});
    form.append(title);

    const comment = createFormElement('textarea', { name: 'comment', type: 'textarea', display: 'Kommentar'});
    form.append(comment);

    const button = createFormElement('button', {name: 'saveComment', type: 'button', display: 'Gem'});
    button.addEventListener('click', () => { createComment() })
    form.append(button);

    formwrapper.append(form);    
    commentwrapper.append(formwrapper);    
}

async function createComment() {

    const title = document.querySelector('#title').value;
    const comment = document.querySelector('#comment').value;
    const goal_id = sessionStorage.getItem('goal_id');
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('goal_id', goal_id);
    formData.append('active', 0);

    const loginData = JSON.parse(sessionStorage.getItem('token'));

    const options = {
        method: 'POST',
        headers: {
            'Authorization' : `Baerer ${loginData.access_token}`
        },
        body: formData
    }

    const data = await myFetch('https://api.mediehuset.net/sdg/comments', options);
    commentList(goal_id) 
}

async function deleteComment(comment_id) {
    const loginData = JSON.parse(sessionStorage.getItem('token'));
    const goal_id = sessionStorage.getItem('goal_id');

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization' : `Bearer ${loginData.access_token}`
        }
    }

    const data = await myFetch(`https://api.mediehuset.net/sdg/comments/${comment_id}`, options);
    commentList(goal_id) 
}

async function updateComment() {


}