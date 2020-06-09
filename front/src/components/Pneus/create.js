import React, { Component } from 'react';
import { register } from '../../functions/PneuFunctions';

class PneusCreate extends Component {
  constructor() {
    super();
    this.state = {
      km_pneu: {
        value: '',
        touched: false,
      },
      modelo_pneu: {
        value: '',
        touched: false,
      },
      tipo_pneu: {
        value: '',
        touched: false,
      },
      posicao_pneu: {
        value: '',
        touched: false,
      },
      id_onibus: {
        value: '',
        touched: false,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.createPneu = this.createPneu.bind(this);
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
      this.state.km_pneu.touched &&
      this.state.modelo_pneu.touched &&
      this.state.tipo_pneu.touched &&
      this.state.posicao_pneu.touched &&
      this.state.id_onibus.touched
    );
  };

  createPneu = async () => {
    if (this.checkTouched()) {
      console.log('createPneu()');
      const newPneu = {
        modelo_pneu: this.state.modelo_pneu.value,
        km_pneu: this.state.km_pneu.value,
        tipo_pneu: this.state.tipo_pneu.value,
        posicao_pneu: this.state.posicao_pneu.value,
        id_onibus: this.state.id_onibus.value,
      };
      console.log('Pneu:', newPneu);
      await register(newPneu);
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
        <h1>km_pneu </h1>
        <input
          type="text"
          className="form-control"
          name="km_pneu"
          placeholder="Digite o km_pneu"
          value={this.state.km_pneu.value}
          onChange={this.onChange}
        />
        <h1>modelo_pneu </h1>
        <input
          type="text"
          className="form-control"
          name="modelo_pneu"
          placeholder="Digite o modelo_pneu"
          value={this.state.modelo_pneu.value}
          onChange={this.onChange}
        />
        <h1>tipo_pneu </h1>
        <input
          type="text"
          className="form-control"
          name="tipo_pneu"
          placeholder="Digite o tipo_pneu"
          value={this.state.tipo_pneu.value}
          onChange={this.onChange}
        />
        <h1>posicao_pneu </h1>
        <input
          type="text"
          className="form-control"
          name="posicao_pneu"
          placeholder="Digite a posicao_pneu"
          value={this.state.posicao_pneu.value}
          onChange={this.onChange}
        />
        <h1>id_onibus </h1>
        <input
          type="text"
          className="form-control"
          name="id_onibus"
          placeholder="Digite o id_onibus"
          value={this.state.id_onibus.value}
          onChange={this.onChange}
        />
        <button onClick={this.createPneu} type="button" className="btn btn-warning">
          Registrar Pneu
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
export default PneusCreate;
