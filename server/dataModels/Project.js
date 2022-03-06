let { DataTypes } = require('sequelize');

let sequelize = require("./db");

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },

    shortName: {
        type: DataTypes.STRING
    },
    longName: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    projectManagerId: {
        type: DataTypes.NUMBER
    },
    plannedStartDate: {
        type: DataTypes.DATE,
    },
    plannedEndDate: {
        type: DataTypes.DATE
    },
    actualStartDate: {
        type: DataTypes.DATE
    },
    actualEndDate: {
        type: DataTypes.DATE
    },
    projectType: {
        type: DataTypes.ENUM('INTERNAL', 'EXTERNAL', 'GREENFIELD', 'REFACTORING', 'INTEGRATION', 'MAINTAINANCE', 'GENERAL')
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted')
    },

    clientName: {
        type: DataTypes.STRING
    },

    bstatus: {
        type: DataTypes.ENUM('BILLABLE', 'NONBILLABLE')
    }

    //created_on , updated on 
})


module.exports = Project
