//Interface de programção da aplicação Agenda

module.exports = app => {

    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation 

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const agenda = { ...req.body }
        //Condição de existência da variável codigoag do parâmetro da requisição para passar para a variável codigoag de agenda
        if(req.params.codigoag) agenda.codigoag = req.params.codigoag
                
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(agenda.codmedico, 'Código Médico não informado')
            existsOrError(agenda.codespecialidade, 'Código da Especialidade não informada')
            existsOrError(agenda.tempodeatendimento, 'Tempo de Atendimento não informado')
            existsOrError(agenda.horainicial, 'Hora Inicial não informada')
            existsOrError(agenda.horafinal, 'Hora Final não informada')
            existsOrError(agenda.intervaloinicial, 'Inervalo Inical não informado')
            existsOrError(agenda.intervalofinal, 'Inervalo Final não informado')

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    /*Condição de existência de dados na variável codigoag, se existir, será feito o update nos dados da Agenda cadastrada, 
    se não existir, será feito o insert dos dados de cadastro da Agenda no banco de dados*/   
    if(agenda.codigoag){
        app.db('agendas')
            .update(agenda)
            .where({ codigoag: agenda.codigoag })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('agendas')
            .insert(agenda)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações das tabelas Agendas, Médicos e Especialidades para montar a tabela de dados na página de Agendas,
    a tabela Agendas, tem FK(Foreign Key) das tabelas Médicos e Especialidades */
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db({a: 'agendas', m: 'medicos', e: 'especialidades'})
            //seleciona os dados das tabela Agendas, Médicos e Especialidades 
            .select('a.codigoag', 'a.tempodeatendimento', 
            'a.horainicial', 'a.horafinal', 'a.intervaloinicial', 'a.intervalofinal', 
            {medico: 'm.nome'}, {especialidade: 'e.especialidade'})
            //condição para mostrar o dados que são iguias na tabelas Agendas e Médicos
            .whereRaw('?? = ??', ['a.codmedico', 'm.codigomed'])
            //condição para mostrar o dados que são iguias na tabelas Agendas e Especialidades
            .whereRaw('?? = ??', ['a.codespecialidade', 'e.codigo'])
            //envia os dados como JSON para o backend
            .then(agendas => res.json(agendas))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Agendas e mostrar na página de cadastro da Agenda */ 
    const getByCodigo = (req, res) =>{ 
        //faz a conexão com o banco de dados
        app.db('agendas')
            //condição para trazer os dados do cadasto da Agenda
            .where({ codigoag: req.params.codigoag })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(agenda => res.json(agenda))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para remover o cadastro da agenda*/
    const remove = async (req, res) => {
        try {

            //consulta no banco de dados para verificar se a agenda está amarrada com algum agendamento
            const agendamentos = await app.db('agendamentos')
                .where({codagenda: req.params.codigoag})
                notExistsOrError(agendamentos, "Agenda amarrada a Agendamento")
            
            //caso a agenda não esteja amarrada com algum agendamento, a agenda passada pelo CÓDIGOAG é excluída do banco de dados
            const rowsDeleted = await app.db('agendas')
                .where ({ codigoag: req.params.codigoag }).del()
                existsOrError(rowsDeleted, 'Agenda não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }
    
    //retorna as funções 
    return { save, get, getByCodigo, remove}
}