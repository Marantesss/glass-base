const fs = require('fs')
const knex = require('../knex')

const contractsToCSV = async (numberOfContracts = 1000, filename = 'contracts.csv') => {
  // fetch contracts
  const contracts = await knex('contract')
    .orderBy('publicationDate', 'desc')
    .limit(numberOfContracts)

  // create column names from object keys
  const columnNames = Object.keys(contracts[0])
  // create array of arrays from object values
  const columnValues = contracts.map((row) => Object.values(row))
  // concat with contract objects
  const csvArray = [...[columnNames], ...columnValues]
  // join everything with ',' and '\n'
  const csvString = csvArray.map((row) => row.join(',')).join('\n')

  // write fo file
  try {
    fs.writeFileSync(filename, csvString)
  } catch (error) {
    console.error(error)
  }
}


const main = async () => {
  await contractsToCSV()

  return 'Success'
}

main()
  .then((ret) => {
    console.log(ret)
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
