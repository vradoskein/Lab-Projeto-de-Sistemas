const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'funcionario',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nome: {
            type: Sequelize.STRING,
        },
        tipo: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING,
        },
        senha: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)