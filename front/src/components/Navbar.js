import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
      </ul>
    );

    const userGerente = (
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Gerência
          </span>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link to="/listBus" className="dropdown-item">
              Ônibus
            </Link>
            <Link to="/listFuncionarios" className="dropdown-item">
              Funcionários
            </Link>
            <Link to="/listFerramentas" className="dropdown-item">
              Ferramentas
            </Link>
            <Link to="/listPecas" className="dropdown-item">
              Peças
            </Link>
            <Link to="/listPneus" className="dropdown-item">
              Pneus
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <Link to="/gerente/oficina" className="nav-link">
            Oficina
          </Link>
        </li>
      </ul>
    );

    const userMecanico = (
      <ul className="navbar-nav">
        {/* <li className="nav-item">
          <Link to="/mecanico" className="nav-link">
            Mecanico
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/mecanico/oficina" className="nav-link">
            Oficina
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        {localStorage.usertoken
          ? jwt_decode(localStorage.usertoken).tipo === 1
            ? userGerente
            : userMecanico
          : ''}
        <li className="nav-item">
          <span onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </span>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
