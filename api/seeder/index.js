const axios = require('axios')
const { seeder, database } = require('./../config');

/* Database*/
const mongoose = require('mongoose');
// connect to the database
mongoose.connect(`${database.host}:${database.port}/${database.database}`, database.options);
// some event listeners for console feedback
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', console.log('Database connection complete!'));


// 2.4 fetching hours
const numberOfContracts = seeder.numberOfContracts
const step = seeder.step
const url = seeder.url

const headers = {
  Range: `${numberOfContracts}-${numberOfContracts + 1}`
}

const options = {
  method: 'GET',
  headers,
  url,
}


const main = async () => {
  for (let index = 30000; index < 60000; index += step) {
    // update header
    options.headers.Range = `${index}-${index + step - 1}`

    const response = await axios(options);
    const publicationDate = response.data[response.data.length - 1].publicationDate
    const signingDate = response.data[response.data.length - 1].signingDate
    const contractType = response.data[response.data.length - 1].contractingProcedureType
    console.log(`${index} => pub: ${publicationDate}, sig: ${signingDate}, type: ${contractType}`)
  }

  return 'bananas'
}

main()
  .then((ret) => console.log(ret))
  .catch((err) => console.log(error))

