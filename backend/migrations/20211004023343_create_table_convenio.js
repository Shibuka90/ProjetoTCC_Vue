
//Cria a tabela ConvĂȘnios

exports.up = function(knex) {
    return knex.schema.createTable('convenios', table => {
        table.increments('codigo').primary()
        table.string('convenio', 100).notNull()
    })
};


//Exclui a tabela ConvĂȘnios
exports.down = function(knex) {
  return knex.schema.dropTable('convenios')
};