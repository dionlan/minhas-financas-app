import React, {useEffect, useContext } from 'react' 
import UsuarioService from '../app/service/usuarioService'
import { AuthContext } from '../main/provedorAutenticacao';

function Home(){

    const [saldo, setSaldo] = React.useState(0)
    const usuarioService = new UsuarioService();
    
    const usuarioContext = useContext(AuthContext);

    useEffect( () => { 
        const usuarioLogado = usuarioContext.usuarioAutenticado
        console.log('ID USUARIO LOGADO: ', usuarioLogado.userId)
        usuarioService
            .obterSaldoPorUsuario(usuarioLogado.userId)
            .then( response => {
                setSaldo(response.data)
                console.log('SALDOOOO: ', saldo)
            }).catch(error => {
                console.error(error.response)
            });
    })
        
    return(
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de R$ {saldo}</p>
            <hr className="my-4" />
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="/cadastro-usuarios" 
                    role="button">
                        <i className="pi pi-users"/> 
                        Cadastrar Usuário
                </a>
                <a className="btn btn-danger btn-lg" href="/cadastro-lancamentos" 
                    role="button">
                        <i className="pi pi-money-bill"/>
                        Cadastrar Lançamento
                </a>
            </p>
        </div>
    )
}
export default Home