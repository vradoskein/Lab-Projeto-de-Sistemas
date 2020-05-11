const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'manuntencao',
    {
        id_manutencao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        status: {
            type: Sequelize.STRING,
        },
        data_manutencao: {
            type: Sequelize.DATE,
        },
        id_onibus: {
            type: Sequelize.INTEGER,
            references: {
                model: Onibus,
                key: 'id_onibus'
            }
        },
        numero_valeta: {
            type: Sequelize.INTEGER,
            references: {
                model: Valeta,
                key: 'numero_valeta'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)