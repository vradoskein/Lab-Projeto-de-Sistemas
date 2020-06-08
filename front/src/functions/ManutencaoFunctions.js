import axios from 'axios';
/*
`id_manutencao` int(11) NOT NULL AUTO_INCREMENT,
  `id_onibus` int(11) NOT NULL,
  `numero_valeta` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `data_manutencao` date NOT NULL, */
export const register = (newManutencao) => {
  return axios
    .post('http://localhost:5000/manutencao/register', {
      id_funcionario: newManutencao.id_funcionario,
      id_onibus: newManutencao.id_onibus,
      numero_valeta: newManutencao.numero_valeta,
      status: 'em andamento',
      data_manutencao: null,
    })
    .then((res) => {
      console.log(res);
      console.log(newManutencao);
    });
};

export const registerWork = (newWork) => {
  return axios
    .post('http://localhost:5000/manutencao/registerWork', {
      id_funcionario: newWork.id_funcionario,
      id_onibus: newWork.id_onibus,
    })
    .then((res) => {
      console.log(res);
      console.log(newWork);
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/manutencao/list').then((res) => {
    console.log(res);
    return res.data;
  });
};

export const endManut = (id_manutencao) => {
  return axios
    .put('http://localhost:5000/manutencao/endManut', { id_manutencao })
    .then((res) => {
      console.log(res);
      return res.data;
    });
};
