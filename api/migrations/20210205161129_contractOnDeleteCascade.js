exports.up = async (knex) => {
  // Firstly, remove FOREIGN KEY attribute of former FOREIGN KEY
  await Promise.all([
    knex.schema.alterTable('entityContracted', (table) => {
      table.dropForeign('contractId')
    }),
    knex.schema.alterTable('entityContractor', (table) => {
      table.dropForeign('contractId')
    }),
  ])

  // Add new foreign keys
  // SET NULL because we might still want to see how many
  // entities participated in the contract
  await Promise.all([
    knex.schema.alterTable('entityContracted', (table) => {
      table.integer('contractId')
        .unsigned()
        .references('id')
        .inTable('contract')
        .onDelete('SET NULL')
        .alter()
    }),
    knex.schema.alterTable('entityContractor', (table) => {
      table.integer('contractId')
        .unsigned()
        .references('id')
        .inTable('contract')
        .onDelete('SET NULL')
        .alter()
    }),
  ])
}

exports.down = async (knex) => {
  // Firstly, remove FOREIGN KEY attribute of former FOREIGN KEY
  await Promise.all([
    knex.schema.alterTable('entityContracted', (table) => {
      table.dropForeign('contractId')
    }),
    knex.schema.alterTable('entityContractor', (table) => {
      table.dropForeign('contractId')
    }),
  ])
  // Add new foreign keys
  await knex.schema.alterTable('entityContracted', (table) => {
    table.integer('contractId')
      .unsigned()
      .references('id')
      .inTable('contract')
      .onDelete('NO ACTION')
      .alter()
  })

  await knex.schema.alterTable('entityContractor', (table) => {
    table.integer('contractId')
      .unsigned()
      .references('id')
      .inTable('contract')
      .onDelete('NO ACTION')
      .alter()
  })
}
