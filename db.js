const Sequelize = require("sequelize");
const sequelize = new Sequelize("movie_review", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
