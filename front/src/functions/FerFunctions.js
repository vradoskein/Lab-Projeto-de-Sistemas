import axios from 'axios';

export const register = (newFer) => {
  return axios
    .post('http://localhost:5000/ferramentas/register', {
      tipo_ferramenta: newFer.tipo_ferramenta,
    })
    .then((res) => {
      // console.log('Registered');
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/ferramentas/list').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const updateFerramenta = async (newFer) => {
  return axios
    .put('http://localhost:5000/ferramentas/updateFerramenta', newFer)
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};

export const deleteFerramenta = async (id_ferramenta) => {
  return axios
    .post('http://localhost:5000/ferramentas/deleteFerramenta', {
      id_ferramenta,
    })
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};

export const listFree = async () => {
  return axios.get('http://localhost:5000/ferramentas/listFree').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const aloc = async (alocObj) => {
  return axios.post('http://localhost:5000/ferramentas/alocarFer', {
    id_ferramenta: alocObj.id_ferramenta,
    id_manutencao: alocObj.id_manutencao
  }).then((res) => {
    // console.log(res);
    return res.data;
  });
}
