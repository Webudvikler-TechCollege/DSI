let a = 1;
let b = 2;

// Async call
setTimeout(() => {
    console.log(`Async Call: ${a}`);
}, 10000)

// Fetch with delay
fetch('https://deelay.me/5000/https://catfact.ninja/fact')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        a = data.fact;
    })

//
console.log(a);
console.log(b);