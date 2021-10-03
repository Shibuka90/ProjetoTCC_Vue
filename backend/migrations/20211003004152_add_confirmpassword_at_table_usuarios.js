
exports.up = function(knex) {
    return knex.schema.alterTable('usuarios', table => {
        table.string('confirmpassword')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('usuarios', table => {
        table.dropColumn('confirmpassword')
    })
  };