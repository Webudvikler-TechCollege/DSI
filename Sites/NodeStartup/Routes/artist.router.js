import express from "express"
import ArtistController from "../Controllers/artist.controller.js"

const ArtistRouter = express.Router()
const controller = new ArtistController()

ArtistRouter.get('/api/artist', (req, res) => {  })

export default ArtistRouter