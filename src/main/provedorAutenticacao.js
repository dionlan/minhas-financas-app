import React from "react";
import { createContext, useEffect, useState } from "react";
import AuthService from "../app/service/authService";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

function ProvedorAutenticacao({ children }) {

    const [isAutenticado, setIsAutenticado] = useState(false)
    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')

    const iniciarSessao = (tokenDTO) => {
        console.log('iniciar sessao tokenDTO', tokenDTO)
        const token = tokenDTO.token
        const claims = jwt_decode(token);
        const usuario = {
            userId: claims.userId,
            nome: claims.nome
        }
        console.log("Usuário iniciado: ", usuario)

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
        const isAutenticado = AuthService.isUsuarioAutenticado()
        console.log("USUARIO AUTENTICADO?? ", isAutenticado)
        if(isAutenticado){
            const usuario = AuthService.refreshSession()
            setIsAutenticado({isAutenticado: isAutenticado})
            setUsuarioAutenticado(usuario)
            
        }else{
            return null
        }
    }, [])

    const contexto = {
        iniciarSessao,
        encerrarSessao,
        usuarioAutenticado,
        isAutenticado
    }

    return (
        <AuthProvider value={contexto}>
            {children}
        </AuthProvider>
	);
}

export default ProvedorAutenticacao
