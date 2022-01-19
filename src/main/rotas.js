import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos";
import PrivateRoute from './privateRoute'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from "../views/landingPage";

function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/> 

                <Route element={<PrivateRoute/>}>
                    
                    <Route path="/home" element={<Home/>} />
                    <Route path="/consulta-lancamentos" element={<ConsultaLancamentos/>}/>
                    <Route path="/cadastro-lancamentos">
                        <Route path=":userId" element={<CadastroLancamentos/>}/>
                        <Route path="" element={<CadastroLancamentos/>}/>
                    </Route>
                </Route>
                
            </Routes>
        </Router>
    ) 
}

export default Rotas   