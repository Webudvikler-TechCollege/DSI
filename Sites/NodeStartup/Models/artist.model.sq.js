// Mærkeligt hack til datatypes
import { sequelize } from "../Config/db.config.js";
import { Sequelize, DataTypes, Model } from 'sequelize';

class ArtistModel extends Model {}

ArtistModel.init({
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
    modelName: 'artist', // Table name
    freezeTableName: true, // Lås tabelnavne til ental
    underscored: true, // Brug underscores istedet for camelcase
    //createdAt: 'created', // Custom name
    //updatedAt: false // Undlad felt
})

export default ArtistModel