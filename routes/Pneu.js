const express = require('express');
const pneu_router = express.Router();
const cors = require('cors');

const sequelize = require('sequelize');

const Op = require('sequelize').Op;
const db = require('../database/db.js');
const { QueryTypes } = require('sequelize');

const Pneu = require('../models/Pneu');
const Onibus = require('../models/Onibus');
pneu_router.use(cors());

process.env.SECRET_KEY = 'secret';

pneu_router.post('/register', (req, res) => {
  console.log(req.body);
  const dados = {
    id_pneu: req.body.id_pneu,
    km_pneu: req.body.km_pneu,
    modelo_pneu: req.body.modelo_pneu,
    tipo_pneu: req.body.tipo_pneu,
    posicao_pneu: req.body.posicao_pneu,
    id_onibus: req.body.id_onibus,
  };
  console.log(dados);

  Onibus.findOne({where: {id_onibus: req.body.id_onibus}})
  .then((onibus) => {
    if(onibus){
      Pneu.create(dados)
      .then((pneu) => {
        console.log(pneu);
        res.send(pneu);
      })
      .catch((err) => {
        console.error('error pneu/register:', err);
        res.send(null);
      });
    }
  })
  .catch((err) => {
    console.error('error pneu:', err);
    res.send(null);
  });
});

pneu_router.get('/list', (req, res) => {
  Pneu.findAll()
    .then((pneuList) => {
      console.log(pneuList);
      res.send(pneuList);
    })
    .catch((err) => {
      console.error('error pneu/list:', err);
      res.send(null);
    });
});

pneu_router.post('/getById', (req, res) => {
  const id_given = req.body.id_pneu;
  Pneu.findOne({
    where: {
      id_pneu: id_given,
    },
  })
    .then((pneu) => {
      console.log('pneu/getById:', pneu);
      res.send(pneu);
    })
    .catch((err) => {
      console.error('error pneu/list:', err);
      res.send(null);
    });
});

pneu_router.post('/listManut', (req, res) => {
  console.log('req.body', req.body);
  const id_given = req.body.id_onibus;
  console.log('id_given:', id_given);
  Pneu.findAll({
    where: {
      id_onibus: id_given,
    },
  })
    .then((pneuList) => {
      console.log('pneu/listManut:', pneuList);
      res.send(pneuList);
    })
    .catch((err) => {
      console.error('error pneu/listManut:', err);
      res.send(null);
    });
});

pneu_router.get('/listFree', async (req, res) => {
  await Pneu.findAll({
    where: {
      posicao_pneu: 7,
    },
  })
    .then((listaPneu) => {
      if (listaPneu.every((pneu) => pneu instanceof Pneu)) {
        res.json(listaPneu);
      } else {
        res.res('nao tem nada ou entao deu errado ok');
      }
    })
    .catch((err) => {
      console.error(`pneu/listFree:`, err);
    });

  await Pneu.findAll({
    where: {
      id_onibus: {
        [Op.or]: manList,
      },
    },
  })
    .then((onibus) => {
      if (onibus.every((o) => o instanceof Pneu)) {
        res.json(onibus);
      } else {
        res.res('nao tem nada ou entao deu errado ok');
      }
    })
    .catch((err) => {
      console.error(`/listManut Onibus.findAll error:`, err);
    });
});

pneu_router.put('/updatePneu', (req, res) => {
  Pneu.update(
    {
      km_pneu: req.body.km_pneu, 
      modelo_pneu: req.body.modelo_pneu,
      tipo_pneu: req.body.tipo_pneu,
      posicao_pneu: req.body.posicao_pneu,
    },
    {
      where: { id_pneu: req.body.id_pneu },
    }
  )
    .then((result) => {
      res.json({
        result,
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro update pneu', err);
    });
});

pneu_router.post('/deletePneu', (req, res) => {
  console.log(req.body);
  Pneu.destroy({ where: { id_pneu: req.body.id_pneu } })
    .then((result) => {
      res.json({ message: 'sucesso amigo', result: true });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error(
        'erro pneu',
        err
      );
    });
});

module.exports = pneu_router;
