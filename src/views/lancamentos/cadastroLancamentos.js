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
    const [atualizando, setAtualizando] = useState(false);

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

    /**
     * Ao clicar para editar algum lançamento na tela de consultar lançamentos, é passada na propriedade editAction em consultaLancamentos a função de editar
     * que navega até esta tela de cadastroLancamentos.js com o lançamento a ser editado carregado por meio do id vindo como parâmetro. 
     * Neste momento o useEffect é chamado antes de qualquer outra função para carregar o lançamento a ser editado em tela.
     */
    useEffect( () => { 
        if (!mounted.current || !atualizando ) {
            if(id){
                service.obterPorId(id)
                    .then(response => {
                    setInputCadastroLancamentos({ ...response.data, }, )
                    mounted.current = true;
                    setAtualizando(true)
                }).catch (erro => {
                    mensagemErro(erro)
                    //mensagemErro(erro.response.data)
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

    function cadastar() {
        try{
            service.validar(inputCadastroLancamentos)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg))
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
        setAtualizando(true)
        try{
            service.validar(inputCadastroLancamentos)
        }catch(erro){
            const mensagens = erro.mensagem;
            mensagens.forEach(msg => mensagemErro(msg))
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
                        <input id="inputStatus" type="text" className="form-control" name="status" disabled value={inputCadastroLancamentos.status} />
                    </FormGroup>
                </div>
            </div>

            <div className="form-label mt-2">
                { atualizando ? 
                    (
                        <button className="btn btn-primary" onClick={atualizar}> 
                            <i className="pi pi-refresh" />
                            Atualizar 
                        </button>
                    ) : (
                        <button className="btn btn-success" onClick={cadastar}> 
                            <i className="pi pi-save" />
                            Salvar 
                        </button>
                    )
                }
                    <button className="btn btn-danger" onClick={cancelar}> 
                        <i className="pi pi-times" />
                            Cancelar 
                    </button> 
            </div>
        </Card>
    )
}
export default CadastroLancamentos