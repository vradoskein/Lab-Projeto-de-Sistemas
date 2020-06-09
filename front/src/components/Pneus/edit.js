import React, { Component } from 'react';
import { updatePneu as updatePneu } from '../../functions/PneuFunctions';

class PneusEdit extends Component {
  constructor(props) {
    super(props);
    console.log(`props:`, props);
    this.state = {
      id_pneu: {
        value: this.props.pneu.id_pneu,
      },
      km_pneu: {
        value: this.props.pneu.km_pneu,
      },
      modelo_pneu: {
        value: this.props.pneu.modelo_pneu,
      },
      tipo_pneu: {
        value: this.props.pneu.tipo_pneu,
      },
      posicao_pneu: {
        value: this.props.pneu.posicao_pneu,
      },
      id_onibus: {
        value: this.props.pneu.id_onibus,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.editPneu = this.editPneu.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = {
      value: e.target.value,
    };
    this.setState(newState);
  }

  async editPneu() {
    console.log('this', this);
    await updatePneu({
        id_pneu: this.state.id_pneu.value,
        modelo_pneu: this.state.modelo_pneu.value,
        km_pneu: this.state.km_pneu.value,
        tipo_pneu: this.state.tipo_pneu.value,
        posicao_pneu: this.state.posicao_pneu.value,
        id_onibus: this.state.id_onibus.value,
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
          <h1>id_pneu </h1>
          <input
            type="text"
            className="form-control"
            name="id_pneu"
            placeholder="Digite o numero do id_pneu"
            value={this.state.id_pneu.value}
            onChange={this.onChange}
            disabled
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
          <h1>km_pneu </h1>
          <input
            type="text"
            className="form-control"
            name="km_pneu"
            placeholder="Digite a nova km_pneu"
            value={this.state.km_pneu.value}
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
            placeholder="Digite o posicao_pneu"
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
          <button onClick={this.editPneu} type="button" class="btn btn-warning">
            Confirmar Edição
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

export default PneusEdit;
