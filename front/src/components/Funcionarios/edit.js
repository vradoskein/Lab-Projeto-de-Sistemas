import React, { Component } from 'react';
import { updateFunc } from '../../functions/FuncFunctions';

class FuncionariosEdit extends Component {
  constructor(props) {
    super(props);
    console.log(`props:`, props);
    this.state = {
      id_funcionario: {
        value: props.funcionario.id_funcionario,
      },
      email: {
        value: props.funcionario.email,
      },
      senha: {
        value: '',
      },
      tipo: {
        value: props.funcionario.tipo,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.editFunc = this.editFunc.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = {
      value: e.target.value,
    };
    this.setState(newState);
  }

  async editFunc() {
    console.log('this', this);
    await updateFunc({
      id_funcionario: this.state.id_funcionario.value,
      email: this.state.email.value,
      senha: this.state.senha.value,
      tipo: this.state.tipo.value,
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
          <h1>id_funcionario </h1>
          <input
            type="text"
            className="form-control"
            name="id_funcionario"
            placeholder="Digite o numero do id_funcionario"
            value={this.state.id_funcionario.value}
            onChange={this.onChange}
            disabled
          />
          <h1>email </h1>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Digite o email"
            value={this.state.email.value}
            onChange={this.onChange}
          />
          <h1>senha </h1>
          <input
            type="text"
            className="form-control"
            name="senha"
            placeholder="Digite a nova senha"
            value={this.state.senha.value}
            onChange={this.onChange}
          />
          <h1>tipo </h1>
          <input
            type="text"
            className="form-control"
            name="tipo"
            placeholder="Digite o tipo"
            value={this.state.tipo.value}
            onChange={this.onChange}
          />
          <button onClick={this.editFunc} type="button" class="btn btn-warning">
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

export default FuncionariosEdit;
