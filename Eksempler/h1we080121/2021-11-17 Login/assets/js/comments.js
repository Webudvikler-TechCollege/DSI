export const CommentList = async () => {
    const loginData = JSON.parse(sessionStorage.getItem('authInfo'));

    if(loginData && loginData.access_token) {
        console.log('Hete listet af komentarer');
    } else {
        console.log('Kan ikke hente liste');
    }
}