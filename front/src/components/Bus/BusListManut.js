import React, { Component } from 'react';
import { listManut } from '../../functions/BusFunctions';

class BusListManut extends Component {
  constructor() {
    super();
    this.state = {
      busListManut: [],
    };
  }

  async componentDidMount() {
    console.log(this.state.busListManut);
    const actualBustList = await listManut();
    console.log(this.state.busListManut);
    console.log(actualBustList);
    // this.setState({ 
    //   busListManut: actualBustList 
    // });
    console.log(this.state.busListManut);
    this.state.busListManut.forEach((bus) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = `<strong>id:</strong>  ${
        bus.id_onibus
      }  <strong>Data da última revisão:</strong> ${
        !!bus.data_revisao ? bus.data_revisao : 'nunca realizada'
      }`;
      document.getElementById('myheader').appendChild(paragraph);
    });
    console.log(this.state.busListManut);
  }

  render() {
    return (
      <div>
        <div id="mydiv">
          <h1 id="myheader"> LISTAR OS ONIBUS AQUI TCHARLIN77 TROLLING mals</h1>
        </div>
      </div>
    );
  }
}

export default BusListManut;
