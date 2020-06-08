const express = require('express');
const pecas_router = express.Router();
const cors = require('cors');

const sequelize = require('sequelize');

const Op = require('sequelize').Op;
const db = require('../database/db.js');
const { QueryTypes } = require('sequelize');

const Peca = require('../models/Peca');
const EscalaPecas = require('../models/EscalaPecas');
pecas_router.use(cors());

process.env.SECRET_KEY = 'secret';

pecas_router.post('/register', (req, res) => {
  const dados = {
    tipo_peca: req.body.tipo_peca,
    modelo_peca: req.body.modelo_peca,
    quantidade: req.body.quantidade,
  };

  Peca.create(dados)
    .then((peca) => {
      res.json({ status: 'registrado' });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

pecas_router.get('/list', (req, res) => {
  Peca.findAll()
    .then((pecaList) => {
      res.send(pecaList);
    })
    .catch((err) => {
      console.error('error peca/list:', err);
      res.send(null);
    });
});

pecas_router.get('/list', (req, res) => {
  Peca.findAll()
    .then((pecaList) => {
      res.send(pecaList);
    })
    .catch((err) => {
      console.error('error peca/list:', err);
      res.send(null);
    });
});

pecas_router.get('/listFree', (req, res) => {
  Peca.findAll({ where: { quantidade: { [Op.gt]: 0 } } })
    .then((pecaList) => {
      res.send(pecaList);
    })
    .catch((err) => {
      console.error('error peca/list:', err);
      res.send(null);
    });
});

pecas_router.put('/updatePeca', (req, res) => {
  console.log(req.body);
  // let dados = {
  //   id_peca: req.body.id_peca,
  //   tipo_peca: req.body.tipo_peca,
  //   modelo_peca: req.body.modelo_peca,
  //   quantidade: req.body.quantidade,
  // };

  Peca.update(req.body.dados, { where: { id_peca: req.body.dados.id_peca } })
    .then((result) => {
      res.json({
        result,
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro update peca', err);
    });
});

pecas_router.post('/deletePeca', (req, res) => {
  Peca.destroy({ where: { id_peca: req.body.id_peca } })
    .then((result) => {
      res.json({
        result,
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro delete peca', err);
    });
});

pecas_router.post('/alocarPeca', async (req, res) => {
  let dados = {
    id_peca: req.body.id_peca,
    id_manutencao: req.body.id_manutencao,
  };

  pecaAvailable = true;

  await Peca.findOne({ where: { id_peca: dados.id_peca } })
    .then((peca) => {
      console.log(peca);
      if (peca.dataValues.quantidade <= 0) {
        pecaAvailable = false;
        res.json({ message: 'peca quantidade 0' });
      } else {
        Peca.update(
          { quantidade: peca.dataValues.quantidade - 1 },
          { where: { id_peca: peca.dataValues.id_peca } }
        )
          .then((result) => {
            // res.json({ result });
            console.log(result);
          })
          .catch((err) => {
            res.json({ message: 'erro amigo', result: false });
            console.error('erro update peca', err);
          });
      }
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro update peca', err);
    });

  if (pecaAvailable) {
    await EscalaPecas.create(dados)
      .then((escala) => {
        res.json({ escala });
        console.log(escala);
      })
      .catch((err) => {
        res.json({ message: 'erro', result: false });
        console.error('nao alocada peca');
        console.log(dados);
      });
  } else {
    res.send({ success: false });
  }
});

module.exports = pecas_router;
