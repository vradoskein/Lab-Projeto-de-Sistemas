import React, { Component } from 'react';

class BusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busList: this.props.busList,
    };
  }

  componentDidMount() {
    // console.log(this.state.busList);
    this.state.busList.forEach((bus) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = `<strong>id:</strong>  ${
        bus.id_onibus
      }  <strong>Data da última revisão:</strong> ${
        !!bus.data_revisao ? bus.data_revisao : 'nunca realizada'
      }`;
      document.getElementById('myheader').appendChild(paragraph);
    });
  }

  render() {
    return (
      <div>
        <div id="mydiv">
          <h1 id="myheader"> Header</h1>
        </div>
      </div>
    );
  }
}

export default BusList;
