//Cria a tabela Especialidades

exports.up = function(knex) {
    return knex.schema.createTable('especialidades', table => {
        table.increments('codigo').primary()
        table.string('especialidade', 100).notNull()
    })
};

//Exclui a tabela Especialidade
exports.down = function(knex) {
  return knex.schema.dropTable('especialidades')
};
