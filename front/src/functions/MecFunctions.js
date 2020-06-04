import axios from 'axios';

export const list = async () => {
  return axios.get('http://localhost:5000/mecanicos/list').then((res) => {
    console.log(res);
    return res.data;
  });
};

export const listManut = async () => {
  return axios.get('http://localhost:5000/mecanicos/listManut').then((res) => {
    console.log(res);
    return res.data;
  });
};
