
///Cria a tabela Agendas
exports.up = function(knex) {
    return knex.schema.createTable('agendas', table => {
        table.increments('codigoag').primary()
        table.integer('codmedico').references('codigomed').inTable('medicos').notNull()
        table.string('nomemedico').notNull()
        table.string('tempodeatendimento', 2).notNull()
        table.time('horainicial').notNull()
        table.time('horafinal').notNull()
        table.time('intervaloinicial').notNull()
        table.time('intervalofinal').notNull()
        table.integer('codespecialidade').references('codigo').inTable('especialidades').notNull()
    })
};

//Exclui a tabela Agendas
exports.down = function(knex) {
    return knex.schema.dropTable('agendas')
};
