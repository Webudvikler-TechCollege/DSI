
export const myFetch = async (url, options = null) => {
    try {
        if(!options) {
            const response = await fetch(url);
        } else {
            const response = await fetch(url, options);
        }
        const result = await response.json();
        return result;            
    }
    catch(err) {
        console.error(`Fejl i myFetch: ${err}`)
    }
}