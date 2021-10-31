//Interface de programção da aplicação Agendamento

module.exports = app => {

    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const agendamento = { ...req.body }
        //Condição de existência da variável codigo do parâmetro da requisição para passar para a variável codigoa de agendamento
        if(req.params.codigo) agendamento.codigo = req.params.codigo
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(agendamento.codagenda, 'Código Agenda não informado')
            existsOrError(agendamento.agenda, 'Agenda não informado')
            existsOrError(agendamento.dataagendamento, 'Data não informado')
            existsOrError(agendamento.horario, 'Horário não informado')
            existsOrError(agendamento.paciente, 'Horário não informado')
            existsOrError(agendamento.codservico, 'Serviço não informada')
                       

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    /*Condição de existência de dados na variável codigo, se existir, será feito o update nos dados do Agendamento cadastrado, 
    se não existir, será feito o insert dos dados de cadastro do Agendamento no banco de dados*/
    if(agendamento.codigo){
        app.db('agendamentos')
            .update(agendamento)
            .where({ codigo: agendamento.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('agendamentos')
            .insert(agendamento)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações das tabelas Agendamentos para montar a tabela de dados na página de Agendamentos,
    a tabela Agendas, tem FK(Foreign Key) da tabela Serviços */
    const get = (req, res) => {   
        //faz a conexão com o banco de dados   
        app.db({a: 'agendamentos', s: 'servicos'})
            //seleciona os dados das tabela Agendamentos e Serviços 
            .select('a.codigo', 'a.horario', 'a.dataagendamento', 
            'a.codagenda', 'a.agenda', 'a.paciente', {servico: 's.servico'})
            //condição para mostrar o dados que são iguias na tabelas Agendamentos e Serviços
            .whereRaw('?? = ??', ['a.codservico', 's.codigo'])
            //envia os dados como JSON para o backend
            .then(agendas => res.json(agendas))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Agendamentos e mostrar na página de cadastro do Agendamento */ 
    const getByCodigo = (req, res) =>{
        //faz a conexão com o banco de dados
        app.db('agendamentos')
        //condição para trazer os dados do cadasto do Agendaemnto
            .where({ codigo: req.params.codigo })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(agendamento => res.json(agendamento))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para remover o cadastro do agendamento*/
    const remove = async (req, res) => {
        try {

            //Deleta somente o agendamento informado pelo CODIGO
            const rowsDeleted = await app.db('agendamentos')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Agendamento não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    //retorna as funções 
    return { save, get, getByCodigo, remove}
}