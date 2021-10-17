
exports.up = function(knex) {
    return knex.schema.createTable('prontuarios', table => {
        table.increments('codigo').primary()
        table.string('datadoprontuario')
        table.integer('codigoatendimento').references('codigo').inTable('atendimentos').notNull()
        table.string('paciente', 100).notNull()
        table.string('convenio', 100).notNull()
        table.string('medico', 100).notNull()
        table.string('servico', 100).notNull()
        table.string('especialidade').notNull()
        table.binary('relatorio').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('prontuarios')
};
