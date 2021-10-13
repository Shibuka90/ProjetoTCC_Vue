exports.up = function(knex) {
    return knex.schema.createTable('agendamentos', table => {
        table.increments('codigo').primary()
        table.time('horario').notNull()
        table.string('dataagendamento',10).notNull()
        table.integer('codigoagenda').references('codigo').inTable('agendas').notNull()
        table.integer('codigomedico').references('codigo').inTable('medicos').notNull()
        table.string('medico', 100).notNull()
        table.integer('codigopaciente').references('codigo').inTable('pacientes').notNull()
        table.string('paciente',100).notNull
        table.integer('codigoservico').references('codigo').inTable('servicos').notNull()
        table.string('servico',100).notNull
        table.binary('observacao')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('agendamentos')
};
