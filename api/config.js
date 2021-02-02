const dotenv = require('dotenv')

dotenv.config()

const config = {}

config.express = {
  port: process.env.PORT || 8000,
  timeout: 20000,
  maxAge: 600,
}

config.database = {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

config.seeder = {
  numberOfContracts: 1265000,
  step: 100,
  url: 'http://www.base.gov.pt/base2/rest/',
}

module.exports = config
