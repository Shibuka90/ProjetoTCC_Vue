//Cria a tabela Serviços

exports.up = function(knex) {
    return knex.schema.createTable('servicos', table => {
        table.increments('codigo').primary()
        table.string('servico', 100).notNull()
    })
};


//Exclui a tabela Serviços

exports.down = function(knex) {
  return knex.schema.dropTable('servicos')
};
