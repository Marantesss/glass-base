exports.up = (knex) => knex.schema.createTable('contract', (table) => {
  // IMPORTANT STUFF
  table.integer('id').unsigned().notNullable().primary()
  table.float('initialContractualPrice', 2).notNullable() // precision = 2
  table.float('totalEffectivePrice', 2) // precision = 2
  table.date('publicationDate').notNullable()
  table.date('signingDate')
  table.string('cpvs')
  table.string('directAwardFundamentationType')
  table.string('contractTypes')
  table.string('contractingProcedureType')
  table.string('executionPlace')
  table.text('description')
  table.string('endOfContractType')
  table.string('executionDeadline')
  // create created at column
  table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now())

  // TODO Not so important stuff
})

exports.down = (knex) => knex.schema
  .dropTable('contract')
