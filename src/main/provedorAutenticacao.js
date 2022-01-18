import React from "react";
import { createContext, useEffect, useState } from "react";
import AuthService from "../app/service/authService";
import jwt_decode from "jwt-decode";
import ApiService from "../app/apiservice";

export const AuthContext = createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

function ProvedorAutenticacao({ children }) {

    let [isAutenticado, setIsAutenticado] = useState(false)
    let [usuarioAutenticado, setUsuarioAutenticado] = useState('')
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

    const encerrarSessao = () => {
        console.log('ENCERRAR SESSÃO CHAMADO. ')
        AuthService.removerUsuarioAutenticado();
        setIsAutenticado(false)
        setUsuarioAutenticado(null)
    }

    useEffect( () => { 
        const ehAutenticado = AuthService.isUsuarioAutenticado()
        console.log("USUARIO AUTENTICADO USE EFFECT?? ", ehAutenticado)
        console.log("USUARIO AUTENTICADO DECLARAÇÃO LET?? ", isAutenticado)
        if(ehAutenticado){
            const usuario = AuthService.refreshSession()
            setIsAutenticado(ehAutenticado)
            setUsuarioAutenticado(usuario)
            console.log("Usuario AUTENTICADO!! ", isAutenticado)
            setIsLoading(false)
        }
    }, [])

    const contexto = {
        iniciarSessao,
        encerrarSessao,
        usuarioAutenticado: usuarioAutenticado,
        isAutenticado: isAutenticado
    }

    return (
            <AuthProvider value={contexto}>
                {children}
            </AuthProvider>
	);
}

export default ProvedorAutenticacao
