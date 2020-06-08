import axios from 'axios';

export const register = (newValeta) => {
  return axios
    .post('http://localhost:5000/valeta/register', {
      numero_valeta: newValeta.numero_valeta,
    })
    .then((res) => {
      // console.log('Registered');
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/valeta/list').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const listFree = () => {
  return axios.get('http://localhost:5000/valeta/listFree').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const listManut = () => {
  return axios.get('http://localhost:5000/valeta/listManut').then((res) => {
    // console.log(res);
    return res.data;
  });
};
