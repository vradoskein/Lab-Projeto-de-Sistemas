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
  listFree as busListFree,
  list as busListNormal,
} from '../../functions/BusFunctions';
import { listManut as pneuListManut } from '../../functions/PneuFunctions';
import { listFree as valListManut } from '../../functions/ValFunctions';
import {
  register as registerManutencao,
  registerWork,
} from '../../functions/ManutencaoFunctions';
import BusListManut from '../Bus/BusListManut';

class PaginaOficinaGerente extends Component {
  constructor() {
    super();
    this.state = {
      busListManut: [],
      mecListManut: [],
      valListManut: [],
      listManutFutura: [],
      busListPneu: [
        {
          bus: {},
          pneus: [],
        },
      ],
      busListF: [],
    };
  }

  async componentDidMount() {
    // carregar lista de mecanicos livres
    const mecList = await mecListManut();
    // a fazer esses aqui de baixo
    const manBusList = await busListManut();
    const valList = await valListManut();
    var simpleBusList = await busListNormal();
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
    const busListF = await busListFree();

    // criar um novo state com tudo
    const newState = {
      ...this.state,
      mecListManut: mecList,
      valListManut: valList,
      busListManut: manBusList,
      busList: busList,
      busListF,
    };

    // atualizar o state
    this.setState(newState);
    console.log('newState:', this.state);
  }

  createDropBusFree() {
    const dropBus = document.createElement('select');
    dropBus.id = 'dropBus';
    var defBus = document.createElement('option');
    defBus.innerHTML = `--Selecione um Ônibus--`;
    defBus.value = null;
    dropBus.add(defBus);
    this.state.busListF.forEach((busListItem) => {
      var busOption = document.createElement('option');
      busOption.innerHTML = `<strong>id:</strong> ${busListItem.id_onibus}`;
      busOption.value = busListItem.id_onibus;
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
      mecanicoOption.value = mecanico.id_funcionario;
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
      valetaOption.innerHTML = `<strong>Número da valeta:</strong> ${valeta.numero_valeta} `;
      valetaOption.value = valeta.numero_valeta;
      dropVal.add(valetaOption);
    });
    document.getElementById('top-div').appendChild(dropVal);
    return dropVal;
  }

  createDropBusManut(id_str) {
    const dropManut = document.createElement('select');
    dropManut.id = id_str ? id_str : 'dropManut';
    var defManut = document.createElement('option');
    defManut.innerHTML = `--Selecione um Ônibus--`;
    dropManut.add(defManut);
    this.state.busListManut.forEach((busListItem) => {
      // lista das manutencoes liberadas
      var manutOption = document.createElement('option');
      manutOption.innerHTML = `<strong>id:</strong> ${busListItem.id_onibus}`;
      manutOption.value = busListItem.id_onibus;
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

    const dropBus = this.createDropBusFree();
    dropBus.onchange = () => {
      busSelected = dropBus.value;
      console.log(`busSelected ${busSelected}`);
    };

    const dropMec = this.createDropMec();
    dropMec.onchange = () => {
      mecSelected = dropMec.value;
      console.log(`mecSelected ${mecSelected}`);
    };

    const dropVal = this.createDropVal();
    dropVal.onchange = () => {
      valSelected = dropVal.value;
      console.log(`valSelected ${valSelected}`);
    };

    document
      .getElementById('top-div')
      .appendChild(document.createElement('br'));

    const startManut = document.createElement('button');
    startManut.innerHTML = 'Registrar manutencao';
    startManut.style.cssText = 'margin-top:10px;';
    startManut.className = 'btn btn-dark';
    startManut.onclick = async function () {
      if (busSelected && mecSelected && valSelected)
        await registerManutencao({
          id_onibus: busSelected,
          id_funcionario: mecSelected,
          numero_valeta: valSelected,
        });
      window.location.reload();
    };

    document.getElementById('top-div').appendChild(startManut);
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
      mecSelected = dropMec.value;
      console.log(`mecSelected ${mecSelected}`);
    };

    const dropBusManut = this.createDropBusManut('alocar-mec-manut');
    dropBusManut.onchange = (e) => {
      console.log(e.target.selectedIndex);
      console.log(this.state.busListManut);
      manutSelected = dropBusManut.value;
      console.log(`onibusSelected ${manutSelected}`);
    };

    document
      .getElementById('top-div')
      .appendChild(document.createElement('br'));

    const alocarMecBtn = document.createElement('button');
    alocarMecBtn.innerHTML = 'Alocar mecanico';
    alocarMecBtn.style.cssText = 'margin-top:10px;';
    alocarMecBtn.className = 'btn btn-dark';
    alocarMecBtn.onclick = async function () {
      if (manutSelected && mecSelected)
        await registerWork({
          id_onibus: manutSelected,
          id_funcionario: mecSelected,
        });
      window.location.reload();
    };

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
    this.state.busList.forEach((busListItem) => {
      const onibusInfo = document.createElement('ol');
      onibusInfo.style.cssText =
        'text-align: left;margin-left:0px;padding-left:0px';
      onibusInfo.innerHTML = `Onibus: <strong>${busListItem.bus.id_onibus}</strong>`;
      busListItem.pneus.forEach((pneuListItem) => {
        const pneu = document.createElement('li');
        pneu.innerHTML = `pneu: ${pneuListItem.id_pneu} posição: ${pneuListItem.posicao_pneu}`;
        pneu.style.cssText = 'margin-left:35px;padding-left:0px';
        onibusInfo.appendChild(pneu);
      });
      clearlist.appendChild(onibusInfo);
    });
    // clearlist.appendChild()
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'justify' }}>
          <BusListManut />
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={this.initManut}
            type="button"
            className="btn btn-dark"
            style={{ marginRight: '30px' }}
          >
            Iniciar Manutencao
          </button>

          <button
            onClick={this.alocarMec}
            type="button"
            className="btn btn-dark"
            style={{ marginRight: '30px' }}
          >
            Alocar mecanico
          </button>

          <button
            onClick={this.manutFutura}
            type="button"
            className="btn btn-dark"
            style={{ marginRight: '30px' }}
          >
            Ver manutencoes futuras
          </button>

          <button
            onClick={this.pneusList}
            type="button"
            className="btn btn-dark"
            style={{ marginRight: '30px' }}
          >
            Ver disposicao dos pneus
          </button>
        </div>
        <br />
        <div id="top-div" style={{ textAlign: 'center' }}></div>
      </div>
    );
  }
}

export default PaginaOficinaGerente;
