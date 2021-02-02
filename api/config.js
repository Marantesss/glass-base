
const dotenv = require('dotenv');

dotenv.config();

const config = {};

config.express = {
  port: process.env.PORT || 8000,
  timeout: 20000,
  maxAge: 600,
};

config.database = {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    pass: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    dbName:process.env.DB_DATABASE,
  },
};

config.seeder = {
  numberOfContracts: 1265000,
  step: 100,
  url: 'http://www.base.gov.pt/base2/rest/contratos/',
};

module.exports = config;
