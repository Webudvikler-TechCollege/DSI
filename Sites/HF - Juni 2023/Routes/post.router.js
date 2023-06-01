// Importerer dependencies
import { log } from 'console'
import express from 'express'

// Deklarerer var til router
const postRouter = express.Router()

// Route med GET method - henter
postRouter.get('/posts', (req, res) => {
	// Get parametre hentes på request objektets query property
	console.log(req.query)
	
	res.send('Hent alle poster')
})

// Route med POST method - opretter
postRouter.post('/posts', (req, res) => {
	// Henter form body data på res objektet og "sender" (udskriver) til browser
	// Du kan logge req.body og se alle forespørgelsens form data 
	res.send(`
		${req.body.firstname} ${req.body.lastname}
		${req.body.address}
		${req.body.city}
	`)
})

// Route med PUT method - opdaterer
postRouter.put('/posts', (req, res) => {
	res.send('Opdater post')
})

// Route med DELETE method - Sletter
postRouter.delete('/posts', (req, res) => {
	res.send('Sletter post')
})


export { postRouter }