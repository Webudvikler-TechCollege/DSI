import express from "express";
import UserController from '../Controllers/user.controller.js'

const router = express.Router();
const user = new UserController();

router.get('/api/user', (req, res) => { user.list(req, res) })

export default router;