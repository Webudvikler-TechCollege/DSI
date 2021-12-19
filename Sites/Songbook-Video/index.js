import express from 'express';
import { router as UserRouter } from './Routes/user.router.js';
import { router as SongRouter } from './Routes/song.router.js';
import { router as ArtistRouter } from './Routes/artist.router.js';
import { router as InitRouter } from './Routes/init.sequelize.router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }))

// App Settings to ensure CORS
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

const port = process.env.PORT || 4000;

app.use(InitRouter);
app.use(UserRouter);
app.use(SongRouter);
app.use(ArtistRouter);

app.listen(port, () => {
	console.log(`Server kører på port http://localhost:${port}`);
})