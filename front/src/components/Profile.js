import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      nome: '',
      tipo: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      nome: decoded.nome,
      tipo: decoded.tipo,
      email: decoded.email
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Nome do Usuário</td>
                <td>{this.state.nome}</td>
              </tr>
              <tr>
                <td>Tipo Funcionário</td>
                <td>{this.state.tipo}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile