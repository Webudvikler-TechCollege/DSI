// Global funktioner - kan bruges overalt

export const myFetch = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;    
    }
    catch(err) {
        console.error(`myFetch Error: ${err}`)
    }
}