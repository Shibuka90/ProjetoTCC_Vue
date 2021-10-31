//Interface de programção da aplicação Paciente

module.exports = app => {

    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const paciente = { ...req.body }
        //Condição de existência da variável codigopac do parâmetro da requisição para passar para a variável codigopac de paciente
        if(req.params.codigopac) paciente.codigopac = req.params.codigopac
                
         // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try{
            existsOrError(paciente.nomepac, 'Nome não informado')
            existsOrError(paciente.email, 'Email não informado')
            existsOrError(paciente.cpf, 'CPF não informado')
            existsOrError(paciente.datanasc, 'Data de Nascimento não informada')
            existsOrError(paciente.estadocivil, 'Estado Civil não informado')
            existsOrError(paciente.sexo, 'Sexo não informado')
            existsOrError(paciente.mae, 'Mãe não informada')
            existsOrError(paciente.pai, 'Pai não informado')
            existsOrError(paciente.ceppaciente, 'CEP não informado')
            existsOrError(paciente.tipo, 'Tipo do Logradouro não informado')
            existsOrError(paciente.endereco, 'Endereço não informado')
            existsOrError(paciente.numero, 'Número não informado')
            existsOrError(paciente.bairro, 'Bairro não informado')
            existsOrError(paciente.municipio, 'Municipio não informado')
            existsOrError(paciente.ufmunicipio, 'UF do Municipio não informado')
            existsOrError(paciente.celddd, 'DDD do Celular não informado')
            existsOrError(paciente.cel, 'Celular não informado')
            existsOrError(paciente.codconvenio, 'Convenio não informado')
            existsOrError(paciente.matricula, 'Matricula não informada')
            existsOrError(paciente.vencimento, 'Vencimento não informado')
        
        }catch(msg) {
            return res.status(400).send(msg)
        } 

        /*Condição de existência de dados na variável codigopac, se existir, será feito o update nos dados do Paciente cadastrado, 
        se não existir, será feito o insert dos dados de cadastro do Paciente no banco de dados*/
        if(paciente.codigopac){
            app.db('pacientes')
                .update(paciente)
                .where({ codigopac: paciente.codigopac })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pacientes')
                .insert(paciente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    /*Função de "trazer ou pegar" as informações das tabelas Pacientes e Convênios para montar a tabela de dados na página de Pacientes,
    a tabela Pacientes, tem FK(Foreign Key) da tabela Convênios */
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db({p: 'pacientes', c: 'convenios'})
            //seleciona os dados das tabela Pacientes e Convênios 
            .select('p.codigopac', 'p.nomepac', 'p.email', 'p.cpf', 'p.datanasc', 'p.estadocivil', 'p.sexo', 'p.mae', 'p.pai', 'p.ceppaciente', 'p.tipo', 
            'p.endereco', 'p.numero', 'p.bairro', 'p.municipio', 'p.ufmunicipio', 'p.telddd', 'p.tel', 'p.celddd', 'p.cel', {convenio: 'c.convenio'},
            'p.matricula', 'p.vencimento' )
            //condição para mostrar o dados que são iguias na tabelas Pacientes e Convênios
            .whereRaw('?? = ??', ['p.codconvenio', 'c.codigo'])
            //envia os dados como JSON para o backend
            .then(pacientes => res.json(pacientes))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Pacientes e mostrar na página de cadastro do Paciente*/ 
    const getByCodigo = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('pacientes')
            //condição para trazer os dados do cadasto do Médico   
            .where({ codigopac: req.params.codigopac })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(paciente => res.json(paciente))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }
    
    /*Função para remover o cadastro do paciente*/
    const remove = async (req, res) => {
        try {

            //consulta no banco de dados para verificar se o paciente está amarrado com algum atendimento
            const atendimentos = await app.db('atendimentos')
                .where({codpaciente: req.params.codigopac})
                notExistsOrError(atendimentos, "Paciente amarrado a Atendimento")
            
             //caso o paciente não esteja amarrado com algum atendimento, o paciente passado pelo CÓDIGOPAC é excluído do banco de dados
            const rowsDeleted = await app.db('pacientes')
                .where ({ codigopac: req.params.codigopac }).del()
                existsOrError(rowsDeleted, 'Paciente não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }
    //retorna as funções
    return { save, get, getByCodigo, remove}
}