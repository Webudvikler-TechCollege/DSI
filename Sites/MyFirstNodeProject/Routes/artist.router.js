import express from 'express';

const router = express.Router();

// Kalder routes med controller functions
router.get('/api/artists', (req, res) => { 
	res.status(200).send('Artist liste');
 });

export { router }