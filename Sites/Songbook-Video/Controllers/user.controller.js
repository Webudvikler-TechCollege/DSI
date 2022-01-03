import UserModel from '../Models/user.model.js';

class UserController {
	// Class constructor
	constructor() {}

	/* User Controller Methods Begin */
	list = async (req, res) => {
		const orderby = req.query.orderby || 'id'
		const limit = req.query.limit || 1000
		const result = await UserModel.findAll({
			attributes: ['id', 'firstname', 'lastname'], // Felter
			limit: Number(limit), // Limit
			order: [orderby] // Sortering
		})
		res.json(result)
	}

	get = async (req, res) => {
		const result = await UserModel.findAll({
			where: { id: req.params.id }
		})
		res.json(...result)
	}

	create = async (req, res) => {
		const { firstname, lastname, email, password } = req.body;

		if(firstname && lastname && email && password) {
			const model = await UserModel.create(req.body)
			return res.json({ newid: model.id})
		} else {
			res.send(418)
		}
	}

	update = async (req, res) => {
		const { firstname, lastname, email, password, id } = req.body;

		if(firstname && lastname && email && password && id) {
			const model = await UserModel.update(req.body, { 
				where: { id: id },
				individualHooks: true // Tillader update hook
			})
			return res.json({ status: true })
		} else {
			res.send(418)
		}
	}	

	delete = async (req, res) => {
		try {
			await UserModel.destroy({ where: { id: req.params.id }})
			res.sendStatus(200)
		}
		catch(err) {
			res.send(err)
		}
	}	
	/* User Controller Methods End */
}

export default UserController;