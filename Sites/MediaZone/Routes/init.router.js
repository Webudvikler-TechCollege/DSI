import express from 'express';
import { sequelize } from "../Config/db.config.js";
const router = express.Router();

import EventModel from '../Models/event.model.js';
import UserModel from '../Models/user.model.js';
import UserGroupModel from '../Models/usergroup.model.js';
import TeamModel from '../Models/team.model.js';

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