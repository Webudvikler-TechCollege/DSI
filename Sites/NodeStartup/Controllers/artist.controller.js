import ArtistModel from '../Models/artist.model.js'
const artist = new ArtistModel();

class ArtistController {
	constructor() {
		console.log('ArtistController is running');
	}

	list = async (req, res) => {
		const result = await artist.list(req, res);
		res.send(result);
	}
}

export default ArtistController;