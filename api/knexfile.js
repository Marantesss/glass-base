const { database } = require('./config.js')

module.exports = {
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
    propagateCreateError: false,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}
