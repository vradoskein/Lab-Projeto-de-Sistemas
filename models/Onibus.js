const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'onibus',
    {
        id_onibus: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ano_chassi: {
            type: Sequelize.INTEGER,
        }, 
        ano_carroceria: {
            type: Sequelize.INTEGER,
        },
        modelo_onibus: {
            type: Sequelize.STRING,
        },
        modelo_chassi: {
            type: Sequelize.INTEGER,
        },
        km_motor: {
            type: Sequelize.DOUBLE,
        },
        data_revisao: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)