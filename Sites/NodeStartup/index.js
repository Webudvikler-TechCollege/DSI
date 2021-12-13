import express from 'express';
import dotenv from 'dotenv';
import SongRouter from './Routes/song.router.js';
import ArtistRouter from './Routes/artist.router.js';

dotenv.config();

const app = express();
app.use(express.json("application/json"))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000;

app.use(SongRouter);
app.use(ArtistRouter);

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
})

