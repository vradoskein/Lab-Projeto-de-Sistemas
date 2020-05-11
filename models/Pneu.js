const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'pneu',
    {
        id_pneu: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        km_pneu: {
            type: Sequelize.DOUBLE,
        },
        modelo_pneu: {
            type: Sequelize.STRING,
        },
        tipo_pneu: {
            type: Sequelize.STRING,
        },
        id_onibus: {
            type: Sequelize.INTEGER,
            references: {
                model: Onibus,
                key: 'id_onibus'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)
//id_pneu	km_pneu	modelo_pneu	tipo_pneu	id_onibus