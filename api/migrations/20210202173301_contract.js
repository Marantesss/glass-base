// https://www.postgresql.org/docs/9.1/datatype-character.html
// on string vs text
// "There is no performance difference among these
// three types, apart from increased storage space..."
exports.up = (knex) => knex.schema.createTable('contract', (table) => {
  // IMPORTANT STUFF
  table.integer('id').unsigned().notNullable().primary()
  table.float('initialContractualPrice', 2).notNullable() // precision = 2
  table.float('totalEffectivePrice', 2) // precision = 2
  table.date('publicationDate').notNullable()
  table.date('signingDate')
  table.text('cpvs')
  table.text('directAwardFundamentationType')
  table.text('contractFundamentationType')
  table.text('contractTypes')
  table.text('contractingProcedureType')
  table.text('executionPlace')
  table.text('description')
  table.text('endOfContractType')
  table.text('executionDeadline')
  // create created at column
  table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now())

  // TODO Not so important stuff
})

exports.down = (knex) => knex.schema
  .dropTable('contract')
