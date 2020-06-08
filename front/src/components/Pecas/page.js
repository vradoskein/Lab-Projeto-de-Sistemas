import React, { Component } from 'react';
import { list as listPecas, deletePeca } from '../../functions/PecaFunctions';
import PecasEdit from './edit';
import ReactDOM from 'react-dom';
import PecasCreate from './create';
class Paginapecas extends Component {
  constructor() {
    super();
    this.state = {
      pecaList: [],
    };
    this.buildPage = this.buildPage.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  async componentDidMount() {
    var pecaList = await listPecas();
    var newState = {
      ...this.state,
      pecaList: pecaList,
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
    this.state.pecaList.forEach((peca) => {
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

      newCell = newRow.insertCell();
      var newButton = document.createElement('button');
      newButton.className = 'btn btn-danger';
      newButton.onclick = async () => {
        console.log(peca);
        var res = await deletePeca(peca.id_peca);
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
        this.openEditForm(peca);
      };
      newButton.appendChild(document.createTextNode('E'));
      newCell.appendChild(newButton);
    });
  };

  openEditForm(peca) {
    ReactDOM.render(<PecasEdit peca={peca} />, document.getElementById('root'));
  }

  openCreateForm() {
    ReactDOM.render(<PecasCreate />, document.getElementById('root'));
  }

  render() {
    return (
      <span id="pagina">
        <table className="table" style={{ marginTop: '30px' }} id="table">
          <thead className="thead-light" id="thead">
            <tr>
              <th scope="col">id_peca</th>
              <th scope="col">tipo_peca</th>
              <th scope="col">modelo_peca</th>
              <th scope="col">quantidade</th>
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
          Adicionar nova peca
        </button>
      </span>
    );
  }
}

export default Paginapecas;
