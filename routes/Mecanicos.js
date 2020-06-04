const express = require('express');
const mecanicos = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const Funcionario = require('../models/Funcionario');
const Manutencao = require('../models/Manutencao');
const Escala_Trabalho = require('../models/EscalaTrabalho');

const TIPO_MECANICO = 2;

mecanicos.use(cors());

mecanicos.get('/list', (req, res) => {
  Funcionario.findAll({
    where: {
      tipo: TIPO_MECANICO,
    },
  }).then((mecList) => {
    if (!!mecList) {
      console.log('mecList: ', mecList);
      res.json(mecList);
    } else {
      console.log('mecList: ', mecList);
      res.send('no mecList');
    }
  });
});

mecanicos.get('/listFree', async (req, res) => {
  const manList = await Manutencao.findAll({
    attributes: ['id_manutencao'],
    where: {
      status: ['em andamento', 'agendada'],
    },
  }).then((m) => {
    var list = [];
    m.forEach((obj) => {
      list.push(obj.dataValues.id_manutencao);
    });
    return list;
  });
  console.log('manList: ', manList);

  const etList = await Escala_Trabalho.findAll({
    attributes: ['id_funcionario'],
    where: {
      id_manutencao: manList,
    },
  }).then((et) => {
    var list = [];
    et.forEach((obj) => {
      list.push(obj.dataValues.id_funcionario);
    });
    return list;
  });
  console.log('etList: ', etList);

  const funcList = await Funcionario.findAll({
    where: {
      tipo: TIPO_MECANICO,
      id_funcionario: { [Op.notIn]: etList },
    },
  }).then((fl) => {
    var list = [];
    console.log('fl: ', fl);
    fl.forEach((obj) => {
      list.push(obj.dataValues);
    });
    return list;
  });
  console.log('funcList: ', funcList);

  res.json(funcList);
});

module.exports = mecanicos;

/**
 * tenho 2 mecanicos
 * um na lista como agendado
 * um sem ter nada
 */
