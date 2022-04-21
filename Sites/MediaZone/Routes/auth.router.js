import express from 'express';
import AuthController from '../Controllers/auth.controller.js'
import VerifyToken from '../Middleware/verifyToken.js'

const router = express.Router();
const auth = new AuthController();

// Route til login
router.post('/login', (req, res) => { auth.login(req, res) })
// Route eksempel til beskyttet side - verifyToken (middleware) tjekker om token er ok
router.get('/protected', VerifyToken, (req, res) => { auth.protected(req, res) })

export default router