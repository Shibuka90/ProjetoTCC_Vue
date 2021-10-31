//Interface de programção da aplicação Convênio

module.exports = app => {
    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
            //Variável agenda que armazena todos os dados que estão no corpo da página
            const convenio = {...req.body}
         //Condição de existência da variável codigo do parâmetro da requisição para passar para a variável codigo de convenio  
        if(req.params.codigo) convenio.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/convenios')) especialidade.admin = false
        // if(!req.convenio || !req.convenio.admin) especialidade.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(convenio.convenio, 'Convênio não informado')

            const convenioFromDB = await app.db('convenios')
            .where({ convenio: convenio.convenio }).first()
        if(!convenio.convenio) {
            notExistsOrError(convenioFromDB, 'Convênio já cadastrado')
        }
    } catch(msg) {
        return res.status(400).send(msg)
    }         
    
    /*Condição de existência de dados na variável codigo, se existir, será feito o update nos dados do Convênio cadastrado, 
    se não existir, será feito o insert dos dados de cadastro do Convênio no banco de dados*/ 
    if(convenio.codigo){
        app.db('convenios')
            .update(convenio)
            .where({ codigo: convenio.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('convenios')
            .insert(convenio)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações da tabela Convênio */
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('convenios')
            //seleciona os dados das tabela Convênios
            .select('codigo', 'convenio' )
            //envia os dados como JSON para o backend
            .then(convenios => res.json(convenios))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Convênios e mostrar na página Convênios */
    const getByCodigo = (req, res) =>{ 
        //faz a conexão com o banco de dados
        app.db('convenios')
            //condição para trazer os dados do cadasto do Convênio
            .where({ codigo: req.params.codigo })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(convenio => res.json(convenio))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para remover o cadastro do convênio*/
    const remove = async (req, res) => {
        try {

            existsOrError(req.params.codigo, 'Código do Convênio não informado...')

            //consulta no banco de dados para verificar se o convênio está amarrado com algum paciente
            const pacientes = await app.db('pacientes')
                .where({codconvenio: req.params.codigo})
                notExistsOrError(pacientes, "Convênio amarrado a Paciente")

            //caso o convênio não esteja amarrado com algum paciente, o convênio passado pelo CÓDIGO é excluído do banco de dados
            const rowsDeleted = await app.db('convenios')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Convênio não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }
    //retorna as funções
    return { save, get, getByCodigo, remove}
}

