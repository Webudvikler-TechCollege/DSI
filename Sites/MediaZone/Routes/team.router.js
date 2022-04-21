import express from "express";
import TeamController from '../Controllers/team.controller.js'

const router = express.Router();
const team = new TeamController();

router.get('/api/team', (req, res) => { team.list(req, res) })
router.get('/api/team/:id([0-9]*)', (req, res) => { team.get(req, res) })
router.post('/api/team', (req, res) => { team.create(req, res) })
router.put('/api/team', (req, res) => { team.update(req, res) })
router.delete('/api/team/:id([0-9]*)', (req, res) => { team.delete(req, res) })

export default router;