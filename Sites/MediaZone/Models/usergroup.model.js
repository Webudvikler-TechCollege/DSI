// Mærkeligt hack til datatypes
import { sequelize } from "../Config/db.config.js";
import { Sequelize, DataTypes, Model } from 'sequelize';

class UserGroupModel extends Model {}

UserGroupModel.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, // Sequelize instance
    modelName: 'usergroup', // Table name
    freezeTableName: true, // Lås tabelnavne til ental
    underscored: true, // Brug underscores istedet for camelcase
    createdAt: true, // Custom name
    updatedAt: true // Undlad felt
})

export default UserGroupModel