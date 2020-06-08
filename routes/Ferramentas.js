const express = require('express');
const ferramentas_router = express.Router();
const cors = require('cors');

const sequelize = require('sequelize');

const Op = require('sequelize').Op;
const db = require('../database/db.js');
const { QueryTypes } = require('sequelize');

const Ferramenta = require('../models/Ferramenta');
const EscalaFerramentas = require('../models/EscalaFerramentas');
ferramentas_router.use(cors());

process.env.SECRET_KEY = 'secret';

ferramentas_router.post('/register', (req, res) => {
  const dados = {
    tipo_ferramenta: req.body.tipo_ferramenta,
  };

  Ferramenta.create(dados)
    .then((ferramenta) => {
      res.json({ status: 'registrado' });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

ferramentas_router.get('/list', (req, res) => {
  Ferramenta.findAll()
    .then((ferramentaList) => {
      res.send(ferramentaList);
    })
    .catch((err) => {
      console.error('error ferramenta/list:', err);
      res.send(null);
    });
});

ferramentas_router.put('/updateFerramenta', (req, res) => {
  let dados = {
    tipo_ferramenta: req.body.tipo_ferramenta,
  };

  Ferramenta.update(dados, { where: { id_ferramenta: req.body.id_ferramenta } })
    .then((result) => {
      res.json({
        result,
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro update ferramenta', err);
    });
});

ferramentas_router.post('/deleteFerramenta', (req, res) => {
  console.log(req)
  console.log(req.body.id_ferramenta)
  Ferramenta.destroy({ where: { id_ferramenta: req.body.id_ferramenta } })
    .then((result) => {
      res.json({
        result,
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro delete ferramenta', err);
    });
});

ferramentas_router.get('/listFree', async (req, res) => {
  const fList = await EscalaFerramentas.findAll({
    attributes: ['id_ferramenta'],
  }).then((et) => {
    var list = [];
    et.forEach((obj) => {
      list.push(obj.dataValues.id_ferramenta);
    });
    return list;
  });
  console.log('fList: ', fList);

  Ferramenta.findAll({where: {id_ferramenta: { [Op.notIn]: fList }}})
    .then((ferramentaList) => {
      res.send(ferramentaList);
    })
    .catch((err) => {
      console.error('error ferramenta/listFree:', err);
      res.send(null);
    });
});


ferramentas_router.post('/alocarFer', (req, res) => {
  let dados = {
    id_manutencao: req.body.id_manutencao,
    id_ferramenta: req.body.id_ferramenta
  }

  EscalaFerramentas.create(dados)
  .then((esc) =>{
    res.json({esc});
    console.log(esc);
  })
  .catch((err) => {
    console.error('error ferramenta/alocarFer:', err);
    res.send(null);
  });
})
module.exports = ferramentas_router;
