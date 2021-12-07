import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Velkommen til forsiden');
})

app.get('/about', (req, res) => {
	res.send('Om os...');
})

app.get('/products', (req, res) => {
	res.send('Produktliste');
})

// Handling non matching request from the client
app.use((req, res, next) => {
    res.status(404).send(
        "Siden blev ikke fundet")
})

app.listen(4000, () => {
	console.log('Server is running on port 4000...')
})