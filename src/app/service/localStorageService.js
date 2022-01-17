export default class LocalStorageService{

    static adicionarItem(chave, valor){
        console.log('chave: ', chave)
        console.log('valor: ', valor)
        localStorage.setItem(chave, JSON.stringify(valor))
        console.log(localStorage.getItem)
    }

    static obterItem(chave){
        const item = localStorage.getItem(chave);
        console.log('ID USUARIO LOGADO: ', item)
        return JSON.parse(item);
    }

    static removerUsuario(chave){
        localStorage.removeItem(chave)
    }
}