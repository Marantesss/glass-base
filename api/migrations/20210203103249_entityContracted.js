exports.up = (knex) => knex.schema.createTable('entityContracted', (table) => {
  table.string('entityNif').unsigned().references('nif').inTable('entity')
  table.integer('contractId').unsigned().references('id').inTable('contract')
  // composite primary key
  table.primary(['entityNif', 'contractId'])

  table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now())
})

exports.down = (knex) => knex.schema.dropTable('entityContracted')
