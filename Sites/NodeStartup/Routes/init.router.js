import express from 'express';
import { sequelize } from "../Config/db.config.js";
const router = express.Router();

import SongModel from '../Models/song.model.sq.js';

router.get('/init', (req, res) => {
    try {
        sequelize.sync();
        res.sendStatus(200);    
    }
    catch(err) {
        res.send(err);
    }
});

export { router }