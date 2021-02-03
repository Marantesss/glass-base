exports.up = (knex) => knex.schema.createTable('document', (table) => {
  table.integer('id').unsigned().notNullable().primary()
  table.string('description').notNullable()
  table.integer('contractId').unsigned().references('id').inTable('contract')
})

exports.down = (knex) => knex.schema
  .dropTable('document')
