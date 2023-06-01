import express from 'express'

const postRouter = express.Router()

postRouter.get('/posts', (req, res) => {
	res.send('Hent alle poster')
})
postRouter.post('/posts', (req, res) => {
	console.log(req.body);
	res.send('Opret ny post')
})

export { postRouter }