import React, { Component } from 'react';
import { register } from '../functions/UserFunctions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      tipo: '',
      email: '',
      senha: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      nome: this.state.nome,
      tipo: this.state.tipo,
      email: this.state.email,
      senha: this.state.senha,
    };

    register(newUser).then((res) => {
      this.props.history.push('/login');
    });
  }

  gotoGerente = () => {
    this.props.history.push('/gerente');
  };


  render() {
    return (
      <div className="container">
        <div>
        <button onClick={this.gotoGerente}>Voltar</button>
        </div>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  placeholder="Digite o nome do funcionário"
                  value={this.state.nome}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Tipo do Funcionario</label>
                <input
                  type="text"
                  className="form-control"
                  name="tipo"
                  placeholder="Selecione o tipo do funcionario"
                  value={this.state.tipo}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Entre o e-mail do funcionario"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  name="senha"
                  placeholder="Digite a senha do funcionário"
                  value={this.state.senha}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
