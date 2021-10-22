exports.up = function(knex) {
    return knex.schema.createTable('agendamentos', table => {
        table.increments('codigo').primary()
        table.integer('codigoagenda').references('codigo').inTable('agendas').notNull()
        table.string('agenda', 100).notNull()
        table.string('dataagendamento',10).notNull()
        table.time('horario').notNull()
        table.string('paciente',100).notNull
        table.string('servico',100).notNull
        table.string('observacao')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('agendamentos')
};
