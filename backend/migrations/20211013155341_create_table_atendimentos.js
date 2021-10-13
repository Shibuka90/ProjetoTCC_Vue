
exports.up = function(knex) {
    return knex.schema.createTable('atendimentos', table => {
        table.increments('codigo').primary()
        table.time('datadoatendimento')
        table.integer('codigopaciente').references('codigo').inTable('pacientes').notNull()
        table.string('paciente', 100).notNull()
        table.string('convenio', 100).notNull()
        table.string('medico', 100).notNull()
        table.string('servico', 100).notNull()
        table.string('especialidade').notNull() 
        table.string('matricula').notNull()
        table.string('vencimento').notNull()
        table.timestamp('deletedAt')
        table.timestamp('alta')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('atendimentos')
};
