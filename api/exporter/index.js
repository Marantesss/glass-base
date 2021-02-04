const fs = require('fs')
const knex = require('../knex')

const objectArrayToCSV = (arr) => {
  // create column names from object keys
  const columnNames = Object.keys(arr[0])
  // create array of arrays from object values
  const columnValues = arr.map((row) => Object.values(row))
  // concat with contract objects
  const csvArray = [...[columnNames], ...columnValues]
  // join everything with '""', ',' and '\n'
  const csvString = csvArray.map((row) => (
    row.map((elem) => (elem ? `"${elem}"` : '""'))
  ).join(',')).join('\n')

  return csvString
}

const contractsToCSV = async (numberOfContracts = 1000, filename = 'contracts.csv') => {
  // fetch contracts
  const contracts = await knex('contract')
    .orderBy('publicationDate', 'desc')
    .limit(numberOfContracts)

  const csvString = objectArrayToCSV(contracts)

  // write fo file
  try {
    fs.writeFileSync(filename, csvString)
  } catch (error) {
    console.error(error)
  }

  return contracts
}

const entitiesContractedToCSV = async (contracts, filename = 'entitiesContracted.csv') => {
  const contractIds = contracts.map((contract) => contract.id)
  // fetch all entities contracted in these contracts
  const entities = await knex('entityContracted')
    .select('entityContracted.contractId', 'entity.nif', 'entity.description', 'entity.createdAt')
    .whereIn('contractId', contractIds)
    .join('entity', 'entityContracted.entityNif', 'entity.nif')

  const csvString = objectArrayToCSV(entities)

  // write fo file
  try {
    fs.writeFileSync(filename, csvString)
  } catch (error) {
    console.error(error)
  }

  return entities
}

const entitiesContractorToCSV = async (contracts, filename = 'entitiesContractor.csv') => {
  const contractIds = contracts.map((contract) => contract.id)
  // fetch all entities contracted in these contracts
  const entities = await knex('entityContractor')
    .select('entityContractor.contractId', 'entity.nif', 'entity.description', 'entity.createdAt')
    .whereIn('contractId', contractIds)
    .join('entity', 'entityContractor.entityNif', 'entity.nif')

  const csvString = objectArrayToCSV(entities)

  // write fo file
  try {
    fs.writeFileSync(filename, csvString)
  } catch (error) {
    console.error(error)
  }

  return entities
}

const main = async () => {
  const contracts = await contractsToCSV()
  await entitiesContractedToCSV(contracts)
  await entitiesContractorToCSV(contracts)

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
