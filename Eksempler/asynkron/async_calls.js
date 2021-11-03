// Var declaration
const getSyncData = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://deelay.me/1000/https://catfact.ninja/fact', true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
          console.log(`Sync call: ${this.responseText}`);
        }
      };
    xhttp.send();
}

getSyncData();

const getAsyncData = () => {
    fetch('https://deelay.me/1000/https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            console.log(`Async call: ${data.fact}`);
        })
}

getAsyncData();