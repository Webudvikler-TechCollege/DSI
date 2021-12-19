import ArtistModel from "../Models/artist.model.js";

const model = new ArtistModel();

class ArtistController {
	constructor() {
		console.log('Call to ArtistController');
	}

	list = async (req, res) => {
		const result = await model.list(req, res)
		res.json(result)
	}
}

export default ArtistController