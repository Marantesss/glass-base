/*
We ended up creating these two migrations because we found out that
sometimes, when a foreign entity is hired the 'nif' column value is a
single space string (" "). When 2 foreign entities share the same contract
we get a database unique constraint violation. Because we used to have
a composite key ('entityNif', 'contractId'), if 'entityNif' = " " and
'contractId' is the same.

We found this on contract with id: 635915

NOTE: Sometimes foreign entities have a random value for the NIF column
*/

exports.up = async (knex) => {
  // Firstly, remove PRIMARY KEY attribute of former PRIMARY KEY
  await knex.schema.alterTable('entityContractor', (table) => {
    table.dropPrimary('')
  })

  await knex.schema.alterTable('entityContractor', (table) => {
    table.increments('id').primary()
  })
}

exports.down = async (knex) => {
  await knex.schema.alterTable('entityContractor', (table) => {
    table.dropPrimary()
  })

  await knex.schema.alterTable('entityContractor', (table) => {
    table.dropColumn('id')
    table.primary(['entityNif', 'contractId'])
  })
}
