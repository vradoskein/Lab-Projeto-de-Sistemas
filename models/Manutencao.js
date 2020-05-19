const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Valeta = require('./Valeta');
const Onibus = require('./Onibus');

module.exports = db.sequelize.define(
    'manutencao',
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
        id_valeta: {
            type: Sequelize.INTEGER,
            references: {
                model: Valeta,
                key: 'id_valeta'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)


// StatusManutencao = [
//     'em andamento',
//     'agendada',
//     'concluida'
// ]