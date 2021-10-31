//Interface de programção da aplicação Validação

module.exports = app => {

    //Função que existe algum algum valor e não existe erro
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    //Função que não existe algum valor e existe erro
    function notExistsOrError(value, msg) {
        try{
            existsOrError(value, msg)
        }catch(msg){
            return
        }
        throw msg
    }
    
    //Função para compara dois valores
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    //Retrona as funções
    return { existsOrError, notExistsOrError, equalsOrError }
}