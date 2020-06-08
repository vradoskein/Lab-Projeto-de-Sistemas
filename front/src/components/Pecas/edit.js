import React, { Component } from 'react';
import { updatePeca } from '../../functions/PecaFunctions';

class PecasEdit extends Component {
  constructor(props) {
    super(props);
    console.log(`props:`, props);
    this.state = {
      id_peca: {
        value: props.peca.id_peca,
      },
      tipo_peca: {
        value: props.peca.tipo_peca,
      },
      modelo_peca: {
        value: props.peca.modelo_peca,
      },
      quantidade: {
        value: props.peca.quantidade,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.editPeca = this.editPeca.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = {
      value: e.target.value,
    };
    this.setState(newState);
  }

  async editPeca() {
    console.log('this', this);
    await updatePeca({
      id_peca: this.state.id_peca.value,
      tipo_peca: this.state.tipo_peca.value,
      modelo_peca: this.state.modelo_peca.value,
      quantidade: this.state.quantidade.value,
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
          <h1>id_peca </h1>
          <input
            type="text"
            className="form-control"
            name="id_peca"
            placeholder="Digite o numero do id_peca"
            value={this.state.id_peca.value}
            onChange={this.onChange}
            disabled
          />
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
          <button onClick={this.editPeca} type="button" class="btn btn-warning">
            Editar Peça
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

export default PecasEdit;
