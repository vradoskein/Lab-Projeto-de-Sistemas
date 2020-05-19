import React, { Component } from 'react';
import BusList from './Bus/BusListGerente';
import BusCreate from './Bus/BusCreate';
import { list } from '../functions/BusFunctions';
import Register from './Register';


class Gerente extends Component {
  constructor() {
    super();
    this.state = {
      listando: false,
      criando: false,
      busList: [],
    };
  }

  listBus = async () => {
    let newState = { ...this.state };
    // console.log('listBus()');
    newState.busList = await list();
    // console.log('state busList', this.state.busList);
    // console.log('newState busList', newState.busList);
    newState.listando = !newState.listando;
    this.setState(newState);
  };

  createBus = () => {
    let newState = { ...this.state };
    newState.criando = !newState.criando;
    this.setState(newState);
  };

  register = () => {
    this.props.history.push('/register');
  };
  render() {
    if (!this.state.listando && !this.state.criando) {
      return (
        <div>
          <div>
            <button onClick={this.createBus}>Criar onibus</button>
            <button onClick={this.listBus}>Listar onibus</button>
            <button onClick={this.register}>Registrar Funcionario</button>
          </div>
        </div>
      );
    } else if (this.state.listando) {
      return (
        <div>
          <div>
            <button onClick={this.listBus}>PIROGA</button>
          </div>
          <BusList busList={this.state.busList} />
        </div>
      );
    } else if (this.state.criando) {
      return (
        <div>
          <div>
            <button onClick={this.createBus}>PIROGA</button>
          </div>
          <BusCreate />
        </div>
      );
    }
  }
}

export default Gerente;
