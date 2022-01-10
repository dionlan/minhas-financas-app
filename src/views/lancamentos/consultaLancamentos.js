import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService"
import LocalStorageService from "../../app/service/localStorageService"
import * as messages from '../../components/toastr'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

function ConsultaLancamentos (){

    const service = new LancamentoService()
    let navigate = useNavigate();

    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [lancamentos, setLancamentos] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});


    function buscar () {

        if(!ano){
            messages.mensagemErro('O preenchimento do campo ano é obrigatório')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const lancamentoFiltro = {
            ano: ano,
            mes: mes,
            tipo: tipo,
            descricao: descricao,
            usuario: usuarioLogado.id
        }
        service
            .consultar(lancamentoFiltro)
            .then(response => {
                setLancamentos(lancamentos => response.data)
                
            }).catch(error => {
                console.log('Erro ao buscar. ', error)
            })
    }

    function editar (id){
        navigate(`/cadastro-lancamentos/${id}`)
    }

    function abrirConfirmação(lancamento){
        console.log('LANCAMENTO A DELETAR: ', lancamento)
        setShowConfirmDialog(true, setLancamentoDeletar(lancamento))
    }

    function cancelarDelecao(){
        setShowConfirmDialog(false, setLancamentoDeletar({}))
    }

    function deletar(){
        service.deletar(lancamentoDeletar.id)
        .then(response => { 
            const index = lancamentos.indexOf(lancamentoDeletar);
            lancamentos.splice(index, 1);
            setLancamentos(lancamentos, setShowConfirmDialog(false));

            messages.mensagemSucesso('Lançamento deletado com sucesso.')

        }).catch(error => {
            console.log(error)
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
        })
    }

    const meses = service.obterListaMeses();
    
    const tipos = service.obterListaTiposLancamentos();

    const confirmDialogFooter = (
        <div>
            <Button label='Confirmar' icon='pi pi-check' onClick={deletar} />
            <Button label='Cancelar' icon='pi pi-check' onClick={cancelarDelecao} className='p-button-secondary' />
        </div>
    )

    function preparaFormularioCadastro() {
        
        navigate('/cadastro-lancamentos')
    }

    function alterarStatusLancamento(lancamento, statusLancamento){

        service
            .atualizarStatus(lancamento.id, statusLancamento)
            .then(response => {
            
            const index = lancamentos.indexOf(lancamento);
            if(index !== -1){
                lancamento['status'] = statusLancamento

                setLancamentos([...lancamentos, lancamento])
            } 
            messages.mensagemSucesso('Status atualizado com sucesso.') 
            })
            .catch(error => {
            console.log('ERRO STATUS LANÇAMENTO', error)
            messages.mensagemErro('Ocorreu um erro ao tentar atualisar o status do lançamento.')
        })
    }



    return ( 
        <Card title = "Consulta Lançamentos" >
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control" value={ano}
                                   onChange={e => setAno(e.target.value)} placeholder="Digite o Ano" />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu id="inputMes" className="form-control" lista={meses} 
                                        value={mes} onChange={e => setMes(e.target.value)} /> 
                        </FormGroup>

                        <FormGroup htmlFor="inputDescricao" label="Descricão: ">
                            <input type="text" id="inputDescricao" className="form-control" value={descricao} 
                                        onChange={e => setDescricao(e.target.value)} placeholder="Digite uma descrição" /> 
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo do Lançamento: ">
                            <SelectMenu id="inputTipo" className="form-control" lista={tipos} 
                                        value={tipo} onChange={e => setTipo(e.target.value)} /> 
                        </FormGroup>
                        <div className="form-label mt-2">
                            <button type="button" onClick={buscar} className="btn btn-primary">Buscar</button>
                            <button type="button" onClick={preparaFormularioCadastro} className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={lancamentos} 
                                        deleteAction={abrirConfirmação} 
                                        editAction={editar} 
                                        alterarStatus={alterarStatusLancamento}/>
                    </div>
                </div>
            </div>
            <div>
                <Dialog header="Confirmar Exclusão" visible={showConfirmDialog} style={{ width: '50vw' }} footer={confirmDialogFooter}
                modal={true} onHide={() => setShowConfirmDialog({showConfirmDialog: false})}>
                    Deseja realmente excluir este lançamento?
                </Dialog>
                
            </div>
        </Card>
    )
}
export default ConsultaLancamentos