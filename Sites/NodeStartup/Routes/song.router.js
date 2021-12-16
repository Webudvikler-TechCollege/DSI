import express from "express";
import SongController from '../Controllers/song.controller.sq.js'

const router = express.Router();
const song = new SongController();

router.get('/api/song', (req, res) => { song.list(req, res) })
router.get('/api/song/:id([0-9]*)', (req, res) => { song.get(req, res) })
router.post('/api/song', (req, res) => { song.create(req, res) })
router.put('/api/song', (req, res) => { song.update(req, res) })
router.delete('/api/song/:id([0-9]*)', (req, res) => { song.delete(req, res) })

export default router;