import express from "express";
import { SongController } from '../Controllers/song.controller.js'

const SongRouter = express.Router();
const song = new SongController();

SongRouter.get('/', (req, res) => { song.list(req, res) })
SongRouter.get('/:id([0-9]*)', (req, res) => { song.get(req, res) })
SongRouter.post('/', (req, res) => { song.create(req, res) })
SongRouter.put('/', (req, res) => { song.update(req, res) })
SongRouter.delete('/:id([0-9]*)', (req, res) => { song.delete(req, res) })

export default SongRouter;