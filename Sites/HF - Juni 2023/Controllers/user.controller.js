import UserModel from '../Models/user.model.js'

/**
 * Controller for User Actions
 */
class UserController {

	/**
	 * Method List
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	list = async (req, res) => {
		// Eksekverer sequelize metode med management values
		const result = await UserModel.findAll()
		// Udskriver resultat i json format
		res.json(result)
	}
}

export default UserController