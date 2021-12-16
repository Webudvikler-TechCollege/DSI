// Mærkeligt hack til datatypes
import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../Config/db.config.js";

const SongModel = sequelize.define('song', {
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
    freezeTableName: true,
    underscored: true
})

export default SongModel