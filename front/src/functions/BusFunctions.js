import axios from 'axios';

export const register = async (newBus) => {
  return axios
    .post('http://localhost:5000/onibus/register', {
      id_onibus: newBus.id_onibus,
      ano_chassi: newBus.ano_chassi,
      ano_carroceria: newBus.ano_carroceria,
      modelo_onibus: newBus.modelo_onibus,
      modelo_chassi: newBus.modelo_chassi,
      km_motor: newBus.km_motor,
      data_revisao: newBus.data_revisao === '' ? null : newBus.data_revisao,
    })
    .then((res) => {
      // console.log('Registered');
    });
};

export const list = async () => {
  return axios.get('http://localhost:5000/onibus/list').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const updateBus = async (newBus) => {
  return axios
    .put('http://localhost:5000/onibus/updateBus', newBus)
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};

export const deleteBus = async (id_onibus) => {
  return axios
    .post('http://localhost:5000/onibus/deleteBus', { id_onibus })
    .then((res) => {
      console.log(res);
      return res.data;
    });
};

export const listFree = async () => {
  return axios.get('http://localhost:5000/onibus/listFree').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const listManut = async () => {
  return axios.get('http://localhost:5000/onibus/listManut').then((res) => {
    // console.log(res);
    return res.data;
  });
};
