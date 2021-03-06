import React, {useContext} from "react";
import NavbarItem from "./navbarItem";
import { AuthContext } from "../main/provedorAutenticacao";

/*
const deslogar = () => {
    AuthService.removerUsuarioAutenticado();
}

const isUsuarioAutenticado = () => {
    return AuthService.isUsuarioAutenticado();
}
*/

function Navbar({ props }){
    const usuarioContextConsumer = useContext(AuthContext);
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarResponsive" aria-controls="navbarResponsive" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button> 
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={usuarioContextConsumer.isAutenticado} href="/home" label="Home" />
                        <NavbarItem render={usuarioContextConsumer.isAutenticado} href="/cadastro-usuarios" label="Usuários" />
                        <NavbarItem render={usuarioContextConsumer.isAutenticado} href="/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem render={usuarioContextConsumer.isAutenticado} onClick={usuarioContextConsumer.encerrarSessao} href="/login" label="Sair" />
                    </ul>
                </div>

        </div> 
        </div>
    )
}

export default Navbar