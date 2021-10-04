
exports.up = function(knex) {
    return knex.schema.createTable('convenios', table => {
        table.increments('codigo').primary()
        table.string('convenio', 100).notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('convenios')
};