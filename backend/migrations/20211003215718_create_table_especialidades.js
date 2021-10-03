exports.up = function(knex) {
    return knex.schema.createTable('especialidades', table => {
        table.increments('codigo').primary()
        table.string('especialidades', 100).notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('especialidades')
};
