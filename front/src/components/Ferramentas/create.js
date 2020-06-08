import React, { Component } from 'react';
import { register } from '../../functions/FerFunctions';

class FerramentasCreate extends Component {
  constructor() {
    super();
    this.state = {
      tipo_ferramenta: {
        value: '',
        touched: false,
      },
    }
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
      this.state.tipo_ferramenta.touched
    );
  };

  createTool = () => {
    if (this.checkTouched()) {
      console.log('createTool()');
      const newTool = {
        id_ferramenta: null,
        tipo_ferramenta: this.state.tipo_ferramenta.value,
      };
      console.log('tool:', newTool);
      register(newTool);
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
        <h1>tipo_ferramenta </h1>
        <input
          type="text"
          className="form-control"
          name="tipo_ferramenta"
          placeholder="Digite o tipo_ferramenta da ferramenta"
          value={this.state.tipo_ferramenta.value}
          onChange={this.onChange}
        />
        <button onClick={this.createTool} type="button" class="btn btn-warning">
          Criar ferramenta
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
export default FerramentasCreate;
