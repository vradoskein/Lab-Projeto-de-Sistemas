import React, { Component } from 'react';
import { register } from '../../functions/BusFunctions';

class BusCreate extends Component {
  constructor() {
    super();
    this.state = {
      id_onibus: {
        value: '',
        touched: false,
      },
      ano_chassi: {
        value: '',
        touched: false,
      },
      ano_carroceria: {
        value: '',
        touched: false,
      },
      modelo_onibus: {
        value: '',
        touched: false,
      },
      modelo_chassi: {
        value: '',
        touched: false,
      },
      km_motor: {
        value: '',
        touched: false,
      },
      data_revisao: {
        value: '',
        touched: false,
      },
      touched: false,
    };
    this.onChange = this.onChange.bind(this);
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
      this.state.id_onibus.touched &&
      this.state.ano_chassi.touched &&
      this.state.ano_carroceria.touched &&
      this.state.modelo_onibus.touched &&
      this.state.modelo_chassi.touched &&
      this.state.km_motor.touched
    );
  };

  createBus = () => {
    if (this.checkTouched()) {
      console.log('createBus()');
      const newBus = {
        id_onibus: this.state.id_onibus.value,
        ano_chassi: this.state.ano_chassi.value,
        ano_carroceria: this.state.ano_carroceria.value,
        modelo_onibus: this.state.modelo_onibus.value,
        modelo_chassi: this.state.modelo_chassi.value,
        km_motor: this.state.km_motor.value,
        data_revisao: this.state.data_revisao.value,
      };
      console.log('bus:', newBus);
      register(newBus);
    } else {
      console.log('Preencher tudo que eh obrigatorio seu hotario ! xD POGGOP');
    }
  };

  render() {
    return (
      <div>
        <h1>id_onibus </h1>
        <input
          type="text"
          className="form-control"
          name="id_onibus"
          placeholder="Digite o numero do id_onibus"
          value={this.state.id_onibus.value}
          onChange={this.onChange}
        />
        <h1>ano_chassi </h1>
        <input
          type="text"
          className="form-control"
          name="ano_chassi"
          placeholder="Digite o ano_chassi do onibus"
          value={this.state.ano_chassi.value}
          onChange={this.onChange}
        />
        <h1>ano_carroceria </h1>
        <input
          type="text"
          className="form-control"
          name="ano_carroceria"
          placeholder="Digite o ano_carroceria do onibus"
          value={this.state.ano_carroceria.value}
          onChange={this.onChange}
        />
        <h1>modelo_onibus </h1>
        <input
          type="text"
          className="form-control"
          name="modelo_onibus"
          placeholder="Digite o modelo_onibus do onibus"
          value={this.state.modelo_onibus.value}
          onChange={this.onChange}
        />
        <h1>modelo_chassi </h1>
        <input
          type="text"
          className="form-control"
          name="modelo_chassi"
          placeholder="Digite o modelo_chassi do onibus"
          value={this.state.modelo_chassi.value}
          onChange={this.onChange}
        />
        <h1>km_motor </h1>
        <input
          type="text"
          className="form-control"
          name="km_motor"
          placeholder="Digite o km_motor do onibus"
          value={this.state.km_motor.value}
          onChange={this.onChange}
        />
        <h1>data_revisao </h1>
        <input
          type="text"
          className="form-control"
          name="data_revisao"
          placeholder="Digite o data_revisao do onibus"
          value={this.state.data_revisao.value}
          onChange={this.onChange}
        />
        <button onClick={this.createBus}>Criar onibus</button>
      </div>
    );
  }
}
export default BusCreate;
