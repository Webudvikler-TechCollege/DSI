// Mærkeligt hack til datatypes
import { sequelize } from "../Config/db.config.js";
import { Sequelize, DataTypes, Model } from 'sequelize';

class EventModel extends Model {}

EventModel.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
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
    modelName: 'event', // Table name
    freezeTableName: true, // Lås tabelnavne til ental
    underscored: true, // Brug underscores istedet for camelcase
    createdAt: true, // Custom name
    updatedAt: true // Undlad felt
})

export default EventModel