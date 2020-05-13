const express = require('express');
const funcionarios = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Funcionario = require('../models/Funcionario');
funcionarios.use(cors());

process.env.SECRET_KEY = 'secret';

funcionarios.post('/register', (req, res) => {
  const dados = {
    nome: req.body.nome,
    tipo: req.body.tipo,
    email: req.body.email,
    senha: req.body.senha,
  };
  console.log(dados);

  Funcionario.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((funcionario) => {
      if (!funcionario) {
        bcrypt.hash(req.body.senha, 10, (err, hash) => {
          dados.senha = hash;
          Funcionario.create(dados)
            .then((funcionario) => {
              res.json({ status: funcionario.email + ' registrado' });
            })
            .catch((err) => {
              res.send('error: ' + err);
            });
        });
      } else {
        res.json({ error: 'funcionário já existe' });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

funcionarios.post('/login', (req, res) => {
  Funcionario.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((funcionario) => {
      if (funcionario) {
        if (bcrypt.compareSync(req.body.senha, funcionario.senha)) {
          let token = jwt.sign(funcionario.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          let tipo = funcionario.tipo;
          res.send(
            JSON.stringify({
              token, // o mesmo que token: token
            })
          );
        } else {
          res.status(400).json({ error: 'E-mail ou senha incorretos' });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

module.exports = funcionarios;
