import express from 'express';
import dotenv from 'dotenv';
import SongRouter from './Routes/song.router.js';
import { router } from './Routes/init.router.js';

dotenv.config();

const app = express();
app.use(express.json("application/json"))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000;

app.use(router);
app.use(SongRouter);

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
})

