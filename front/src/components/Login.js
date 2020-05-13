import React, { Component } from 'react';
import { login } from '../functions/UserFunctions';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = {
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

    const user = {
      email: this.state.email,
      senha: this.state.senha,
    };

    login(user).then((res) => {
      //colocar condicao pra se for mecanico
      const token = localStorage.getItem('usertoken');
      const type = jwt_decode(token).tipo;
      if (type === 1) {
        if (res) {
          this.props.history.push('/gerente');
        }
      } else if (type === 2) {
        if (res) {
          this.props.history.push('/mecanico');
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Digite seu e-mai"
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
                  placeholder="Digite sua senha"
                  value={this.state.senha}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
