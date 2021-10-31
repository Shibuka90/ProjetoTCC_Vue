//Cria a tabela Agendamentos

exports.up = function(knex) {
    return knex.schema.createTable('agendamentos', table => {
        table.increments('codigo').primary()
        table.integer('codagenda').references('codigoag').inTable('agendas').notNull()
        table.string('agenda',100).notNull()
        table.string('dataagendamento',10).notNull()
        table.time('horario').notNull()
        table.string('paciente',100).notNull()
        table.integer('codservico').references('codigo').inTable('servicos').notNull()
        table.string('observacao',10000)
    })
};

//Exclui a tabela Agendamentos
exports.down = function(knex) {
    return knex.schema.dropTable('agendamentos')
};
