import express from "express";
import { SongController } from '../Controllers/song.controller.js'

const SongRouter = express.Router();
const song = new SongController();

SongRouter.get('/api/song', (req, res) => { song.list(req, res) })
SongRouter.get('/api/song/:id([0-9]*)', (req, res) => { song.get(req, res) })
SongRouter.post('/api/song', (req, res) => { song.create(req, res) })
SongRouter.put('/api/song', (req, res) => { song.update(req, res) })
SongRouter.delete('/api/song/:id([0-9]*)', (req, res) => { song.delete(req, res) })

export default SongRouter;