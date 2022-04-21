import UserGroupModel from '../Models/usergroup.model.js'

class UserGroupController {
	constructor() {}

	list = async (req, res) => {
		const result = await UserGroupModel.findAll({
            //limit: 2,            
            order: ['name']
        });
		res.send(result);
	}

    get = async (req, res) => {
        try {
            const result = await UserGroupModel.findAll({ where: { id: req.params.id }});
            return res.json(result);    
        }
        catch(err) {
            return res.send(err);    
        }
    }	

	create = async (req, res) => {
        const { name } = req.body;
        
        if(name) {
            const model = await UserGroupModel.create(req.body);
            return res.json({newid: model.id});
        } else {
            return res.send(418)
        }	
	}
	
    update = async (req, res) => {
        const { name, id } = req.body;
        
        if(name && id) {
            await UserGroupModel.update(req.body, { where: { id: id }});
            return res.sendStatus(200);
        } else {
            return res.send(418)
        }
    }

    delete = async (req, res) => {
        try {
            await UserGroupModel.destroy({ where: { id: req.params.id }});
            res.sendStatus(200)
        }
        catch(err) {
            res.send(err)
        }
    }	
}

export default UserGroupController