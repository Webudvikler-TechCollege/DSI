import express from "express";
import UserGroupController from '../Controllers/usergroup.controller.js'

const router = express.Router();
const usergroup = new UserGroupController();

router.get('/api/usergroup', (req, res) => { usergroup.list(req, res) })
router.get('/api/usergroup/:id([0-9]*)', (req, res) => { usergroup.get(req, res) })
router.post('/api/usergroup', (req, res) => { usergroup.create(req, res) })
router.put('/api/usergroup', (req, res) => { usergroup.update(req, res) })
router.delete('/api/usergroup/:id([0-9]*)', (req, res) => { usergroup.delete(req, res) })

export default router;