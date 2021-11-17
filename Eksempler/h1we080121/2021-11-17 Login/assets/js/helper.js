
export const myFetch = async (url, options = null) => {
    let response;

    try {
        if(!options) {
            response = await fetch(url);
        } else {
            response = await fetch(url, options);
        }
        const result = await response.json();
        return result;            
    }
    catch(err) {
        console.error(`Fejl i myFetch: ${err}`)
    }
}