var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var Funcionarios = require('./routes/Funcionarios');
app.use('/funcionarios', Funcionarios);

var Onibus = require('./routes/Onibus');
app.use('/onibus', Onibus);

var Manutencao = require('./routes/Manutencao');
app.use('/manutencao', Manutencao);

var Mecanicos = require('./routes/Mecanicos');
app.use('/mecanicos', Mecanicos);

app.get('/mecanicos/listManut', (req, res) => {
  res.redirect('/mecanicos/listFree');
});

var Pneu = require('./routes/Pneu');
app.use('/pneu', Pneu);

var Pecas = require('./routes/Pecas');
app.use('/pecas', Pecas);

var Ferramentas = require('./routes/Ferramentas');
app.use('/ferramentas', Ferramentas);

var Valeta = require('./routes/Valeta');
app.use('/valeta', Valeta);

app.listen(port, function () {
  console.log('Server is running on port ' + port);
});
