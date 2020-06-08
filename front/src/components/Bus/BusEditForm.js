import React, { Component } from 'react';
import { updateBus } from '../../functions/BusFunctions';

class BusEditForm extends Component {
  constructor(props) {
    super(props);
    console.log(`props:`, props);
    this.state = {
      id_onibus: {
        value: props.bus.id_onibus,
      },
      ano_chassi: {
        value: props.bus.ano_chassi,
      },
      ano_carroceria: {
        value: props.bus.ano_carroceria,
      },
      modelo_onibus: {
        value: props.bus.modelo_onibus,
      },
      modelo_chassi: {
        value: props.bus.modelo_chassi,
      },
      km_motor: {
        value: props.bus.km_motor,
      },
      data_revisao: {
        value: props.bus.data_revisao ? props.bus.data_revisao : '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.editBus = this.editBus.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = {
      value: e.target.value,
    };
    this.setState(newState);
  }

  async editBus() {
    console.log('this', this);
    await updateBus({
      id_onibus: this.state.id_onibus.value,
      ano_chassi: this.state.ano_chassi.value,
      ano_carroceria: this.state.ano_carroceria.value,
      modelo_onibus: this.state.modelo_onibus.value,
      modelo_chassi: this.state.modelo_chassi.value,
      km_motor: this.state.km_motor.value,
      data_revisao: this.state.data_revisao.value
        ? this.state.data_revisao.value
        : null,
    });
    window.location.reload();
  }

  back() {
    window.location.reload();
  }

  render() {
    return (
      <div style={{ margin: 'auto', width: '50%' }}>
        <div>
          <h1>id_onibus </h1>
          <input
            type="text"
            className="form-control"
            name="id_onibus"
            placeholder="Digite o numero do id_onibus"
            value={this.state.id_onibus.value}
            onChange={this.onChange}
            disabled
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
          <button onClick={this.editBus} type="button" class="btn btn-warning">
            Editar onibus
          </button>
          <button
            onClick={this.back}
            type="button"
            class="btn btn-dark"
            style={{ float: 'right' }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }
}

export default BusEditForm;
