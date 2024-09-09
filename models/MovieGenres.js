const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
class MovieGenre extends Model {}

MovieGenre.init({
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Movies',
            key: 'id',
        },
        primaryKey: true,
    },
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Gneres',
            key: 'id',
        },
        primaryKey: true,
    },
}, {
    sequelize,
    modelName: 'MovieGenre',
    tableName: 'MovieGenres',
    timestamps: false,
});