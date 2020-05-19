import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar.js'
import Landing from './components/Landing.js'
import Profile from './components/Profile.js'
import Register from './components/Register.js'
import Login from './components/Login.js'
import MecanicoPage from './components/MecanicoPage.js'
import BusList from './components/Bus/BusListGerente.js'
import Gerente from './components/Gerente.js'
import PaginaOficinaMecanico from './components/Oficina/PaginaOficinaMecanico'
import PaginaOficinaGerente from './components/Oficina/PaginaOficinaGerente'

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
          {/* <Route exact path="/busList" component={BusList} /> */}
          <Route exact path="/gerente" component={Gerente} />
          <Route exact path="/gerente/oficina" component={PaginaOficinaGerente}/>
          <Route exact path="/mecanico/oficina" component={PaginaOficinaMecanico}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
