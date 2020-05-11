const express = require('express');
const onibus_router = express.Router();
const cors = require('cors');

const Onibus = require('../models/Onibus');
onibus_router.use(cors());

process.env.SECRET_KEY = 'secret';

onibus_router.post('/register', (req, res) => {
  console.log(req.body);
  const dados = {
    id_onibus: req.body.id_onibus,
    ano_chassi: req.body.ano_chassi,
    ano_carroceria: req.body.ano_carroceria,
    modelo_onibus: req.body.modelo_onibus,
    modelo_chassi: req.body.modelo_chassi,
    km_motor: req.body.km_motor,
    data_revisao: req.body.data_revisao,
  };
  console.log(dados);

  Onibus.findOne({
    where: {
      id_onibus: req.body.id_onibus,
    },
  })
    .then((onibus) => {
      if (!onibus) {
        Onibus.create(dados)
          .then((onibus) => {
            res.json({ status: onibus.id_onibus + ' registrado' });
          })
          .catch((err) => {
            res.send('error: ' + err);
          });
      } else {
        res.json({ error: 'Onibus já existe' });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

onibus_router.get('/list', (req, res) => {
  Onibus.findAll()
    .then((onibusList) => {
      console.log(onibusList);
      res.send(onibusList);
    })
    .catch((err) => {
      console.error('error onibus/list:', err);
      res(null);
    });
});

module.exports = onibus_router;
