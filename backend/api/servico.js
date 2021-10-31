//Interface de programção da aplicação Serviço

module.exports = app => {
     //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const servico = { ...req.body }
        //Condição de existência da variável codigo do parâmetro da requisição para passar para a variável codigo do serviço
        if(req.params.codigo) servico.codigo = req.params.codigo
                
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(servico.servico, 'Serviço não informado')

            const servicoFromDB = await app.db('servicos')
            .where({ servico: servico.servico }).first()
        
        //codição para verificar se servico existe
        if(!servico.servico) {
            notExistsOrError(servicoFromDB, 'Serviço já cadastrado')
        }
    } catch(msg) {
        return res.status(400).send(msg)
    }
  
    /*Condição de existência de dados na variável codigo, se existir, será feito o update nos dados do Serviço cadastrado, 
    se não existir, será feito o insert dos dados de cadastro do Serviço no banco de dados*/
    if(servico.codigo){
        app.db('servicos')
            .update(servico)
            .where({ codigo: servico.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('servicos')
            .insert(servico)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações da tabela Serviços para montar a tabela de dados na página de Serviços*/
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('servicos')
            //seleciona os dados das tabela Serviços
            .select('codigo', 'servico' )
            //envia os dados como JSON para o backend
            .then(servicos => res.json(servicos))
             //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Serviços e mostrar na página de cadastro do Serviço */ 
    const getByCodigo = (req, res) =>{ 
        //faz a conexão com o banco de dados
        app.db('servicos')
            //condição para trazer os dados do cadasto do Serviço
            .where({ codigo: req.params.codigo })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(servico => res.json(servico))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para remover o cadastro do serviço*/
    const remove = async (req, res) => {
        try {

            existsOrError(req.params.codigo, 'Código do Serviço não informado...')           
            
            //consulta no banco de dados para verificar se o serviço está amarrado com algum atendimento
            const atendimentos = await app.db('atendimentos')
            .where({codservico: req.params.codigo})
            notExistsOrError(atendimentos, "Serviço amarrado a Atendimento")
            
            //consulta no banco de dados para verificar se o serviço está amarrado com algum agendamento
            const agendamentos = await app.db('agendamentos')
            .where({codservico: req.params.codigo})
            notExistsOrError(agendamentos, "Serviço amarrado a Agendamento")

            //caso o serviço não esteja amarrado com algum agendamento ou atendimento, o serviço passada pelo CÓDIGO é excluído do banco de dados
            const rowsDeleted = await app.db('servicos')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Serviço não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}

