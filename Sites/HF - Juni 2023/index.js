import express from 'express'
import { postRouter } from './Routes/post.router.js';

const app = express()

app.get("/", (req, res) => {
	res.send("Velkommen til min NodeJS app");
})

app.use(postRouter)


app.use((req, res) => {
    res.status(404).send("Siden blev ikke fundet!")
})

app.listen(4242, () => {
	console.log('Server kører på port 4242: http://localhost:4242')	
})