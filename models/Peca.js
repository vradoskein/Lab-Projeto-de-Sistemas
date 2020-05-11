const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'peca',
    {
        id_peca: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_peca: {
            type: Sequelize.STRING,
        },
        modelo_peca: {
            type: Sequelize.STRING,
        },
        quantidade: {
            type: Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)