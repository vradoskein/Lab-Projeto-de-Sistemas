import axios from 'axios';

export const register = (newFunc) => {
  return axios
    .post('http://localhost:5000/funcionarios/register', {
      nome: newFunc.nome,
      senha: newFunc.senha,
      email: newFunc.email,
      tipo: newFunc.tipo,
    })
    .then((res) => {
      // console.log('Registered');
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/funcionarios/list').then((res) => {
    console.log(res);
    return res.data;
  });
};

export const updateFunc = async (newFunc) => {
  return axios
    .put('http://localhost:5000/funcionarios/updateFunc', newFunc)
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};

export const deleteFunc = async (id_funcionario) => {
  return axios
    .post('http://localhost:5000/funcionarios/deleteFunc', {
      id_funcionario,
    })
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};
