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

app.get('/', (req, res) => {
  res.redirect('/funcionarios/login');
});

app.listen(port, function () {
  console.log('Server is running on port ' + port);
});
