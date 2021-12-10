import express from 'express';
import SongController from '../Controllers/song.controller.js';

const router = express.Router();
const controller = new SongController();

// Kalder routes med controller metoder
router.get('/api/songs', (req, res) => { controller.list(req, res)});
router.get('/api/songs/:id([0-9]*)', (req, res) => { controller.get(req, res)});

export { router }