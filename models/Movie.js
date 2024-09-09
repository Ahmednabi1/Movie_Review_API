const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const Director = require('./Director');
const Genre = require('./Genre');
const MovieGenre=require('../models/MovieGenres');
class Movie extends Model {}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        scenesGallery: {
            type: DataTypes.TEXT,
        },
        releaseDate: {
            type: DataTypes.DATE,
        },
        directorId: {
            type: DataTypes.INTEGER,
            references: {
                model: Director,
                key: 'id',
            },
        },
        genreId: {
            type: DataTypes.INTEGER,
            references: {
                model: Genre,
                key: 'id',
            },
        },
        thumbnail: {
            type: DataTypes.STRING(255),
        },
    },
    {
        sequelize,
        modelName: 'Movie',
        tableName: 'Movies',
        timestamps: false,
    }
);



module.exports = Movie;