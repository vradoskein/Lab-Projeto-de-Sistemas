import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { listManut as mecListManut } from '../../functions/MecFunctions';
import {
  listManut as busListManut,
  list as listBus,
} from '../../functions/BusFunctions';
import { listManut as pneuListManut } from '../../functions/PneuFunctions';
import BusListManut from '../Bus/BusListManut';

class PaginaOficinaGerente extends Component {
  constructor() {
    super();
    this.state = {
      busListManut: [],
      mecListManut: [],
      valListManut: [],
      listManutFutura: [],
      busList: [
        {
          bus: {},
          pneus: [],
        },
      ],
    };
  }

  async componentDidMount() {
    // carregar lista de mecanicos livres
    const mecList = await mecListManut();
    // a fazer esses aqui de baixo
    const manBusList = await busListManut();
    // const valList = await valListManut();
    var simpleBusList = await listBus();
    var busList = [];
    for (var index = 0; index < simpleBusList.length; index++) {
      const bus = simpleBusList[index];
      // console.log('bus', bus);
      const pneus = await pneuListManut(bus.id_onibus);
      // console.log('pneus', pneus);
      busList.push({
        bus,
        pneus,
      });
    }

    // criar um novo state com tudo
    const newState = {
      ...this.state,
      mecListManut: mecList,
      // valListManut: valList,
      busListManut: manBusList,
      busList: busList,
    };

    // atualizar o state
    this.setState(newState);
    console.log('newState:', this.state);
  }

  createDropBus() {
    const dropBus = document.createElement('select');
    dropBus.id = 'dropBus';
    var defBus = document.createElement('option');
    defBus.innerHTML = `--Selecione um Ônibus--`;
    dropBus.add(defBus);
    this.state.busList.forEach((busListItem) => {
      var busOption = document.createElement('option');
      busOption.innerHTML = `<strong>id:</strong> ${busListItem.bus.id_onibus}`;
      dropBus.add(busOption);
    });
    document.getElementById('top-div').appendChild(dropBus);
    return dropBus;
  }

  createDropMec() {
    const dropMec = document.createElement('select');
    dropMec.id = 'dropMec';
    var defMec = document.createElement('option');
    defMec.innerHTML = `--Selecione um Mecânico--`;
    dropMec.add(defMec);

    this.state.mecListManut.forEach((mecanico) => {
      // lista de mecanicos liberados
      var mecanicoOption = document.createElement('option');
      mecanicoOption.innerHTML = `<strong>id:</strong> ${mecanico.id_funcionario}\t<strong>nome:</strong> ${mecanico.nome}`;
      dropMec.add(mecanicoOption);
    });
    document.getElementById('top-div').appendChild(dropMec);
    return dropMec;
  }

  createDropVal() {
    const dropVal = document.createElement('select');
    dropVal.id = 'dropVal';
    var defValeta = document.createElement('option');
    defValeta.innerHTML = `--Selecione uma Valeta--`;
    dropVal.add(defValeta);
    this.state.valListManut.forEach((valeta) => {
      // lista de valetas liberadas
      var valetaOption = document.createElement('option');
      valetaOption.innerHTML = `<strong>id:</strong> `;
      dropVal.add(valetaOption);
    });
    document.getElementById('top-div').appendChild(dropVal);
    return dropVal;
  }

  createDropManut() {
    const dropManut = document.createElement('select');
    dropManut.id = 'dropManut';
    var defManut = document.createElement('option');
    defManut.innerHTML = `--Selecione uma Ônibus--`;
    dropManut.add(defManut);
    this.state.busListManut.forEach((busListManut) => {
      // lista das manutencoes liberadas
      var manutOption = document.createElement('option');
      manutOption.innerHTML = `<strong>id:</strong> `;
      dropManut.add(manutOption);
    });
    document.getElementById('top-div').appendChild(dropManut);
    return dropManut;
  }

  initManut = () => {
    var mecSelected;
    var busSelected;
    var valSelected;
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }

    const dropBus = this.createDropBus();
    dropBus.onchange = () => {
      const e = dropBus.value;
      busSelected = e;
      console.log(`busSelected ${busSelected}`);
    };

    const dropMec = this.createDropMec();
    dropMec.onchange = () => {
      const e = dropMec.value;
      mecSelected = e;
      console.log(`mecSelected ${mecSelected}`);
    };

    const dropVal = this.createDropVal();
    dropVal.onchange = () => {
      const e = dropVal.value;
      valSelected = e;
      console.log(`valSelected ${valSelected}`);
    };

    const initManut = document.createElement('button');
    initManut.innerHTML = 'Iniciar manutencao';

    document.getElementById('top-div').appendChild(initManut);
  };

  alocarMec = () => {
    var mecSelected;
    var manutSelected;
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }

    const dropMec = this.createDropMec();
    dropMec.onchange = () => {
      const e = dropMec.value;
      mecSelected = e;
      console.log(`mecSelected ${mecSelected}`);
    };

    const dropManut = this.createDropManut();
    dropManut.onchange = () => {
      const e = dropManut.value;
      manutSelected = e;
      console.log(`manutSelected ${mecSelected}`);
    };

    const alocarMecBtn = document.createElement('button');
    alocarMecBtn.innerHTML = 'Alocar mecanico';

    document.getElementById('top-div').appendChild(alocarMecBtn);
  };

  manutFutura = () => {
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }

    const headerFutura = document.createElement('h2');
    headerFutura.innerHTML = `Lista de manutenções planejadas :`;
    document.getElementById('top-div').appendChild(headerFutura);

    this.state.listManutFutura.forEach((bus) => {
      const listManutFutura = document.createElement('p');
      listManutFutura.style = 'font-size: 20px';
      listManutFutura.innerHTML = `<strong>id:</strong>  ${
        bus.id_onibus
      }  <strong>Data da última revisão:</strong> ${
        !!bus.data_revisao ? bus.data_revisao : 'nunca realizada'
      }  <strong>Data estimada proxima revisao:</strong> ${bus.proximaRev}`;
      document.getElementById('top-div').appendChild(listManutFutura);
    });
  };

  pneusList = () => {
    const clearlist = document.getElementById('top-div');
    while (clearlist.firstChild) {
      clearlist.removeChild(clearlist.lastChild);
    }
    this.state.busList.forEach((bus) => {
      //loop pneus
    });
  };

  render() {
    return (
      <div>
        <br />
        <div style={{ 'text-align': 'center' }}>
          <button
            onClick={this.initManut}
            type="button"
            class="btn btn-dark"
            style={{ 'margin-right': '30px' }}
          >
            Iniciar Manutencao
          </button>

          <button
            onClick={this.alocarMec}
            type="button"
            class="btn btn-dark"
            style={{ 'margin-right': '30px' }}
          >
            Alocar mecanico
          </button>

          <button
            onClick={this.manutFutura}
            type="button"
            class="btn btn-dark"
            style={{ 'margin-right': '30px' }}
          >
            Ver manutencoes futuras
          </button>

          <button
            onClick={this.pneusList}
            type="button"
            class="btn btn-dark"
            style={{ 'margin-right': '30px' }}
          >
            Ver disposicao dos pneus
          </button>

          <div id="top-div"></div>
          <div style={{ 'text-align': 'justify' }}>
            <BusListManut />
          </div>
        </div>
      </div>
    );
  }
}

export default PaginaOficinaGerente;
