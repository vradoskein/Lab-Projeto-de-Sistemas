const express = require('express');
const manutencao_router = express.Router();
const cors = require('cors');

const Manutencao = require('../models/Manutencao');
manutencao_router.use(cors());

const EscalaTrabalho = require('../models/EscalaTrabalho');

process.env.SECRET_KEY = 'secret';

manutencao_router.post('/register', async (req, res) => {
  console.log(req.body);
  const date = Date.getDa;
  const dados = {
    id_funcionario: req.body.id_funcionario, // tem que verificar se registrou escala de trabalho
    id_onibus: req.body.id_onibus,
    numero_valeta: req.body.numero_valeta,
    status: req.body.status,
  };
  console.log(dados);

  const mecanicoDisponivel = await EscalaTrabalho.findOne({
    where: {
      id_funcionario: dados.id_funcionario,
    },
  })
    .then((escala) => {
      if (!!escala) {
        console.log('escala', escala);
        return false;
      } else {
        console.log('escala', escala);
        return true;
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });

  if (mecanicoDisponivel) {
    Manutencao.create(dados)
      .then((manutencao) => {
        EscalaTrabalho.create({
          id_manutencao: manutencao.id_manutencao,
          id_funcionario: dados.id_funcionario,
        })
          .then((escala) => {
            res.json({
              status:
                'funcionario ' +
                escala.id_funcionario +
                ' registrado na manutencao ' +
                manutencao.id_manutencao,
            });
          })
          .catch((err) => {
            res.send('error: ' + err);
          });
      })
      .catch((err) => {
        res.send('error: ' + err);
      });
  } else {
    res.send('Mecanico ' + dados.id_funcionario + ' já em manutencao');
  }
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

manutencao_router.post('/registerWork', async (req, res) => {
  const id_onibus = req.body.id_onibus;
  const id_funcionario = req.body.id_funcionario;

  console.log('id_onibus', id_onibus);
  console.log('id_funcionario', id_funcionario);

  Manutencao.findOne({
    where: {
      id_onibus: id_onibus,
    },
  })
    .then((manutencao) => {
      console.log('manutencao', manutencao);
      EscalaTrabalho.create({
        id_manutencao: manutencao.id_manutencao,
        id_funcionario: id_funcionario,
      })
        .then((escala) => {
          res.json({
            status:
              'funcionario ' +
              escala.id_funcionario +
              ' registrado na manutencao ' +
              manutencao.id_manutencao,
          });
        })
        .catch((err) => {
          res.send('error: ' + err);
        });
    })
    .catch((err) => {
      console.error('error manutencao/list:', err);
      res(null);
    });
});

manutencao_router.put('/endManut', async (req, res) => {
  await Manutencao.update(
    { status: 'concluída' },
    { where: { id_manutencao: req.body.id_manutencao } }
  )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro update manut', err);
    });

  await EscalaTrabalho.destroy({
    where: { id_manutencao: req.body.id_manutencao },
  })
    .then((result) => {
      res.json({ result });
      console.log(result);
    })
    .catch((err) => {
      res.json({ message: 'erro amigo', result: false });
      console.error('erro update manut', err);
    });
});

module.exports = manutencao_router;
