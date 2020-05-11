const Sequelize = require('sequelize')
const db = require('../database/db.js')

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
//id_ferramenta	id_funcionario