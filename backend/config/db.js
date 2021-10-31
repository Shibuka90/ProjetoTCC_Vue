//Interface de programção da aplicação de Conexão com Bando de dados

const config = require('../knexfile.js')//inporta as configurações do arquivo knex
const knex = require('knex')(config)//importa as configurações do knex e do config

module.exports = knex