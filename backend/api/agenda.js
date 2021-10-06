exports.up = function(knex) {
    return knex.schema.createTable('agendas', table => {
       
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('agendas')
  };