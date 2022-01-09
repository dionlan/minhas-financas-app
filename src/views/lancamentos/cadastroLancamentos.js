import React, { useState, useEffect} from 'react';
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService"
import { mensagemErro, mensagemSucesso } from "../../components/toastr"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

function CadastroLancamentos() {
    const service = new LancamentoService();
    const tipos = service.obterListaTiposLancamentos()
    const meses = service.obterListaMeses()
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const { id } = useParams();
    const mounted = React.useRef();

    const [inputCadastroLancamentos, setInputCadastroLancamentos] = useState({
        descricao:  '',
        ano:        '',
        mes:        '',
        valor:      '',
        tipo:       '',
        status:     '',
        usuario: {
            id: usuarioLogado.id,
        }
    });

    useEffect( () => { 
        if (!mounted.current) {
            if(id){
                service.obterPorId(id)
                    .then(response => {
                    setInputCadastroLancamentos({ ...response.data, }, )
                    mounted.current = true;
                }).catch (erro => {
                    mensagemErro(erro.response.data)
                })
            }
        }
    })

    const handleChange = event => {
        setInputCadastroLancamentos({
            ...inputCadastroLancamentos,
            [event.target.name]: event.target.value,
        });
    };

    function validar(params) {
        const msgs = []
        if(!inputCadastroLancamentos.descricao){
            msgs.push('O campo Descrição é obrigatório.')
        }if(!inputCadastroLancamentos.valor){
            msgs.push('O campo Valor é obrigatório.')
        }if(!inputCadastroLancamentos.ano){
            msgs.push('O campo Ano é obrigatório.')
        }
        return msgs;
    }

    function cadastar() {
        const msgs = validar()

        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false
        }
        service.cadastrarLancamento(inputCadastroLancamentos)
        .then(response => {
            navigate('/consulta-lancamentos')
            mensagemSucesso('Lançamento cadastrado com sucesso.')

        }).catch(erro => {

            mensagemErro(erro.response.data.detail)

        })
    }

    function atualizar() {
        const msgs = validar()

        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false
        }
        service.atualizar(inputCadastroLancamentos)
        .then(response => {
            navigate('/consulta-lancamentos')
            mensagemSucesso('Lançamento atualizado com sucesso.')

        }).catch(erro => {

            mensagemErro(erro.response.data.detail)

        })
    }

    let navigate = useNavigate()
    function cancelar() {
        navigate('/consulta-lancamentos')
    }
      
    return(
        <Card title="Cadastrar Lançamentos">
            <div className="row">
                <div className="md-col-12 ">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" type="text" className="form-control" name="descricao" value={inputCadastroLancamentos.descricao}
                        onChange={handleChange} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno" type="number" className="form-control" name="ano" value={inputCadastroLancamentos.ano}
                        onChange={handleChange} />
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes" lista={meses} className="form-control" name="mes" value={inputCadastroLancamentos.mes}
                        onChange={handleChange} />
                    </FormGroup>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input id="inputValor" type="text" className="form-control" name="valor" value={inputCadastroLancamentos.valor}
                        onChange={handleChange} />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo" lista={tipos} className="form-control" name="tipo" value={inputCadastroLancamentos.tipo}
                        onChange={handleChange} />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: ">
                        <input id="inputStatus" type="text" className="form-control" name="status" value={inputCadastroLancamentos.status} 
                        onChange={handleChange} />
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-success" onClick={cadastar} > Cadastrar </button>
                    <button className="btn btn-primary" onClick={atualizar} > Atualizar </button>
                    <button className="btn btn-danger" onClick={cancelar} > Cancelar </button> 
                </div>
            </div>
        </Card>
    )
}
export default CadastroLancamentos