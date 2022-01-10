import React from 'react'
import currencyFormatter from 'currency-formatter'

const lancamentoTable = (props) => {
    const rows = props.lancamentos.map((lancamento, index) => {
        return(
            <tr key={index}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>{lancamento.usuario.nome}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                            className='btn btn-success' type="button">
                            Efetivar
                    </button>
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                            className='btn btn-warning' type="button">
                            Cancelar
                    </button>
                    <button type='button' className='btn btn-primary' 
                            onClick={e => props.editAction(lancamento.id)} >
                            Editar
                    </button>
                    <button type='button' className='btn btn-danger' 
                    onClick={e => props.deleteAction(lancamento)} >
                            Deletar
                    </button>
                </td>
            </tr>
        )
    })
    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table> 
    )
}
export default lancamentoTable