const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'ferramenta',
    {
        id_ferramenta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_ferramenta: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)