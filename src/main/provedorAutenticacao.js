import React from "react";
import { createContext, useEffect, useState } from "react";
import AuthService from "../app/service/authService";
import jwt_decode from "jwt-decode";
import ApiService from "../app/apiservice";

export const AuthContext = createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

function ProvedorAutenticacao({ children }) {

    const [isAutenticado, setIsAutenticado] = useState(false)
    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    const iniciarSessao = (tokenDTO) => {
        console.log('iniciar sessao tokenDTO', tokenDTO)
        const token = tokenDTO.token
        const claims = jwt_decode(token);
        const usuario = {
            userId: claims.userId,
            nome: claims.nome
        }
        console.log("Usuário iniciado: ", usuario)

        ApiService.registrarToken(token)
        AuthService.logar(usuario, token)

        setIsAutenticado(true)
        setUsuarioAutenticado(usuario)
    } 

    useEffect( () => { 
        const ehAutenticado = AuthService.isUsuarioAutenticado()
        console.log("Usuario Autenticado?? ", ehAutenticado)
        if(ehAutenticado){
            const usuario = AuthService.refreshSession()
            setIsAutenticado(!isAutenticado)
            setUsuarioAutenticado(usuario)
            setIsLoading(false)
        }else{
            setIsLoading(true)
        }
    }, [])

    const contexto = {
        iniciarSessao,
        usuarioAutenticado: usuarioAutenticado
    }

    return (
            <AuthProvider value={contexto}>
                {children}
            </AuthProvider>
	);
}

export default ProvedorAutenticacao
