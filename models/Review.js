const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const Director = require('./Director');
const Genre = require('./Genre');
const Movie=require('../models/Movie')
const User=require('../models/User')
class Review extends Model{}

Review.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
            min: 0,
            max: 10,
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Movies',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'Review',
    timestamps: false,

})
Review.belongsTo(Movie,{foreignKey:'id'})
Review.belongsTo(User,{foreignKey:'id'})

module.exports = Review;