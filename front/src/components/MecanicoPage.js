import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

class MecanicoPage extends Component {
  state = {
    redirect: false,
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/busList" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect</button>
      </div>
    );
  }
}

export default MecanicoPage;
