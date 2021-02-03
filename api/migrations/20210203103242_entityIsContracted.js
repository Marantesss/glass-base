exports.up = (knex) => knex.schema.createTable('entityIsContracted', (table) => {
  table.integer('entityId').unsigned().references('id').inTable('entity')
  table.integer('contractId').unsigned().references('id').inTable('contract')
  // composite primary key
  table.primary(['entityId', 'contractId'])
})

exports.down = (knex) => knex.schema
  .dropTable('entityIsContracted')
