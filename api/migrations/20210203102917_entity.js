exports.up = (knex) => knex.schema.createTable('entity', (table) => {
  table.integer('id').unsigned().notNullable().primary()
  table.string('nif').notNullable().unique()
  table.string('description').notNullable()
  table.string('location')
})

exports.down = (knex) => knex.schema
  .dropTable('entity')
