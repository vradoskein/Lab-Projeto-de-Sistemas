import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import BusListManut from '../Bus/BusListManut';

class PaginaOficinaGerente extends Component {
  constructor() {
    super();
    this.state = {
      initManut: {},
      alocarMec: {
        listaMecanicos: '',
      },
      manutFutura: {},
    };
  }

  initManut = () => {
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }

    
    const dropBus = document.createElement('select');
    dropBus.id = 'dropBus';
    /*
    for(int i=0; i< N;i++){
      var option = document.createElement('option');
      option.text = 'Kiwi';
      dropBus.add(option);
    } */
    
    var option2 = document.createElement('option');
    option2.text = 'PIROGA';
    dropBus.add(option2);

    const dropValeta = document.createElement('input');
    dropValeta.id = 'dropValeta';
    dropValeta.placeholder = `TESTE DO dropValeta`;

    const initManut = document.createElement('button');
    initManut.innerHTML = 'test value';

    document.getElementById('top-div').appendChild(dropBus);
    document.getElementById('top-div').appendChild(dropValeta);
    document.getElementById('top-div').appendChild(initManut);
  };

  alocarMec = () => {
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }

    const dropMec = document.createElement('input');
    dropMec.id = 'dropMec';
    dropMec.placeholder = `TESTE DO DROPMEC`;

    const dropManut = document.createElement('input');
    dropManut.id = 'dropManut';
    dropManut.placeholder = `TESTE DO dropManut`;

    const alocarMecBtn = document.createElement('button');
    alocarMecBtn.innerHTML = 'test value';

    document.getElementById('top-div').appendChild(dropMec);
    document.getElementById('top-div').appendChild(dropManut);
    document.getElementById('top-div').appendChild(alocarMecBtn);
  };

  manutFutura = () => {
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }

    const listManutFutura = document.createElement('input');
    listManutFutura.id = 'listManutFutura';
    listManutFutura.placeholder = `TESTE DO listManutFutura`;

    document.getElementById('top-div').appendChild(listManutFutura);
    
  };

  render() {
    return (
      <div>
        TCHARLIN TROLLING
        <div>
          <button onClick={this.initManut}>Iniciar Manutencao</button>

          <button onClick={this.alocarMec}>Alocar mecanico</button>

          <button onClick={this.manutFutura}>Ver manutencoes futuras</button>

          <div id="top-div"></div>
          <div>
            <BusListManut />
          </div>
        </div>
      </div>
    );
  }
}

export default PaginaOficinaGerente;
