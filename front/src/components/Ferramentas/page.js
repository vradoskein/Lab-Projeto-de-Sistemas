import React, { Component } from 'react';
import {
  list as listFerramentas,
  deleteFerramenta,
} from '../../functions/FerFunctions';
import FerramentasEdit from './edit';
import ReactDOM from 'react-dom';
import FerramentasCreate from './create';
class PaginaFerramentas extends Component {
  constructor() {
    super();
    this.state = {
      ferramentaList: [],
    };
    this.buildPage = this.buildPage.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  async componentDidMount() {
    var ferramentaList = await listFerramentas();
    var newState = {
      ...this.state,
      ferramentaList: ferramentaList,
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
    this.state.ferramentaList.forEach((ferramenta) => {
      var newRow = tableRef.insertRow();

      var newCell = newRow.insertCell();
      var newText = document.createTextNode(ferramenta.id_ferramenta);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(ferramenta.tipo_ferramenta);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      var newButton = document.createElement('button');
      newButton.className = 'btn btn-danger';
      newButton.onclick = async () => {
        console.log(ferramenta);
        var res = await deleteFerramenta(ferramenta.id_ferramenta);
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
        this.openEditForm(ferramenta);
      };
      newButton.appendChild(document.createTextNode('E'));
      newCell.appendChild(newButton);
    });
  };

  openEditForm(tool) {
    ReactDOM.render(
      <FerramentasEdit tool={tool} />,
      document.getElementById('pagina')
    );
  }

  openCreateForm() {
    ReactDOM.render(<FerramentasCreate />, document.getElementById('pagina'));
  }

  render() {
    return (
      <span id="pagina">
        <table className="table" style={{ marginTop: '30px' }} id="table">
          <thead className="thead-light" id="thead">
            <tr>
              <th scope="col">id_ferramenta</th>
              <th scope="col">tipo_ferramenta</th>
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
          Adicionar nova Ferramenta
        </button>
      </span>
    );
  }
}

export default PaginaFerramentas;
