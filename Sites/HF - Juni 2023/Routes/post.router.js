// Importerer dependencies
import express from 'express'
import SongController from '../Controllers/song.controller.js'
 
// Deklarerer var til router
const postRouter = express.Router()

// Deklarerer klasse instans
const song = new SongController()

// Route med GET method - henter
postRouter.get('/posts', (req, res) => {
	return song.list(req, res)
})

// Route med GET method - henter detaljer
postRouter.get('/posts/:id([0-9]*)', (req, res) => {
	return song.details(req, res)
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