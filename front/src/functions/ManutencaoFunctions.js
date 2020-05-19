import axios from 'axios';
/*
`id_manutencao` int(11) NOT NULL AUTO_INCREMENT,
  `id_onibus` int(11) NOT NULL,
  `id_valeta` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `data_manutencao` date NOT NULL, */
export const register = (newManutencao) => {
  return axios
    .post('http://localhost:5000/manutencao/register', {
      id_manutencao: newManutencao.id_manutencao,
      id_onibus: newManutencao.id_onibus,
      id_valeta: newManutencao.id_valeta,
      status: newManutencao.status,
      data_manutencao: newManutencao.data_manutencao,
    })
    .then((res) => {
      console.log('Registered');
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/manutencao/list').then((res) => {
    console.log(res);
    return res.data;
  });
};
