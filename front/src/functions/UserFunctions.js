import axios from 'axios';

export const register = (newUser) => {
  return axios
    .post('http://localhost:5000/funcionarios/register', {
      nome: newUser.nome,
      tipo: newUser.tipo,
      email: newUser.email,
      senha: newUser.senha,
    })
    .then((res) => {
      console.log('Registered');
    });
};

export const login = (user) => {
  return axios
    .post('http://localhost:5000/funcionarios/login', {
      email: user.email,
      senha: user.senha,
    })
    .then((res) => {
      console.log('res', res);
      console.log('data', res.data);
      localStorage.setItem('usertoken', res.data.token);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
