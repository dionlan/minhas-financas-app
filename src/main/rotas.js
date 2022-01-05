import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
            </Routes>
        </Router>
    )
}

export default Rotas   