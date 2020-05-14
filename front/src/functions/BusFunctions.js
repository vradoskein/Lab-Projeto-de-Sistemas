import axios from 'axios';

export const register = (newBus) => {
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
      console.log('Registered');
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/onibus/list').then((res) => {
    console.log(res);
    return res.data;
  });
};
