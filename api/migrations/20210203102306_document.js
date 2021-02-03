exports.up = (knex) => knex.schema.createTable('document', (table) => {
  table.integer('id').unsigned().notNullable().primary()
  table.string('description').notNullable()
  table.integer('contractId').unsigned().references('id').inTable('contract')

  table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now())
})

exports.down = (knex) => knex.schema
  .dropTable('document')
