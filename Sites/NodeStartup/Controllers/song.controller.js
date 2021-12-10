import { SongModel } from '../Models/song.model.js'
const song = new SongModel();

class SongController {
	constructor() {
		console.log('SongController is running');
	}

	list = async (req, res) => {
		const result = await song.list(req, res);
		res.send(result);
	}

	get = async (req, res) => {
		const result = await song.get(req, res);
		res.send(result);
	}

	create = async (req, res) => {
		const result = await song.create(req, res);
		res.send(result);
	}

	update = async (req, res) => {
		const result = await song.update(req, res);
		res.send(result);
	}

	delete = async (req, res) => {
		const result = await song.delete(req, res);
		res.send(result);
	}
}

export { SongController }