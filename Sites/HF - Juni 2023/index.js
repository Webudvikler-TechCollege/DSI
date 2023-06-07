// Importerer dependencies
import express from 'express'
import { songRouter } from './Routes/song.router.js';

// Importerer og sætter dotenv til globale vars
import dotenv from 'dotenv'
dotenv.config()

// Deklarerer app var med ekspress objekt
const app = express()

// Udvider app så vi kan læse form body data
app.use(express.urlencoded({ extended: true }))

// Anvender eksterne routes
app.use(songRouter)

// Skriver fejl hvis route ikke findes
app.use((req, res) => {
    res.status(404).send("Siden blev ikke fundet!")
})

// Aktiverer server og lytter på port fra .env fil
app.listen(process.env.PORT, () => {
	console.log(`Server kører på http://localhost:${process.env.PORT}`)	
})