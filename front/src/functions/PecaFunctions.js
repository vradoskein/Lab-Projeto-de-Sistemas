import axios from 'axios';

export const register = async (newPec) => {
  return axios
    .post('http://localhost:5000/pecas/register', {
      tipo_peca: newPec.tipo_peca,
      modelo_peca: newPec.modelo_peca,
      quantidade: newPec.quantidade,
    })
    .then((res) => {
      console.log('res from register peca:',res);
      // console.log('Registered');
    });
};

export const list = () => {
  return axios.get('http://localhost:5000/pecas/list').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const updatePeca = async (newPec) => {
  return axios
    .put('http://localhost:5000/pecas/updatePeca', {dados: newPec})
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};

export const deletePeca = async (id_peca) => {
  return axios
    .post('http://localhost:5000/pecas/deletePeca', {
      id_peca,
    })
    .then((res) => {
      // console.log(res);
      return res.data;
    });
};

export const listFree = async () => {
  return axios.get('http://localhost:5000/pecas/listFree').then((res) => {
    // console.log(res);
    return res.data;
  });
};

export const aloc = async (alocObj) => {
  return axios.post('http://localhost:5000/pecas/alocarPeca', {
    id_peca: alocObj.id_peca,
    id_manutencao: alocObj.id_manutencao
  }).then((res) => {
    // console.log(res);
    return res.data;
  });
}
