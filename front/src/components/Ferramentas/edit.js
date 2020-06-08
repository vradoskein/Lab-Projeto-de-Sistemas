import React, { Component } from 'react';
import { updateFerramenta } from '../../functions/FerFunctions';

class FerramentasEdit extends Component {
  constructor(props) {
    super(props);
    console.log(`props:`, props);
    this.state = {
      id_ferramenta: {
        value: props.tool.id_ferramenta,
      },
      tipo_ferramenta: {
        value: props.tool.tipo_ferramenta,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.editTool = this.editTool.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = {
      value: e.target.value,
    };
    this.setState(newState);
  }

  async editTool() {
    console.log('this', this);
    await updateFerramenta({
      id_ferramenta: this.state.id_ferramenta.value,
      tipo_ferramenta: this.state.tipo_ferramenta.value,
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
          <h1>id_ferramenta </h1>
          <input
            type="text"
            className="form-control"
            name="id_ferramenta"
            placeholder="Digite o numero do id_ferramenta"
            value={this.state.id_ferramenta.value}
            onChange={this.onChange}
            disabled
          />
          <h1>tipo_ferramenta </h1>
          <input
            type="text"
            className="form-control"
            name="tipo_ferramenta"
            placeholder="Digite o tipo_ferramenta"
            value={this.state.tipo_ferramenta.value}
            onChange={this.onChange}
          />
          <button onClick={this.editTool} type="button" class="btn btn-warning">
            Editar onitool
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

export default FerramentasEdit;
