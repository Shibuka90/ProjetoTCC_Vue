//Interface de programção da aplicação Especialidades

module.exports = app => {
    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const especialidade = { ...req.body }
        //Condição de existência da variável codigo do parâmetro da requisição para passar para a variável codigo de especialiadade
        if(req.params.codigo) especialidade.codigo = req.params.codigo
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(especialidade.especialidade, 'Serviço não informado')

            const especialidadeFromDB = await app.db('especialidades')
            .where({ especialidade: especialidade.especialidade }).first()
        
        //codição para verificar se a especialidade existe
        if(!especialidade.especialidade) {
            notExistsOrError(especialidadeFromDB, 'Serviço já cadastrado')
        }
    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    /*Condição de existência de dados na variável codigo, se existir, será feito o update nos dados da Especialidade cadastrada, 
    se não existir, será feito o insert dos dados de cadastro da Especialidade no banco de dados*/ 
    if(especialidade.codigo){
        app.db('especialidades')
            .update(especialidade)
            .where({ codigo: especialidade.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('especialidades')
            .insert(especialidade)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações da tabela  Especialidades para montar a tabela de dados na página de Especialidades*/
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('especialidades')
        //seleciona os dados das tabela Especialidades 
            .select('codigo', 'especialidade' )
            //envia os dados como JSON para o backend
            .then(especialidades => res.json(especialidades))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Especialidades e mostrar na página de cadastro da Especialidade */ 
    const getByCodigo = (req, res) =>{ 
        //faz a conexão com o banco de dados
        app.db('especialidades')
            //condição para trazer os dados do cadasto da Especialidade
            .where({ codigo: req.params.codigo })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(especialidade => res.json(especialidade))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }
  
    /*Função para remover o cadastro da especialidade*/
    const remove = async (req, res) => {
        try {

            existsOrError(req.params.codigo, 'Código da Especialidade não informado...')
            
            //consulta no banco de dados para verificar se a especialidade está amarrada com algum médico
            const medicos = await app.db('medicos')
                .where({codespecialidade: req.params.codigo})
                notExistsOrError(medicos, "Especialidade amarrada a Médico")
            
            //consulta no banco de dados para verificar se a especialidade está amarrada com alguma agenda
            const agendas = await app.db('agendas')
                .where({codespecialidade: req.params.codigo})
                notExistsOrError(agendas, "Especialidade amarrada a Agenda")

            //consulta no banco de dados para verificar se a especialidade está amarrada com algum atendimento
            const atendimentos = await app.db('atendimentos')
            .where({codespecialidade: req.params.codigo})
            notExistsOrError(atendimentos, "Especialidade amarrada a Atendimento")
            
            //caso a especialidade não esteja amarrada com algum médico ou agenda ou atendimento, a especialidade passada pelo CÓDIGO é excluída do banco de dados
            const rowsDeleted = await app.db('especialidades')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Especialidade não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    //retorna as funções
    return { save, getByCodigo, remove, get }
}