import express from 'express'
import { postRouter } from './Routes/post.router.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get("/", (req, res) => {
	res.send("Velkommen til min NodeJS app");
})

app.use(postRouter)

app.use((req, res) => {
    res.status(404).send("Siden blev ikke fundet!")
})

app.listen(process.env.PORT, () => {
	console.log(`Server kører på http://localhost:${process.env.PORT}`)	
})