// Mærkeligt hack til datatypes
import { sequelize } from "../Config/db.config.js";
import { Sequelize, DataTypes, Model } from 'sequelize';

class TeamModel extends Model {}

TeamModel.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    stopdate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize, // Sequelize instance
    modelName: 'team', // Table name
    freezeTableName: true, // Lås tabelnavne til ental
    underscored: true, // Brug underscores istedet for camelcase
    createdAt: true, // Custom name
    updatedAt: true // Undlad felt
})

export default TeamModel