import TeamModel from '../Models/team.model.js'

class TeamController {
	constructor() {}

	list = async (req, res) => {
		const result = await TeamModel.findAll({
            //limit: 2,            
            order: ['name']
        });
		res.send(result);
	}

    get = async (req, res) => {
        try {
            const result = await TeamModel.findAll({ where: { id: req.params.id }});
            return res.json(result);    
        }
        catch(err) {
            return res.send(err);    
        }
    }	

	create = async (req, res) => {
        const { name, startdate, stopdate } = req.body;
        
        if(name && startdate && stopdate) {
            const model = await TeamModel.create(req.body);
            return res.json({newid: model.id});
        } else {
            return res.send(418)
        }	
	}
	
    update = async (req, res) => {
        const { name, startdate, stopdate, id } = req.body;
        
        if(name && startdate && stopdate && id) {
            await TeamModel.update(req.body, { where: { id: id }});
            return res.sendStatus(200);
        } else {
            return res.send(418)
        }
    }

    delete = async (req, res) => {
        try {
            await TeamModel.destroy({ where: { id: req.params.id }});
            res.sendStatus(200)
        }
        catch(err) {
            res.send(err)
        }
    }	
}

export default TeamController