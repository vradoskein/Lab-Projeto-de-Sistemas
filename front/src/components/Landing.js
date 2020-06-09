import React, {Component} from 'react'
import jwt_decode from 'jwt-decode';
import {getManutForMec as getManut} from '../functions/MecFunctions';
import {getBusNeedManut} from '../functions/BusFunctions';

class Landing extends Component{
    constructor(){
        super();

    }


    async componentDidMount(){
        try{
        const token = window.localStorage.getItem('usertoken');
        const decoded = jwt_decode(token);
        console.log(decoded);
        if(decoded.tipo == 2){
            const hasManut = await getManut(decoded.id_funcionario);
            if(hasManut){
                alert(`Você foi alocado para a manutenção ${hasManut.id_manutencao}`);
            } else {
                alert('Você não foi escalado para nenhuma manutenção.');
            }
        } else if (decoded.tipo == 1) {
            const needManut = await getBusNeedManut();
            console.log(needManut);
            let idNeedManut = ''
            for (let i = 0; i < needManut.length; i++) {
                const bus = needManut[i];
                idNeedManut += bus.id_onibus + ', ';
            }
            if(idNeedManut!=='') {
                alert(`O(s) ônibus ${idNeedManut} precisam de uma manutenção.`);
            } else {
                alert('Nenhum ônibus precisa ser destinado à manutenção.');
            }
        }
    }catch(err){
        console.log('nenhum token foi encontrado.');
    }
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron">{/* mt-5 */}
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center"> BEM VINDO</h1>   
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing