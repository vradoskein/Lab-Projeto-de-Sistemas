import React, { Component } from 'react';
import { register, list } from './BusFunctions';

class Gerente extends Component {
  constructor() {
    super();
    this.state = {
      id_onibus: '',
      ano_chassi: '',
      ano_carroceria: '',
      modelo_onibus: '',
      modelo_chassi: '',
      km_motor: '',
      data_revisao: '',
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createBus = () => {
    console.log('createBus()');
    const newBus = {
      id_onibus: this.state.id_onibus,
      ano_chassi: this.state.ano_chassi,
      ano_carroceria: this.state.ano_carroceria,
      modelo_onibus: this.state.modelo_onibus,
      modelo_chassi: this.state.modelo_chassi,
      km_motor: this.state.km_motor,
      data_revisao: this.state.data_revisao,
    };
    console.log('bus:', newBus);
    register(newBus);
  };

  listBus = async () => {
    console.log('listBus()');
    const busList = await list();
    console.log(busList);

    const title = document.createElement("p");
    title.innerHTML = "ASDASD" // fazer for com os onibus
    document.getElementById("myheader").appendChild(title);
    
  };

  render() {
    return (
      <div>
        <div>
          <h1>id_onibus </h1>
          <input
            type="text"
            className="form-control"
            name="id_onibus"
            placeholder="Digite o numero do id_onibus"
            value={this.state.id_onibus}
            onChange={this.onChange}
          />
          <h1>ano_chassi </h1>
          <input
            type="text"
            className="form-control"
            name="ano_chassi"
            placeholder="Digite o ano_chassi do onibus"
            value={this.state.ano_chassi}
            onChange={this.onChange}
          />
          <h1>ano_carroceria </h1>
          <input
            type="text"
            className="form-control"
            name="ano_carroceria"
            placeholder="Digite o ano_carroceria do onibus"
            value={this.state.ano_carroceria}
            onChange={this.onChange}
          />
          <h1>modelo_onibus </h1>
          <input
            type="text"
            className="form-control"
            name="modelo_onibus"
            placeholder="Digite o modelo_onibus do onibus"
            value={this.state.modelo_onibus}
            onChange={this.onChange}
          />
          <h1>modelo_chassi </h1>
          <input
            type="text"
            className="form-control"
            name="modelo_chassi"
            placeholder="Digite o modelo_chassi do onibus"
            value={this.state.modelo_chassi}
            onChange={this.onChange}
          />
          <h1>km_motor </h1>
          <input
            type="text"
            className="form-control"
            name="km_motor"
            placeholder="Digite o km_motor do onibus"
            value={this.state.km_motor}
            onChange={this.onChange}
          />
          <h1>data_revisao </h1>
          <input
            type="text"
            className="form-control"
            name="data_revisao"
            placeholder="Digite o data_revisao do onibus"
            value={this.state.data_revisao}
            onChange={this.onChange}
          />
          <button onClick={this.createBus}>Criar onibus</button>
        </div>
        <div>
          <button onClick={this.listBus}>Listar onibus</button>
        </div>
        <div id="mydiv"> 
        <h1 id="myheader"> Header</h1>
        </div>
        
      </div>
    );
  }
}

export default Gerente;
