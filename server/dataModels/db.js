let { Sequelize } = require('sequelize');
let path = require("path");


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "db", "serverDb.db")
})


module.exports = sequelize