import express from 'express';
import SongController from '../Controllers/song.controller.js';

const router = express.Router();

// Instans (forekomst) af class SongController
const controller = new SongController();

/* Song Routes Begin */
router.get('/api/song', (req, res) => { controller.list(req, res) })
router.get('/api/song/:id([0-9]*)', (req, res) => { controller.get(req, res) })
router.post('/api/song', (req, res) => { controller.create(req, res) })
router.put('/api/song', (req, res) => { controller.update(req, res) })
router.delete('/api/song/:id([0-9]*)', (req, res) => { controller.delete(req, res) })

/* Song Routes End */

export { router }