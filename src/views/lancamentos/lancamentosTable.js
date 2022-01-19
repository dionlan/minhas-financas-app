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
                <td>{lancamento.usuario.userId}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                            className='btn btn-success btn-sm' type="button" title='Efetivar' disabled={lancamento.status !== 'PENDENTE'}>
                            <i className='pi pi-check' />
                    </button>
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                            className='btn btn-warning btn-sm' type="button" title='Cancelar' disabled={lancamento.status !== 'PENDENTE'}>
                            <i className='pi pi-times' />
                    </button>
                    <button type='button' className='btn btn-primary btn-sm' 
                            onClick={e => props.editAction(lancamento.id)} title='Editar'>
                            <i className='pi pi-pencil' />
                    </button>
                    <button type='button' className='btn btn-danger btn-sm' 
                    onClick={e => props.deleteAction(lancamento)} title='Deletar'>
                            <i className='pi pi-trash' />
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
                    <th scope="col">ID Usuário</th>
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