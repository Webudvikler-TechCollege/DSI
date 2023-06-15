import { sequelize } from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt' // npm pakke til kryptering

class UserModel extends Model{}

UserModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},	
	is_active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	sequelize,
	modelName: 'user',
	freezeTableName: true,
	underscored: true,
	// Hooks bruges når vi skal manipulere data direkte 
	// i modellen. I nedenstående eksempel krypterer 
	// modellen password lige inden en oprettelse eller 
	// en opdatering.
	hooks: {
		beforeCreate: async(user, options) => {
			user.password = await createHash(user.password)
		},
		beforeUpdate: async(user, options) => {
			user.password = await createHash(user.password)
		},
	}


})

/**
 * Funktion til at kryptere password med
 * @param {String} password string
 * @returns krypteret password
 */
const createHash = async string => {
	const salt = await bcrypt.genSalt(10)
	const hashed_string = await bcrypt.hash(string, salt)
	return hashed_string
}

export default UserModel