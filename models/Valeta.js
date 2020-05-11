const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'valeta',
    {
        numero_valeta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        disponibilidade: {
            type: Sequelize.BOOLEAN,
            defaultValue: '1'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)