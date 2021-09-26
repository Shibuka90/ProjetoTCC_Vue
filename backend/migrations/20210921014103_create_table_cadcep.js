exports.up = function(knex) {
    return knex.schema.createTable('cadcep', table => {
        table.string('cep', 9).notNull()
        table.string('tipologradouro', 15).notNull()
        table.string('logradouro', 100).notNull()
        table.string('bairro', 100).notNull()
        table.string('municipio', 100).notNull()
        table.string('uf', 2).notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cadcep')
};
