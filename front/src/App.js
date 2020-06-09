import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import MecanicoPage from './components/MecanicoPage.js';
import Gerente from './components/Gerente.js';
import PaginaOficinaMecanico from './components/Oficina/PaginaOficinaMecanico';
import PaginaOficinaGerente from './components/Oficina/PaginaOficinaGerente';
import PaginaOnibus from './components/Bus/PaginaOnibus.js';
import PaginaPecas from './components/Pecas/page.js';
import PaginaPneus from './components/Pneus/page.js';
import PaginaFuncionarios from './components/Funcionarios/page.js';
import PaginaFerramentas from './components/Ferramentas/page';

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
          <Route exact path="/listBus" component={PaginaOnibus} />
          <Route exact path="/listPneus" component={PaginaPneus} />
          <Route exact path="/listPecas" component={PaginaPecas} />
          <Route exact path="/listFuncionarios" component={PaginaFuncionarios} />
          <Route exact path="/listFerramentas" component={PaginaFerramentas} />
          {/* <Route exact path="/gerente" component={Gerente} /> */}
          <Route
            exact
            path="/gerente/oficina"
            component={PaginaOficinaGerente}
          />
          <Route
            exact
            path="/mecanico/oficina"
            component={PaginaOficinaMecanico}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
