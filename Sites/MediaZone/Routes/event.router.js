import express from "express";
import EventController from '../Controllers/event.controller.js'

const router = express.Router();
const event = new EventController();

router.get('/api/event', (req, res) => { event.list(req, res) })
router.get('/api/event/:id([0-9]*)', (req, res) => { event.get(req, res) })
router.post('/api/event', (req, res) => { event.create(req, res) })
router.put('/api/event', (req, res) => { event.update(req, res) })
router.delete('/api/event/:id([0-9]*)', (req, res) => { event.delete(req, res) })

export default router;