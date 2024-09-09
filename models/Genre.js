const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const Movie = require('../models/Movie');
class Genre extends Model {}

Genre.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'genres',
        timestamps:false
    }
);
module.exports=Genre