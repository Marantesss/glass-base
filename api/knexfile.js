const { database } = require('./config.js')

module.exports = {
  development: {
    client: database.client,
    connection: database.database_url,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: database.client,
    connection: database.database_url,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
