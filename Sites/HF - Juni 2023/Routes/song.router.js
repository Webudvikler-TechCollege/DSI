// Importerer dependencies
import express from 'express'
import SongController from '../Controllers/song.controller.js'
 
// Deklarerer var til router
const songRouter = express.Router()

// Deklarerer klasse instans
const song = new SongController()

// Route med GET method - henter
songRouter.get('/songs', (req, res) => {
	return song.list(req, res)
})

// Route med GET method - henter detaljer
songRouter.get('/songs/:id([0-9]*)', (req, res) => {
	return song.details(req, res)
})

// Route med POST method - opretter
songRouter.post('/songs', (req, res) => {
	return song.create(req, res)

})

// Route med PUT method - opdaterer
songRouter.put('/songs', (req, res) => {
	return song.update(req, res)
})

// Route med DELETE method - Sletter
songRouter.delete('/songs', (req, res) => {
	res.send('Sletter sang')
})


export { songRouter }