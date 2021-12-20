import { sequelize } from "../Config/db.sequelize.js";
import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from 'bcrypt'

class UserModel extends Model {}

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
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: 0
	}
}, {
	// Db instance
	sequelize, 
	// Modellens navn
	modelName: 'user',
	// Hold tabelnavne til ental
	freezeTableName: true,
	// Udskift camelcase med underscores
	underscored: true,
	// Hooks til data behandling før/efter kald af model
	hooks: { 
		beforeCreate: async (user, options) => {
			user.password = await createHash(user.password)
		}, 
		beforeUpdate: async (user, options) => {
			user.password = await createHash(user.password)
		}
	}
})

/**
 * Genererer hash string ud fra bcrypt
 * @param {String} string 
 * @returns hashed string
 */
const createHash = async string => {
    const salt = await bcrypt.genSalt(10);
    const hashed_string = await bcrypt.hash(string, salt);
	return hashed_string;
}

export default UserModel;