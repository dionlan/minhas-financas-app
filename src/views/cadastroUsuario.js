import React from "react"
import Card from "../components/card"
import FormGroup from "../components/form-group"

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastar = () => {
        console.log(this.state)
    }

    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" id="inputNome" className="form-control" name="nome" onChange={e => this.setState({nome: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="E-Mail: *" htmlFor="inputEmail">
                                <input type="email" id="inputEmail" className="form-control" name="email" onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" id="inputSenha" className="form-control" name="senha" onChange={e => this.setState({senha: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Repita Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" id="inputRepitaSenha" className="form-control" name="inputRepitaSenha" onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                            </FormGroup>

                            <button type="button" onClick={this.cadastar} className="btn btn-success">Salvar</button>
                            <button type="button" className="btn btn-danger">Cancelar</button>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default CadastroUsuario