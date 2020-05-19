const express = require('express');
const manutencao_router = express.Router();
const cors = require('cors');

const Manutencao = require('../models/Manutencao');
manutencao_router.use(cors());

process.env.SECRET_KEY = 'secret';

manutencao_router.post('/register', (req, res) => {
  console.log(req.body);
  const dados = {
    id_manutencao: req.body.id_manutencao,
    id_onibus: req.body.id_onibus,
    id_valeta: req.body.id_valeta,
    status: req.body.status,
    data_manutencao: req.body.data_manutencao,
  };
  console.log(dados);

  Manutencao.findOne({
    where: {
      id_manutencao: req.body.id_manutencao,
    },
  })
    .then((manutencao) => {
      if (!manutencao) {
        Manutencao.create(dados)
          .then((manutencao) => {
            res.json({ status: manutencao.id_manutencao + ' registrado' });
          })
          .catch((err) => {
            res.send('error: ' + err);
          });
      } else {
        res.json({ error: 'Manutencao já existe' });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

manutencao_router.get('/list', (req, res) => {
  Manutencao.findAll()
    .then((manutencaoList) => {
      console.log(manutencaoList);
      res.send(manutencaoList);
    })
    .catch((err) => {
      console.error('error manutencao/list:', err);
      res(null);
    });
});

module.exports = manutencao_router;
