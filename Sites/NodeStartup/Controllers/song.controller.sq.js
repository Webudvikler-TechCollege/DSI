import SongModel from '../Models/song.model.sq.js'
import ArtistModel from "../Models/artist.model.sq.js";

ArtistModel.hasMany(SongModel);
SongModel.belongsTo(ArtistModel);
class SongController {
	constructor() {}

	list = async (req, res) => {
		const result = await SongModel.findAll({
            //limit: 2,
            attributes: ['id','title'],
            order: ['title'],
            include: {
                model: ArtistModel,
                attributes: ['id','name']
            }
        });
		res.send(result);
	}

    get = async (req, res) => {
        try {
            const result = await SongModel.findAll({ where: { id: req.params.id }});
            return res.json(result);    
        }
        catch(err) {
            return res.send(err);    
        }
    }	

	create = async (req, res) => {
        const { title, content, artist_id } = req.body;
        
        if(title && content && artist_id) {
            const model = await SongModel.create(req.body);
            return res.json({newid: model.id});
        } else {
            return res.send(418)
        }	
	}
	
    update = async (req, res) => {
        const { title, content, artist_id, id } = req.body;
        
        if(title && content && artist_id) {
            await SongModel.update(req.body, { where: { id: id }});
            return res.sendStatus(200);
        } else {
            return res.send(418)
        }
    }

    delete = async () => {
        try {
            await SongModel.destroy({ where: { id: req.params.id }});
            res.sendStatus(200)
        }
        catch(err) {
            res.send(err)
        }
    }	
}

export default SongController