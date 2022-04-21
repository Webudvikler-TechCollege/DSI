import express from 'express';
import dotenv from 'dotenv';
import EventRouter from './Routes/event.router.js';
import UserRouter from './Routes/user.router.js';
import UserGroupRouter from './Routes/usergroup.router.js';
import TeamRouter from './Routes/team.router.js';
import AuthRouter from './Routes/auth.router.js';
import { router } from './Routes/init.router.js';

dotenv.config();

const app = express();
app.use(express.json("application/json"))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000;

app.use(router);
app.use(AuthRouter);
app.use(EventRouter);
app.use(UserRouter);
app.use(UserGroupRouter);
app.use(TeamRouter);

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
})
