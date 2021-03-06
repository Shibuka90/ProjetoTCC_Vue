//Cria a tabela Prontuários


exports.up = function(knex) {
    return knex.schema.createTable('prontuarios', table => {
        table.increments('codigopront').primary()
        table.string('datadoprontuario')
        table.integer('codatendimento').references('codigoatend').inTable('atendimentos').notNull()
        table.string('paciente', 100).notNull()
        table.string('convenio', 100).notNull()
        table.string('medico', 100).notNull()
        table.string('servico', 100).notNull()
        table.string('especialidade').notNull()
        table.string('relatorio', 10000).notNull()
    })
};


//Exclui a tabela Prontuários
exports.down = function(knex) {
    return knex.schema.dropTable('prontuarios')
};
