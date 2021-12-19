import express from 'express';
import { sequelize } from '../Config/db.sequelize.js'

const router = express.Router();

/* Modeller der skal medtages i initialiseringen */
import UserModel from '../Models/user.model.js'
import SongModel from '../Models/song.model.js'
import ArtistModel from '../Models/artist.model.js'

/* Init Router */
router.get('/init', (req, res) => { 
	try {
		sequelize.sync()
		res.sendStatus(200)
	}
	catch(err) {
		res.send(err)
	}
 })

export { router }