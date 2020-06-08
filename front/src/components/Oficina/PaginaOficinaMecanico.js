import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import { getManutForMec as getManut } from '../../functions/MecFunctions';
import { endManut } from '../../functions/ManutencaoFunctions';
import {
  listFree as listPecas,
  aloc as alocarPeca,
} from '../../functions/PecaFunctions';
import {
  listFree as listFer,
  aloc as alocarFer,
} from '../../functions/FerFunctions';

class PaginaOficinaMecanico extends Component {
  constructor() {
    super();
    this.state = {
      manutencao: '',
      pecas: [],
      ferramentas: [],
      pecaSelected: '',
      ferSelected: '',
    };
    this.alocFer = this.alocFer.bind(this);
    this.alocPeca = this.alocPeca.bind(this);
    this.finalizarManut = this.finalizarManut.bind(this);
  }

  async componentDidMount() {
    const decoded = jwt_decode(window.localStorage.getItem('usertoken'));
    const manutencao = await getManut(decoded.id_funcionario);
    const pecas = await listPecas();
    const ferramentas = await listFer();
    const newState = {
      ...this.state,
      manutencao: manutencao,
      pecas: pecas,
      ferramentas: ferramentas,
    };
    this.setState(newState);
    console.log(this.state);
    if (this.state.manutencao) {
      this.buildPageFerramentas();
      this.buildPagePecas();
      this.buildDropDowns();
    }
  }

  buildPageFerramentas = () => {
    var tableRef = document
      .getElementById('table-ferramenta')
      .getElementsByTagName('tbody')[0];
    // tableRef.style.cssText = 'text-align: center;'
    this.state.ferramentas.forEach((ferramenta) => {
      var newRow = tableRef.insertRow();

      var newCell = newRow.insertCell();
      var newText = document.createTextNode(ferramenta.id_ferramenta);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(ferramenta.tipo_ferramenta);
      newCell.appendChild(newText);
    });
  };

  buildPagePecas = () => {
    var tableRef = document
      .getElementById('table-peca')
      .getElementsByTagName('tbody')[0];
    // tableRef.style.cssText = 'text-align: center;'
    this.state.pecas.forEach((peca) => {
      var newRow = tableRef.insertRow();

      var newCell = newRow.insertCell();
      var newText = document.createTextNode(peca.id_peca);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(peca.tipo_peca);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(peca.modelo_peca);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(peca.quantidade);
      newCell.appendChild(newText);
    });
  };

  createDropPeca(id_str) {
    const dropManut = document.createElement('select');
    dropManut.id = id_str ? id_str : 'dropManut';
    var defManut = document.createElement('option');
    defManut.innerHTML = `--Selecione uma Peça--`;
    dropManut.add(defManut);
    this.state.pecas.forEach((peca) => {
      // lista das manutencoes liberadas
      var manutOption = document.createElement('option');
      manutOption.innerHTML = `<strong>id:</strong> ${peca.id_peca}`;
      manutOption.value = peca.id_peca;
      dropManut.add(manutOption);
    });
    document.getElementById('pagina-peca').append(dropManut);
    // document
    //   .getElementById('dropdown')
    //   .appendChild(document.createElement('br'));
    return dropManut;
  }

  createDropFer(id_str) {
    const dropManut = document.createElement('select');
    dropManut.style.cssText = 'text-align: center';
    dropManut.id = id_str ? id_str : 'dropManut';
    var defManut = document.createElement('option');
    defManut.innerHTML = `--Selecione uma Ferramenta--`;
    dropManut.add(defManut);
    this.state.ferramentas.forEach((ferramenta) => {
      // lista das manutencoes liberadas
      var manutOption = document.createElement('option');
      manutOption.innerHTML = `<strong>id:</strong> ${ferramenta.id_ferramenta}`;
      manutOption.value = ferramenta.id_ferramenta;
      dropManut.add(manutOption);
    });
    document.getElementById('pagina-ferramenta').append(dropManut);
    // document
    //   .getElementById('dropdown')
    //   .appendChild(document.createElement('br'));
    return dropManut;
  }

  buildDropDowns = () => {
    var ferSelected;
    var pecaSelected;

    const dropFer = this.createDropFer();
    dropFer.onchange = () => {
      ferSelected = dropFer.value;
      const newState = {
        ...this.state,
        ferSelected: ferSelected,
      };
      this.setState(newState);
      console.log(`mecSelected ${ferSelected}`);
    };

    const dropPeca = this.createDropPeca('alocar-peca');
    dropPeca.onchange = (e) => {
      console.log(e.target.selectedIndex);
      console.log(this.state.pecaSelected);
      pecaSelected = dropPeca.value;
      const newState = {
        ...this.state,
        pecaSelected: pecaSelected,
      };
      this.setState(newState);
      console.log(`onibusSelected ${pecaSelected}`);
    };
  };

  async alocPeca() {
    console.log(this.state);
    await alocarPeca({
      id_manutencao: this.state.manutencao.id_manutencao,
      id_peca: this.state.pecaSelected,
    });
    window.location.reload();
  }

  async alocFer() {
    console.log(this.state);
    await alocarFer({
      id_manutencao: this.state.manutencao.id_manutencao,
      id_ferramenta: this.state.ferSelected,
    });
    window.location.reload();
  }

  async finalizarManut() {
    console.log(this.state);
    await endManut(this.state.manutencao.id_manutencao);
    window.location.reload();
  }

  render() {
    const temManut = (
      <div>
        <div style={{ borderBottom: 'solid', textAlign: 'center' }}>
          <h2>
            Você está alocado para a manutenção{' '}
            {this.state.manutencao.id_manutencao}, na valeta{' '}
            {this.state.manutencao.numero_valeta}.
          </h2>
          <button
            onClick={this.finalizarManut}
            type="button"
            className="btn btn-warning"
            style={{ marginLeft: '10px', margin: 'auto' }}
            id="btn-peca"
          >
            Encerrar manutenção
          </button>
        </div>

        <div>
          <div id="pagina-ferramenta" style={{ width: '50%', float: 'left' }}>
            <table
              className="table-ferramenta"
              style={{ marginTop: '30px', width: '100%' }}
              id="table-ferramenta"
            >
              <thead className="thead-light" id="thead">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">tipo</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <button
              onClick={this.alocFer}
              type="button"
              className="btn btn-dark"
              style={{ marginLeft: '10px', float: 'right' }}
            >
              Selecionar Ferramenta
            </button>
          </div>

          <div
            id="pagina-peca"
            style={{ marginLeft: '10px', width: '48%', float: 'right' }}
          >
            <table
              className="table-peca"
              style={{ marginTop: '30px', width: '100%' }}
              id="table-peca"
            >
              <thead className="thead-light" id="thead">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">tipo</th>
                  <th scope="col">modelo</th>
                  <th scope="col">quantidade</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <button
              onClick={this.alocPeca}
              type="button"
              className="btn btn-dark"
              style={{ marginLeft: '10px', float: 'right' }}
              id="btn-peca"
            >
              Selecionar peça
            </button>
          </div>
        </div>
      </div>
    );

    const naoTemManut = (
      <div>Procure o gerente para te alocar para uma Manutenção</div>
    );

    return this.state.manutencao ? temManut : naoTemManut;
  }
}

export default PaginaOficinaMecanico;
