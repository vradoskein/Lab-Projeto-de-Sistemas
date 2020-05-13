import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar.js'
import Landing from './components/Landing.js'
import Profile from './components/Profile.js'
import Register from './components/Register.js'
import Login from './components/Login.js'
import MecanicoPage from './components/MecanicoPage.js'
import BusList from './components/Bus/BusList.js'
import Gerente from './components/Gerente.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/mecanico" component={MecanicoPage} />
          <Route exact path="/busList" component={BusList} />
          <Route exact path="/gerente" component={Gerente} />
        </div>
      </div>
    </Router>
  );
}

export default App;
