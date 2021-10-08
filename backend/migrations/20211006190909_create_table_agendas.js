
exports.up = function(knex) {
    return knex.schema.createTable('agendas', table => {
        table.increments('codigo').primary()
        table.integer('codigomedico').references('codigo').inTable('medicos').notNull()
        table.string('medico', 100).notNull()
        table.string('tempodeatendimento', 2).notNull()
        table.time('horainicial').notNull()
        table.time('horafinal').notNull()
        table.time('intervaloinicial').notNull()
        table.time('intervalofinal').notNull()
        table.integer('codigoespecialidade').references('codigo').inTable('especialidades').notNull()
        table.string('especialidade').notNull()
        // table.string('domingo')
        // table.string('segunda')
        // table.string('terca')
        // table.string('quarta')
        // table.string('quinta')
        // table.string('sexta')
        // table.string('sabado')       
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('agendas')
};
