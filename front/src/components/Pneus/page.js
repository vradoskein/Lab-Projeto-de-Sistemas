import React, { Component } from 'react';
import { list as listPneu, deletePneu } from '../../functions/PneuFunctions';
import PneusEdit from './edit';
import ReactDOM from 'react-dom';
import PneusCreate from './create'
class PaginaPneus extends Component {
  constructor() {
    super();
    this.state = {
      pneuList: [],
    };
    this.buildPage = this.buildPage.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  async componentDidMount() {
    var pneuList = await listPneu();
    var newState = {
      ...this.state,
      pneuList: pneuList,
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
    this.state.pneuList.forEach((pneu) => {
      var newRow = tableRef.insertRow();

      var newCell = newRow.insertCell();
      var newText = document.createTextNode(pneu.id_pneu);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pneu.km_pneu);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pneu.modelo_pneu);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pneu.tipo_pneu);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pneu.posicao_pneu);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pneu.id_onibus);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      var newButton = document.createElement('button');
      newButton.className = 'btn btn-danger';
      newButton.onclick = async () => {
        console.log(pneu);
        var res = await deletePneu(pneu.id_pneu);
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
        this.openEditForm(pneu);
      };
      newButton.appendChild(document.createTextNode('E'));
      newCell.appendChild(newButton);
    });
  };

  openEditForm(pneu) {
    ReactDOM.render(<PneusEdit pneu={pneu} />, document.getElementById('root'));
  }

  openCreateForm() {
    ReactDOM.render(<PneusCreate />, document.getElementById('root'));
  }

  render() {
    return (
      <span id='pagina'>
        <table className="table" style={{ marginTop: '30px' }} id="table">
          <thead className="thead-light" id="thead">
            <tr>
            <th scope="col">id_pneu</th>
              <th scope="col">km_pneu</th>
              <th scope="col">modelo_pneu</th>
              <th scope="col">tipo_pneu</th>
              <th scope="col">posicao_pneu</th>
              <th scope="col">id_onibus</th>
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
          Adicionar novo pneu
        </button>
      </span>
    );
  }
}

export default PaginaPneus;
