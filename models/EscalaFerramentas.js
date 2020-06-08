const Sequelize = require('sequelize')
const db = require('../database/db.js')

const Ferramenta = require('../models/Ferramenta');
const Manutencao = require('../models/Manutencao');

module.exports = db.sequelize.define(
    'escala_ferramentas',
    {
        id_ferramenta: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
                model: Ferramenta,
                key: 'id_ferramenta'
            }
        },
        id_manutencao: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            references: {
                model: Manutencao,
                key: 'id_manutencao'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)
//id_ferramenta	id_funcionario