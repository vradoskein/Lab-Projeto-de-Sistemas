const express = require('express');
const valeta_router = express.Router();
const cors = require('cors');

const sequelize = require('sequelize');

const Op = require('sequelize').Op;
const db = require('../database/db.js');
const { QueryTypes } = require('sequelize');

const Valeta = require('../models/Valeta');
const Manutencao = require('../models/Manutencao');
valeta_router.use(cors());

valeta_router.post('/register', async (req, res) => {
  const dados = {
    numero_valeta: req.body.numero_valeta,
  };
  Valeta.findOne({
    where: {
      numero_valeta: dados.numero_valeta,
    },
  })
    .then((valeta) => {
      if (!valeta) {
        Valeta.create(dados)
          .then((newValeta) => {
            res.json({
              status: 'Valeta ' + newValeta.numero_valeta + ' registrada.',
            });
          })
          .catch((err) => {
            res.send('error: ' + err);
          });
      } else {
        res.send('Valeta ' + valeta.numero_valeta + ' ja existe');
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

valeta_router.post('/list', async (req, res) => {
  Valeta.findAll()
    .then((lista) => {
      if (!!lista) {
        res.json(lista);
      } else {
        res.json({
          lista: 'vazia',
          message: 'Nenhuma valeta foi encontrada',
        });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

valeta_router.get('/listFree', (req, res) => {
  Manutencao.findAll({
    attributes: ['numero_valeta'],
    where: {
      status: ['em andamento'],
    },
  })
    .then(async(listaManutencao) => {
      listaManutencao = listaManutencao.map((m) => {
        return m.dataValues.numero_valeta;
      });
      console.log('resultado Lista MANUTENCAO', listaManutencao);
      Valeta.findAll({
        where: {
          numero_valeta: {
            [Op.notIn]: listaManutencao,
          },
        },
      })
        .then((lista) => {
          if (lista.every((v) => v instanceof Valeta)) {
            res.json(lista);
          } else {
            res.json({
              lista: 'vazia',
              message: 'Nenhuma valeta foi encontrada',
            });
          }
        })
        .catch((err) => {
          res.send('error: ' + err);
        });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});


valeta_router.get('/listManut', (req, res) => {
  Manutencao.findAll({
    attributes: ['numero_valeta'],
    where: {
      status: ['em andamento'],
    },
  })
    .then(async(listaManutencao) => {
      listaManutencao = listaManutencao.map((m) => {
        return m.dataValues.numero_valeta;
      });
      console.log('resultado Lista MANUTENCAO', listaManutencao);
      Valeta.findAll({
        where: {
          numero_valeta: {
            [Op.or]: listaManutencao,
          },
        },
      })
        .then((lista) => {
          if (lista.every((v) => v instanceof Valeta)) {
            res.json(lista);
          } else {
            res.json({
              lista: 'vazia',
              message: 'Nenhuma valeta foi encontrada',
            });
          }
        })
        .catch((err) => {
          res.send('error: ' + err);
        });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

module.exports = valeta_router;
