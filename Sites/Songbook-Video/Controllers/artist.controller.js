import ArtistModel from '../Models/artist.model.js';
import SongModel from '../Models/song.model.js';

ArtistModel.hasMany(SongModel)
SongModel.belongsTo(ArtistModel)

class ArtistController {
	// Class constructor
	constructor() { }

	/* Song Controller Methods Begin */
	list = async (req, res) => {
		const orderby = req.query.orderby || 'id'
		const limit = req.query.limit || 1000
		const result = await ArtistModel.findAll({
			attributes: ['id', 'name'],
			limit: Number(limit),
			order: [orderby]
		})
		res.json(result)
	}

	get = async (req, res) => {
		const result = await ArtistModel.findAll({
			where: { id: req.params.id },
			include: {
				model: SongModel,
				attributes: ['id', 'title']
			}
		})
		res.json(...result)
	}

	create = async (req, res) => {
		const { title, content, artist_id } = req.body;

		if (title && content && artist_id) {
			const model = await SongModel.create(req.body)
			return res.json({ newid: model.id })
		} else {
			res.send(418)
		}
	}

	update = async (req, res) => {
		const { title, content, artist_id, id } = req.body;

		if (title && content && artist_id && id) {
			const model = await SongModel.update(req.body, { where: { id: id } })
			return res.json({ status: true })
		} else {
			res.send(418)
		}
	}

	delete = async (req, res) => {
		try {
			await SongModel.destroy({ where: { id: req.params.id } })
			res.sendStatus(200)
		}
		catch (err) {
			res.send(err)
		}
	}
	/* Song Controller Methods End */
}

export default ArtistController;