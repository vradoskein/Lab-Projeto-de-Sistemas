import React, { Component } from 'react';
import { register } from '../../functions/PecaFunctions';

class PecasCreate extends Component {
  constructor() {
    super();
    this.state = {
      tipo_peca: {
        value: '',
        touched: false,
      },
      modelo_peca: {
        value: '',
        touched: false,
      },
      quantidade: {
        value: '',
        touched: false,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.createPeca = this.createPeca.bind(this);
    this.back = this.back.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = {
      value: e.target.value,
      touched: true,
    };
    this.setState(newState);
  }

  checkTouched = () => {
    return (
      this.state.tipo_peca.touched &&
      this.state.modelo_peca.touched &&
      this.state.quantidade.touched
    );
  };

  createPeca = async () => {
    if (this.checkTouched()) {
      console.log('createPeca()');
      const newPeca = {
        tipo_peca: this.state.tipo_peca.value,
        modelo_peca: this.state.modelo_peca.value,
        quantidade: this.state.quantidade.value,
      };
      console.log('peca:', newPeca);
      await register(newPeca);
      window.location.reload();
    } else {
      alert('É necessário preencher todos os campos.');
    }
  };

  back() {
    window.location.reload();
  }

  render() {
    return (
      <div style={{ margin: 'auto', width: '50%' }}>
        <h1>tipo_peca </h1>
        <input
          type="text"
          className="form-control"
          name="tipo_peca"
          placeholder="Digite o tipo_peca"
          value={this.state.tipo_peca.value}
          onChange={this.onChange}
        />
        <h1>modelo_peca </h1>
        <input
          type="text"
          className="form-control"
          name="modelo_peca"
          placeholder="Digite o modelo_peca"
          value={this.state.modelo_peca.value}
          onChange={this.onChange}
        />
        <h1>quantidade </h1>
        <input
          type="text"
          className="form-control"
          name="quantidade"
          placeholder="Digite o quantidade"
          value={this.state.quantidade.value}
          onChange={this.onChange}
        />
        <button onClick={this.createPeca} type="button" className="btn btn-warning">
          Registrar Peça
        </button>
        <button
          onClick={this.back}
          type="button"
          className="btn btn-dark"
          style={{ float: 'right' }}
        >
          Cancelar
        </button>
      </div>
    );
  }
}
export default PecasCreate;
