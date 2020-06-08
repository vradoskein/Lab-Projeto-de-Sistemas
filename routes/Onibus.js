const express = require('express');
const onibus_router = express.Router();
const cors = require('cors');

const sequelize = require('sequelize');

const Op = require('sequelize').Op;
const db = require('../database/db.js');
const { QueryTypes } = require('sequelize');

const Onibus = require('../models/Onibus');
const Manutencao = require('../models/Manutencao');
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
      res.send(null);
    });
});

onibus_router.get('/listFree', async (req, res) => {
  var manList;

  const man = await Manutencao.findAll({
    attributes: ['id_onibus'],
    where: {
      status: ['em andamento'],
    },
  }).then((m) => {
    var list = [];
    m.forEach((obj) => {
      list.push(obj.dataValues.id_onibus);
    });
    console.log(list);
    manList = list;
  });
  console.log(man);

  await Onibus.findAll({
    where: {
      id_onibus: {
        [Op.notIn]: manList,
      },
    },
  })
    .then((onibus) => {
      if (onibus.every((o) => o instanceof Onibus)) {
        res.json(onibus);
      } else {
        res.res('nao tem nada ou entao deu errado ok');
      }
    })
    .catch((err) => {
      console.error(`/listManut Onibus.findAll error:`, err);
    });
});

onibus_router.get('/listManut', async (req, res) => {
  // select * from onibus where id onibus in (select id_onibus from manutenção where status in ("em andamento"))
  // const teste = await sequelize.query(
  //   'select * from onibus where id onibus in (select id_onibus from manutenção where status in ("em andamento"))',
  //   { type: QueryTypes.SELECT }
  // );
  // console.log(teste);

  var manList;

  const man = await Manutencao.findAll({
    attributes: ['id_onibus'],
    where: {
      status: ['em andamento'],
    },
  }).then((m) => {
    var list = [];
    m.forEach((obj) => {
      list.push(obj.dataValues.id_onibus);
    });
    console.log(list);
    manList = list;
  });
  console.log(man);

  await Onibus.findAll({
    where: {
      id_onibus: {
        [Op.or]: manList,
      },
    },
  })
    .then((onibus) => {
      if (onibus.every((o) => o instanceof Onibus)) {
        res.json(onibus);
      } else {
        res.res('nao tem nada ou entao deu errado ok');
      }
    })
    .catch((err) => {
      console.error(`/listManut Onibus.findAll error:`, err);
    });
});

onibus_router.put('/updateBus', (req, res) => {
  Onibus.update(
    {
      ano_chassi: req.body.ano_chassi,
      ano_carroceria: req.body.ano_carroceria,
      modelo_onibus: req.body.modelo_onibus,
      modelo_chassi: req.body.modelo_chassi,
      km_motor: req.body.km_motor,
      data_revisao: req.body.data_revisao,
    },
    {
      where: { id_onibus: req.body.id_onibus },
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
      console.error(
        'erro update bus',
        err
      );
    });
});

onibus_router.post('/deleteBus', (req, res) => {
  console.log(req.body)
  Onibus.destroy({ where: { id_onibus: req.body.id_onibus } })
    .then((result) => {
      res.json({ message: 'sucesso amigo', result: true });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error(
        'DEU ERRO NO DELETE DO ONIBUS. POR FAVOR VERIFIQUE O CODIGO PARA CERTIFICAR QUE VOCE NAO FEZ BESTEIRA. OBRIGADO PELA ATENÇÃO E TENHA UMA BOA TARDE :)',
        err
      );
    });
});

module.exports = onibus_router;
