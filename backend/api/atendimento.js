//Interface de programção da aplicação Atendimnetos

module.exports = app => {

    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const agenda = { ...req.body }
        //Condição de existência da variável codigoatend do parâmetro da requisição para passar para a variável codigoatend de atendimentos
        const atendimento = { ...req.body }
        if(req.params.codigoatend) atendimento.codigoatend = req.params.codigoatend
               
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(atendimento.codpaciente, 'Código Paciente não informado')
            existsOrError(atendimento.nomepaciente, 'Paciente não informado')
            existsOrError(atendimento.datadoatendimento, 'Data não informada')
            existsOrError(atendimento.codmedico, 'Médico não informado')
            existsOrError(atendimento.convenio, 'Convênio não informado')
            existsOrError(atendimento.codservico, 'Serviço não informado')
            existsOrError(atendimento.codespecialidade, 'Especialidade não informado')
            existsOrError(atendimento.matricula, 'Matricula não informada')
            existsOrError(atendimento.vencimento, 'Vencimento não informado')
            

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    /*Condição de existência de dados na variável codigoatend, se existir, será feito o update nos dados do Atendimento cadastrado, 
    se não existir, será feito o insert dos dados de cadastro do Atendimento no banco de dados*/
    if(atendimento.codigoatend){
        app.db('atendimentos')
            .update(atendimento)
            .where({ codigoatend: atendimento.codigoatend })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('atendimentos')
            .insert(atendimento)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações das tabelas Atendimentos, Serviços, Pacientes,
    Especialdiades e Médicos para montar a tabela de dados na página de Atendimentos,a tabela Atendimentos,
    tem FK(Foreign Key) das tabelas Serviços, Pacientes, Especialdiades e Médicos*/
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db({a: 'atendimentos', s: 'servicos', p: 'pacientes', e: 'especialidades', m: 'medicos'})
            //seleciona os dados das tabela Atendimentos, Serviços, Pacientes, Especialidades e Médicos     
            .select('a.codigoatend','a.codpaciente', 'a.nomepaciente', 'a.datadoatendimento','a.alta', 'a.convenio', 'a.matricula', 'a.vencimento', 
            {servico: 's.servico'}, {especialidade: 'e.especialidade'}, {medico: 'm.nome'})
            //condição para mostrar o dados que são iguias na tabelas Atendimentos e Serviços
            .whereRaw('?? = ??', ['a.codservico', 's.codigo'])
            //condição para mostrar o dados que são iguias na tabelas Atendimentos e Especialidades
            .whereRaw('?? = ??', ['a.codespecialidade', 'e.codigo'])
            //condição para mostrar o dados que são iguias na tabelas Atendimentos e Pacientes
            .whereRaw('?? = ??', ['a.codpaciente', 'p.codigopac'])
            //condição para mostrar o dados que são iguias na tabelas Atendimentos e Médicos
            .whereRaw('?? = ??', ['a.codmedico', 'm.codigomed'])
            //envia os dados como JSON para o backend
            .then(atendimentos => res.json(atendimentos))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Atendimentos e mostrar na página de cadastro da Atendimento */ 
    const getByCodigo = (req, res) =>{
        //faz a conexão com o banco de dados
        app.db('atendimentos')
        //condição para trazer os dados do cadasto do Atendimento
            .where({ codigoatend: req.params.codigoatend })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(atendimento => res.json(atendimento))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    const alta = async (req, res) => {
        try {
            
            //Deleta somente o atendimento passado pelo CODIGOATEND
            const rowsUpdate = await app.db('atendimentos')
                .update({ alta: new Date() })
                .where({ codigoatend: req.params.codigoatend })
        existsOrError(rowsUpdate, 'Atendimento não foi encontrado.')
        
        res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, alta}
}