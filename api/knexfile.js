const { database } = require('./config.js')

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
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
