const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'escala_trabalho',
    {
        id_manutencao: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
                model: Manutencao,
                key: 'id_manutencao'
            }
        },
        id_funcionario: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
                model: Funcionario,
                key: 'id_funcionario'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)