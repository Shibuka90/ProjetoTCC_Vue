
exports.up = function(knex) {
    return knex.schema.createTable('atendimentos', table => {
        table.increments('codigoatend').primary()
        table.string('datadoatendimento')
        table.integer('codpaciente').references('codigopac').inTable('pacientes').notNull()
        table.string('nomepaciente',100).notNull()
        table.integer('codmedico').references('codigomed').inTable('medicos').notNull()
        table.integer('codservico').references('codigo').inTable('servicos').notNull()
        table.integer('codespecialidade').references('codigo').inTable('especialidades').notNull() 
        table.string('convenio', 50).notNull()
        table.string('matricula',25).notNull()
        table.string('vencimento',10).notNull()
        table.boolean('censo').notNull().defaultTo(true)
        table.timestamp('alta')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('atendimentos')
};
