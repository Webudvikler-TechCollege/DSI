import express from "express";
import UserController from '../Controllers/user.controller.js'

const router = express.Router();
const user = new UserController();

router.get('/api/user', (req, res) => { user.list(req, res) })
router.get('/api/user/:id([0-9]*)', (req, res) => { user.get(req, res) })
router.post('/api/user', (req, res) => { user.create(req, res) })
router.put('/api/user', (req, res) => { user.update(req, res) })
router.delete('/api/user/:id([0-9]*)', (req, res) => { user.delete(req, res) })

export default router;