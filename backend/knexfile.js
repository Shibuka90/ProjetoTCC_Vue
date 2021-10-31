//Armazena a configuração da conexão com o bando de dados

const { db } = require('./.env')

module.exports = {

    client: 'postgresql',
    connection: db,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 };
