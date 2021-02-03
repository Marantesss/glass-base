const dotenv = require('dotenv')

dotenv.config()

const config = {}

config.express = {
  port: process.env.PORT || 8000,
  timeout: 20000,
  maxAge: 600,
}

config.database = {
  client: process.env.DB_CLIENT || 'postgresql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_DATABASE || 'postgres',
  user: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'password',
}

config.seeder = {
  numberOfContracts: 1265000,
  step: 100,
  url: 'http://www.base.gov.pt/base2/rest',
}

module.exports = config
