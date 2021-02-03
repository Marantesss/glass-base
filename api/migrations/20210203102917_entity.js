exports.up = (knex) => knex.schema.createTable('entity', (table) => {
  // table.integer('id').unsigned().notNullable().primary()
  // nif should be unique but some entities have the same
  // nif with different id's... blame base.gov
  table.string('nif').notNullable().primary() // .unique()
  table.text('description').notNullable()
  table.text('location')
})

exports.down = (knex) => knex.schema
  .dropTable('entity')
