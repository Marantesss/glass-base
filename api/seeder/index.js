const axios = require('axios')
const { seeder } = require('./../config');

/* Database */
// start connection
require('./../mongoose')
// models
const { contract, entity } = require('./../models')

/* seeders */
const {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract
} = require('./contract')
const { fetchSpecificEntity } = require('./entity')

const numberOfContracts = 100 || seeder.numberOfContracts
const step = seeder.step

const getContracts = async () => {
  // clean up collection
  await contract.deleteMany({})
  console.log('Contract collection cleared')

  for (let index = 0; index < numberOfContracts; index += step) {
    // fetch 'step' contracts
    const contracts = await fetchGeneralContracts(index);
    // fetch specific information for all contracts
    const cleanContracts = []
    for (const id of contracts) {
      const contractData = await fetchSpecificContract(id)
      // clean contract
      cleanContract(contractData)
      cleanContracts.push(contractData)
    }
    console.log(`Fetched contracts from ${index} to ${index + step}`)
    // bulk save contracts
    await contract.insertMany(cleanContracts)
    console.log(`Saved contracts from ${index} to ${index + step}`)
  }
}

const getEntities = async () => {
  // clean up collection
  await entity.deleteMany({})
  console.log('Entity collection cleared')

  const queryPromises = [];
  // fetch all unique entity ids for contracted
  queryPromises.push(contract.find()
    .distinct('contracted')
    .exec()
  )
  // fetch all unique entity ids for contracting
  queryPromises.push(contract.find()
    .distinct('contracting')
    .exec()
  )

  // wait for queries to finish
  const [contracted, contracting] = await Promise.all(queryPromises)

  // union of the two arrays (no duplicates with set)
  const entities = [...new Set([...contracted, ...contracting])]
  const entityObjects = []
  for (const id of entities) {
    const entityData = await fetchSpecificEntity(id)
    console.log(entityData)
    // clean contract
    entityObjects.push(entityData)
  }
  // save do collection
  await entity.insertMany(entityObjects)
  console.log(entities)
}

const main = async () => {
  //await getContracts()
  await getEntities()

  return 'Success'
}

main()
  .then(ret => {
    console.log(ret)
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

