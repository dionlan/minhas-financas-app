import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<PrivateRoute/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/consulta-lancamentos" element={<ConsultaLancamentos/>}/>
                    <Route path="/cadastro-lancamentos">
                        <Route path=":id" element={<CadastroLancamentos/>}/>
                        <Route path="" element={<CadastroLancamentos/>}/>
                    </Route>
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/> 
            </Routes>
        </Router>
    ) 
}

export default Rotas   