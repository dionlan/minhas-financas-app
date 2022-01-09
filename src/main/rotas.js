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
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
                <Route path="/consulta-lancamentos" element={<ConsultaLancamentos/>}/>
                <Route path="/cadastro-lancamentos/:id" element={<CadastroLancamentos/>}/>
            </Routes>
        </Router>
    )
}

export default Rotas   