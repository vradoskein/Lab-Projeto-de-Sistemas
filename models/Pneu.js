const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Onibus = require('./Onibus');

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
        posicao_pneu:{
            type: Sequelize.INTEGER,
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
// posicao_pneu: ["traseira_esquerda"=1, "traseira_direita"=2,"meio_esquerda"=3,"meio_direita"=4, "frente_esquerda"=5, "frente_direita"=6, "reserva"=7]