import express from 'express';
import ArtistController from '../Controllers/artist.controller.js';

const router = express.Router();
const controller = new ArtistController();

// Kalder routes med controller metoder
router.get('/api/artists', (req, res) => { controller.list(req, res)});

export { router }