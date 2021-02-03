exports.up = (knex) => knex.schema.createTable('entityIsContracted', (table) => {
  table.string('entityNif').unsigned().references('nif').inTable('entity')
  table.integer('contractId').unsigned().references('id').inTable('contract')
  // composite primary key
  table.primary(['entityNif', 'contractId'])
})

exports.down = (knex) => knex.schema
  .dropTable('entityIsContracted')
