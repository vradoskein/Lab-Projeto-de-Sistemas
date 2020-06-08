import React, { Component } from 'react';
import { list as listBus, deleteBus } from '../../functions/BusFunctions';
import BusEditForm from './BusEditForm';
import ReactDOM from 'react-dom';
import BusCreate from './BusCreate';
class PaginaOnibus extends Component {
  constructor() {
    super();
    this.state = {
      busList: [],
    };
    this.buildPage = this.buildPage.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  async componentDidMount() {
    var busList = await listBus();
    var newState = {
      ...this.state,
      busList: busList,
    };
    this.setState(newState);
    console.log(this.state);
    this.buildPage();
  }

  buildPage = () => {
    var tableRef = document
      .getElementById('table')
      .getElementsByTagName('tbody')[0];
    // tableRef.style.cssText = 'text-align: center;'
    this.state.busList.forEach((bus) => {
      var newRow = tableRef.insertRow();
      var newCell = newRow.insertCell();
      var newText = document.createTextNode(bus.id_onibus);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(bus.ano_chassi);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(bus.ano_carroceria);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(bus.modelo_onibus);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(bus.modelo_chassi);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(bus.km_motor);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(
        bus.data_revisao ? bus.data_revisao : '-'
      );
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      var newButton = document.createElement('button');
      newButton.className = 'btn btn-danger';
      newButton.onclick = async () => {
        console.log(bus);
        var res = await deleteBus(bus.id_onibus);
        if (!res.result) {
          alert('Cole, deletou nao !');
        } else {
          alert('Cole, deletou mesmo !');
          window.location.reload();
        }
      };
      newButton.appendChild(document.createTextNode('X'));
      newCell.appendChild(newButton);
      newCell = newRow.insertCell();
      newButton = document.createElement('button');
      newButton.className = 'btn btn-warning';
      newButton.onclick = () => {
        this.openEditForm(bus);
      };
      newButton.appendChild(document.createTextNode('E'));
      newCell.appendChild(newButton);
    });
  };

  openEditForm(bus) {
    ReactDOM.render(<BusEditForm bus={bus} />, document.getElementById('pagina'));
  }

  openCreateForm() {
    ReactDOM.render(<BusCreate />, document.getElementById('pagina'));
  }

  render() {
    return (
      <span id='pagina'>
        <table className="table" style={{ marginTop: '30px' }} id="table">
          <thead className="thead-light" id="thead">
            <tr>
              <th scope="col">id_onibus</th>
              <th scope="col">ano_chassi</th>
              <th scope="col">ano_carroceria</th>
              <th scope="col">modelo_onibus</th>
              <th scope="col">modelo_chassi</th>
              <th scope="col">km_motor</th>
              <th scope="col">data_revisao</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <button
          onClick={this.openCreateForm}
          type="button"
          className="btn btn-dark"
          style={{ float: 'right' }}
        >
          Adicionar novo Ônibus
        </button>
      </span>
    );
  }
}

export default PaginaOnibus;
