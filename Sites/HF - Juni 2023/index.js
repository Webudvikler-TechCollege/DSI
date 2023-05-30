import express from 'express'

const app = express()

app.get("/", (req, res) => {
	res.send("Velkommen til min NodeJS app");
})

app.get("/about", (req, res) => {
	res.send("Læs om min Node.JS app");
})

app.use((req, res) => {
    res.status(404).send("Siden blev ikke fundet")
})

app.listen(4242, () => {
	console.log('Server kører på port 4242: http://localhost:4242')	
})