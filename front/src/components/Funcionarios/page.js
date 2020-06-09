import React, { Component } from 'react';
import { list as listFunc, deleteFunc } from '../../functions/FuncFunctions';
import FuncionariosEdit from './edit';
import ReactDOM from 'react-dom';
import FuncionariosCreate from './create'
class Paginafuncionarios extends Component {
  constructor() {
    super();
    this.state = {
      funcionarioList: [],
    };
    this.buildPage = this.buildPage.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  async componentDidMount() {
    var funcionarioList = await listFunc();
    var newState = {
      ...this.state,
      funcionarioList: funcionarioList,
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
    this.state.funcionarioList.forEach((funcionario) => {
      var newRow = tableRef.insertRow();

      var newCell = newRow.insertCell();
      var newText = document.createTextNode(funcionario.id_funcionario);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(funcionario.nome);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(funcionario.email);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(funcionario.tipo);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      var newButton = document.createElement('button');
      newButton.className = 'btn btn-danger';
      newButton.onclick = async () => {
        console.log(funcionario);
        var res = await deleteFunc(funcionario.id_funcionario);
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
        this.openEditForm(funcionario);
      };
      newButton.appendChild(document.createTextNode('E'));
      newCell.appendChild(newButton);
    });
  };

  openEditForm(funcionario) {
    ReactDOM.render(<FuncionariosEdit funcionario={funcionario} />, document.getElementById('root'));
  }

  openCreateForm() {
    ReactDOM.render(<FuncionariosCreate />, document.getElementById('root'));
  }

  render() {
    return (
      <span id='pagina'>
        <table className="table" style={{ marginTop: '30px' }} id="table">
          <thead className="thead-light" id="thead">
            <tr>
            <th scope="col">id</th>
              <th scope="col">nome</th>
              <th scope="col">email</th>
              <th scope="col">tipo</th>
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
          Adicionar novo funcionario
        </button>
      </span>
    );
  }
}

export default Paginafuncionarios;
