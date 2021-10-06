exports.up = function(knex) {
    return knex.schema.createTable('pacientes', table => {
        table.increments('codigo').primary()
        table.string('nome', 50).notNull()
        table.string('email', 50).notNull().unique()
        table.string('cpf', 14).notNull().unique()
        table.string('datanasc', 10).notNull()
        table.string('estadocivil', 20).notNull()
        table.string('sexo',2).notNull()
        table.string('mae', 50).notNull()
        table.string('pai', 50).notNull()
        table.string('ceppaciente',9).notNull()
        table.string('tipo',15).notNull()
        table.string('endereco', 100).notNull()
        table.string('numero',5).notNull()
        table.string('complemento', 20)
        table.string('bairro', 100).notNull()
        table.string('municipio', 100).notNull()
        table.string('ufmunicipio',2).notNull()
        table.string('telddd',4)
        table.string('tel',9)
        table.string('celddd',4).notNull()
        table.string('cel', 10).notNull()
        table.string('convenio', 100).notNull()
        table.string('matricula', 30).notNull()
        table.string('vencimento', 10).notNull()
        
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pacientes')
  };


  // table.increments('codigo').primary()
  // table.integer('codigomedico').references('codigo').inTable('medicos').notNull()
  // table.string('medico', 50).notNull()
  // table.string('tipodaagenda', 20).notNull()
  // table.string('diasdasemana', 2).notNull()  
  // table.timestamp('tempodeatendimento', 10 ).notNull()
  // table.timestamp('periodo', 30 ).notNull()
  // table.timestamp('inntervalo', 30).notNull()
  // table.integer('codigoservico').references('codigo').inTable('servicos').notNull()
  // table.string('servico', 100).notNull()
  // table.integer('codigoespecialidade').references('codigo').inTable('especialidades').notNull()
  // table.string('especialidade').notNull()
