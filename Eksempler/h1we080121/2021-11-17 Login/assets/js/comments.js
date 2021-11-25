/**
 * Comments API Module
 * Henter, opretter og sletter kommentarer
 */
import { myFetch } from "./helper.js";

// Deklarerer globale konstanter 
const root = document.querySelector('#root');
const loginData = JSON.parse(sessionStorage.getItem('authInfo'));

/**
 * Function CommentList
 * Henter liste over kommentarer
 */
export const CommentList = async () => {
    // Betinger at loginData er sand
    if(loginData && loginData.access_token) {

        if(root.querySelector('.list-wrapper')) {
            root.querySelector('.list-wrapper').remove();
        }

        // Deklarerer options objekt med GET og auth headers
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${loginData.access_token}`
            }
        }

        // Deklarerer fetch med url og options
        const url = 'https://api.mediehuset.net/sdg/comments';
        const data = await myFetch(url, options);
        data.items.reverse();

        // Opretter button element til at tilføje nye kommentarer
        const button = document.createElement('button');
        button.innerText = 'Opret ny kommentar';
        // Sætter event på knap som kalder CommentForm
        button.addEventListener('click', () => {
            commentForm();
        })
        root.append(button);

        // Opretter wrapper element
        const listwrapper = document.createElement('div');
        listwrapper.classList.add('list-wrapper');

        // Opretter table element
        const table = document.createElement('table');
        const row_head = document.createElement('tr');

        // Opretter thead elements
        const th1 = document.createElement('th');
        th1.innerText = 'Title';
        const th2 = document.createElement('th');
        th2.innerText = 'Brødtekst';
        const th3 = document.createElement('th');
        th3.innerText = 'Bruger';
        const th4 = document.createElement('th');
        th4.innerText = 'Mål';
        const th5 = document.createElement('th');
        th5.innerText = 'Handling';

        // Tilføjer table headers til table element
        row_head.append(th1, th2, th3, th4, th5);
        table.append(row_head);

        // Mapper data.items og opretter table row og data elementer
        data && data.items.map(item => {
            const tr = document.createElement('tr');

            const td1 = document.createElement('td'); // Titel
            td1.innerText = item.title;

            const td2 = document.createElement('td'); // Brødtekst
            td2.innerText = item.comment;

            const td3 = document.createElement('td'); // Bruger
            td3.innerText = `${item.user.firstname} ${item.user.lastname}`;

            const td4 = document.createElement('td'); // Mål titel
            td4.innerText = item.goal_title;

            // Handlinger er redigerings- og slette knapper
            const td5 = document.createElement('td'); 

            // Opretter knap til at slette med
            const del_btn = document.createElement('button');
            del_btn.innerText = 'Slet';
            // Click event til delete funktion
            del_btn.addEventListener('click', () => {
                // CommentDelete tager kommentar id som argument
                CommentDelete(item.id);
            })            
            td5.append(del_btn);

            // Tilføjer table row og data
            tr.append(td1, td2, td3, td4, td5);
            table.append(tr);
        })
        // Tilføjer table til root element
        listwrapper.append(table);
        // Tilføjer table til root element
        root.append(listwrapper);

    } else {
        console.log('Kan ikk hent list');
    }
}

/**
 * CommentForm udskriver formular og kalder API med en fetch POST
 */
function commentForm() {
    // Deklarerer konstant med string form html
    const formHtml = `<form method="post">
                            <input type="hidden" name="goal_id" value="7">
                            <input type="hidden" name="active" value="1">
                            <div>
                                <label for="title"></label>
                                <input type="text" name="title" id="title">
                            </div>
                            <div>
                                <label for="comment"></label>
                                <textarea name="comment" id="comment"></textarea>
                            </div>
                            <div>
                                <button type="button" id="send">Gem</button>
                            </div>
                        </form>`;

    const formwrapper = document.createElement('div');
    formwrapper.classList.add('form-wrapper');
    formwrapper.innerHTML = formHtml;

    // Indsætter form string i root element
    root.append(formwrapper);
    // Henter form som objekt fra root element
    const form = root.querySelector('form');

    // Sætter click event på form knap
    form.send.addEventListener('click', async () => {
        // Deklarerer konstant med objekt af FormData med form objekt som argument
        const formData = new FormData(form);

        // Deklarerer options objekt med metode, body og auth headers
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                Authorization : `Bearer ${loginData.access_token}`
            }
        }
        
        // Kalder fetch med url og options
        const url = 'https://api.mediehuset.net/sdg/comments';        
        const data = await myFetch(url, options);

        if(data.response.ok) {
            // Logger respons data
            CommentList();
        }

    })
}

async function CommentDelete(comment_id) {
    const url = `https://api.mediehuset.net/sdg/comments/${comment_id}`;

    const options = {
        method: 'DELETE',
        headers: {
            Authorization : `Bearer ${loginData.access_token}`
        }
    }

    const data = await myFetch(url, options);
    location.reload();
}