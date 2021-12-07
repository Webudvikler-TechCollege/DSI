import express from 'express';

const router = express.Router();

// Kalder routes med controller functions
router.get('/api/songs', (req, res) => { 
	res.status(200).send('Sangliste');
 });

export { router }