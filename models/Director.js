const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const Movie = require('../models/Movie');
const Genre=require('../models/Genre')
class Director extends Model{}

Director.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'Directors',
    timestamps: false,
})


Director.hasMany(Movie, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

Movie.belongsTo(Director, {
    foreignKey: 'id',
});

module.exports=Director