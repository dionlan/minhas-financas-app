import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import LocalStoreService from '../app/service/localStorageService'
import { mensagemErro } from '../components/toastr'

function Login(){
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    let service = new UsuarioService();

    let navigate = useNavigate()
    function botaoLoginCadastrar() {
        navigate('/cadastro-usuarios')
    }

    function entrar() {
        service.autenticar({
            email: email,
            senha: senha
        }).then(response => {
            LocalStoreService.adicionarItem('_usuario_logado', response.data)
            navigate('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data.detail)
        })

        console.log('Requisição de login executada')
    }
    
    return(
        <div className="row">
            <div className="col-md-6" style={ {position: "relative", left: "300px"} }>
                <div className="bs-docs-section">
                    <Card title="Login">  
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="E-mail: *" htmlFor="exampleInputEmail1">
                                            <input type="email" value={email} className="form-control" 
                                            id="exampleInputEmail1" onChange={e => setEmail(e.target.value)}
                                            autoFocus={true} aria-describedby="emailHelp" placeholder="Digite o E-mail"/>
                                        </FormGroup>

                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" value={senha} className="form-control" 
                                            id="exampleInputPassword1" onChange={e => setSenha(e.target.value)}
                                            autoFocus={true} placeholder="Digite a Senha"/>

                                        </FormGroup>
                                        <button onClick={entrar} className='btn btn-success'>Entrar</button>
                                        <button onClick={botaoLoginCadastrar} className='btn btn-danger'>Cadastrar</button>
                                        
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Login