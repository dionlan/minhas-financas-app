import React, { useContext } from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'
//import LocalStorageService from '../app/service/localStorageService'
//import ProvedorAutenticacao from '../main/provedorAutenticacao'
import { AuthContext } from '../main/provedorAutenticacao'

function Login(){
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    const context = useContext(AuthContext);

    const service = new UsuarioService();
    //const context = useContext(AuthContext);

    const navigate = useNavigate()
   

    const entrar = () => {
        service.autenticar({
            email: email,
            senha: senha
        }).then(response => {
            //LocalStorageService.adicionarItem('_usuario_logado', response.data)
            //console.log('USUARIO: ', response.data)
            context.iniciarSessao(response.data);
            
            console.log('After home', context.usuarioAutenticado)
            navigate('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data.userMessage)
            //console.log('ERRO NO AUTENTICAR LOGIN: ', erro)
        })
    }

    function prepareCadastrar () {
        navigate('/cadastro-usuarios')
    }
    
    return(
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="bs-docs-section">
                    <Card title="Login" >  
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="E-mail: *" htmlFor="exampleInputEmail1">
                                            <input type="email" value={email} className="form-control" 
                                            id="exampleInputEmail1" onChange={e => setEmail(e.target.value)}
                                            autoFocus={true} aria-describedby="emailHelp" placeholder="Digite o E-mail" />
                                        </FormGroup>

                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" value={senha} className="form-control" 
                                            id="exampleInputPassword1" onChange={e => setSenha(e.target.value)}
                                            autoFocus={true} placeholder="Digite a Senha" />

                                        </FormGroup>
                                        <div className="form-label mt-4">
                                            <button onClick={entrar} className='btn btn-success' >
                                                <i className='pi pi-sign-in' />
                                                Entrar
                                            </button>
                                            <button onClick={prepareCadastrar} className='btn btn-danger' >
                                                <i className='pi pi-plus' />
                                                Cadastrar
                                            </button>
                                        </div>
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