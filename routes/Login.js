// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// process.env.SECRET_KEY = 'secret';

// router.post('/login', (req, res) => {
//   Funcionario.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((funcionario) => {
//       if (funcionario) {
//         if (bcrypt.compareSync(req.body.senha, funcionario.senha)) {
//           let token = jwt.sign(funcionario.dataValues, process.env.SECRET_KEY, {
//             expiresIn: 1440,
//           });
//           let tipo = funcionario.tipo;
//           res.send(
//             JSON.stringify({
//               token: token,
//               tipo: tipo
//             })
//           );
//         } else {
//           res.status(400).json({ error: 'Funcionário não encontrado' });
//         }
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ error: err });
//     });
// });

// module.exports = router;
