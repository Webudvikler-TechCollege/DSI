// Mærkeligt hack til datatypes
import { sequelize } from "../Config/db.config.js";
import { Sequelize, DataTypes, Model } from 'sequelize';

class SongModel extends Model {}

SongModel.init({
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
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize, // Sequelize instance
    modelName: 'song', // Table name
    freezeTableName: true, // Lås tabelnavne til ental
    underscored: true, // Brug underscores istedet for camelcase
    //createdAt: 'created', // Custom name
    //updatedAt: false // Undlad felt
})

export default SongModel