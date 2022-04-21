import jwt from 'jsonwebtoken';
import dotenv from "dotenv"; 

dotenv.config()

/**
 * Middleware til bekræftelse af jsonwebtoken string
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const VerifyToken = (req, res, next) => {
	const baererHeader = req.headers['authorization']
	if(typeof baererHeader !== 'undefined') {
		req.token = baererHeader.split(' ')[1]
		jwt.verify(req.token, process.env.PRIVATE_KEY, (err, data) => {
			if(err) {
				res.sendStatus(403)
			} else {		
				next()		
			}
		})
	} else {
		res.sendStatus(403)
	}
}

export default VerifyToken;