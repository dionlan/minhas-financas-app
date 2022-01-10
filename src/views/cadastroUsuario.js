import React from "react"
import Card from "../components/card"
import FormGroup from "../components/form-group"
import UsuarioService from "../app/service/usuarioService"
import { useNavigate } from 'react-router-dom'
import { mensagemErro, mensagemSucesso } from "../components/toastr"

function CadastroUsuario() {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [senhaRepeticao, setSenhaRepeticao] = React.useState('');

    const service = new UsuarioService()

    function cadastar() {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha, 
            senhaRepeticao: senhaRepeticao
        }

        try{
            service.validar(usuario)
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg))
            return false
        }

        service.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessar o sistema.')
            navigate('/login')
        }).catch(erro => {
            mensagemErro(erro.response.data.detail)
        })

    }

    let navigate = useNavigate()
    function cancelar() {
        navigate('/login')
    }
    return(
        <Card title="Cadastro de Usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text" id="inputNome" className="form-control" name="nome" value={nome}
                            autoFocus={true} onChange={e => setNome(e.target.value)}/>
                        </FormGroup>

                        <FormGroup label="E-Mail: *" htmlFor="inputEmail">
                            <input type="email" id="inputEmail" className="form-control" name="email" value={email}
                            autoFocus={true} onChange={e => setEmail(e.target.value)}/>
                        </FormGroup>

                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password" id="inputSenha" className="form-control" name="senha" value={senha}
                            autoFocus={true} onChange={e => setSenha(e.target.value)}/>
                        </FormGroup>

                        <FormGroup label="Repita Senha: *" htmlFor="inputRepitaSenha">
                            <input type="password" id="inputRepitaSenha" className="form-control" name="inputRepitaSenha" value={senhaRepeticao}
                            autoFocus={true} onChange={e => setSenhaRepeticao(e.target.value)}/>
                        </FormGroup>
                        <div className="form-label mt-2">
                            <button type="button" onClick={cadastar} className="btn btn-success">Salvar</button>
                            <button type="button" onClick={cancelar} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default CadastroUsuario