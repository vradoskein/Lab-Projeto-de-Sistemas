const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'escala_peca',
    {
        id_manutencao: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
                model: Manutencao,
                key: 'id_manutencao'
            }
        },
        id_peca: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
                model: Peca,
                key: 'id_peca'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)