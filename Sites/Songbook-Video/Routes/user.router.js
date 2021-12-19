import express from 'express';
import UserController from '../Controllers/user.controller.js';

const router = express.Router();

// Instans (forekomst) af class userController
const controller = new UserController();

/* user Routes Begin */
router.get('/api/user', (req, res) => { controller.list(req, res) })
router.get('/api/user/:id([0-9]*)', (req, res) => { controller.get(req, res) })
router.post('/api/user', (req, res) => { controller.create(req, res) })
router.put('/api/user', (req, res) => { controller.update(req, res) })
router.delete('/api/user/:id([0-9]*)', (req, res) => { controller.delete(req, res) })

/* user Routes End */

export { router }