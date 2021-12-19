import { sequelize } from "../Config/db.sequelize.js";
import { Sequelize, DataTypes, Model } from "sequelize";

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
	sequelize, 
	modelName: 'user',
	freezeTableName: true,
	underscored: true

})

export default UserModel;