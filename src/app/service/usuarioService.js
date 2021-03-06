import ApiService from "../apiservice";
import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        const saldo = this.get(`/${id}/saldo`)
        console.log('SALDO: ', saldo)
        return saldo
    }

    salvar(usuario){
        return this.post('/salvar', usuario)
    }

    validar(usuario){
        const erros = []
        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        }
        if(!usuario.email){
            erros.push('O campo Email é obrigatório.')
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um Email válido.')
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.')
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não coincidem. Digite novamente.')
        }
        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}
export default UsuarioService;