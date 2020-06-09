import React, { Component } from 'react';
import { register } from '../../functions/FuncFunctions';

class FuncionariosCreate extends Component {
  constructor() {
    super();
    this.state = {
      nome: {
        value: '',
        touched: false,
      },
      email: {
        value: '',
        touched: false,
      },
      senha: {
        value: '',
        touched: false,
      },
      tipo: {
        value: '',
        touched: false,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.createFunc = this.createFunc.bind(this);
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
      this.state.nome.touched &&
      this.state.email.touched &&
      this.state.senha.touched &&
      this.state.tipo.touched
    );
  };

  createFunc = async () => {
    if (this.checkTouched()) {
      console.log('createFunc()');
      const newFunc = {
        nome: this.state.nome.value,
        senha: this.state.senha.value,
        email: this.state.email.value,
        tipo: this.state.tipo.value,
      };
      console.log('func:', newFunc);
      await register(newFunc);
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
        <h1>nome </h1>
        <input
          type="text"
          className="form-control"
          name="nome"
          placeholder="Digite o nome"
          value={this.state.nome.value}
          onChange={this.onChange}
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
          placeholder="Digite o senha"
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
        <button onClick={this.createFunc} type="button" className="btn btn-warning">
          Registrar Funcionario
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
export default FuncionariosCreate;
