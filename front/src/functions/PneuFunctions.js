import axios from 'axios';

export const register = async (newPneu) => {
  return axios
    .post('http://localhost:5000/pneu/register', {
      id_pneu: newPneu.id_pneu,
      km_pneu: newPneu.km_pneu,
      modelo_pneu: newPneu.modelo_pneu,
      tipo_pneu: newPneu.tipo_pneu,
      posicao_pneu: !!newPneu.posicao_pneu ? newPneu.posicao_pneu : null,
      id_onibus: newPneu.id_onibus,
    })
    .then((res) => {
      // console.log('Registered');
    });
};

export const list = async () => {
  return axios.get('http://localhost:5000/pneu/list').then((res) => {
    // console.log('list res', res);
    return res.data;
  });
};

export const getById = async (id_given) => {
  return axios
    .post('http://localhost:5000/pneu/getById', { id_pneu: id_given })
    .then((res) => {
      // console.log('getById', res);
      return res.data;
    });
};

export const listManut = async (bus_id) => {
  return axios
    .post('http://localhost:5000/pneu/listManut', { id_onibus: bus_id })
    .then((res) => {
      // console.log('listManut', res);
      return res.data;
    });
};

export const listFree = async (id) => {
  return axios.get('http://localhost:5000/pneu/listFree').then((res) => {
    // console.log('listFree', res);
    return res.data;
  });
};
