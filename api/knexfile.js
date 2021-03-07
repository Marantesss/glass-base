const pg = require('pg')
const { database } = require('./config.js')

pg.defaults.ssl = {
  rejectUnauthorized: false,
}

module.exports = {
  development: {
    client: database.client,
    connection: {
      host: database.host,
      database: database.database,
      user: database.user,
      password: database.password,
      port: database.port,
    },
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
    ssl: { rejectUnauthorized: false },
    // ssl: 'no-verify', // try this if above does not work for you
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
