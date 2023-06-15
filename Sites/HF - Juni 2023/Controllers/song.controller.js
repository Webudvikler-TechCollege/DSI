import SongModel from "../Models/song.model.js";

class SongController {
	constructor() {
		console.log('Class SongController instantiated');
	}

	list = async (req, res) => {
		const result = await SongModel.findA
	}
}

export default SongController