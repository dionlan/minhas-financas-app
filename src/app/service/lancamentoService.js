import ApiService from '../apiservice'

export default class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses = () => {
        const listaMeses =         
        [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro',      value: 1},
            {label: 'Fevereiro',    value: 2},
            {label: 'Março',        value: 3},
            {label: 'Abril',        value: 4},
            {label: 'Maio',         value: 5},
            {label: 'Junho',        value: 6},
            {label: 'Julho',        value: 7},
            {label: 'Agosto',       value: 8},
            {label: 'Setembro',     value: 9},
            {label: 'Outubro',      value: 10},
            {label: 'Novembro',     value: 11},
            {label: 'Dezembro',     value: 12}
        ]
        return listaMeses
    } 

    obterListaTiposLancamentos = () => {
        const listaTiposLancamentos = 
        [
            {label:  'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}
        ]
        return listaTiposLancamentos
    }

    consultar(lancamentoFiltro){
        let params = `?ano${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }
        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }
        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }
        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }
        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}` 
        }

        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    cadastrarLancamento(lancamentoInput){
        return this.post('/salvar', lancamentoInput)
    }

    atualizar(lancamentoInput){
        return this.put(`/${lancamentoInput.id}`, lancamentoInput)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }
}