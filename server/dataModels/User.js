let { DataTypes } = require("sequelize");
let sequelize = require("./db");



const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,

    },
    lastName: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    }
    ,
    employeeId: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
    },
    welcomeToken: {
        type: DataTypes.STRING,
    },

    welcomeTokenExpiresOn: {
        type: DataTypes.DATE,
    },
    welcomeTokenUsedOn: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted'),
    },
    // createdAt and updatedAt is automatically added by Sequelize


});

module.exports = User;