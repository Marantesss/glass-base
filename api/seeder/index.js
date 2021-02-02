const axios = require('axios')
const { seeder } = require('./../config');

/* Database */
// start connection
require('./../mongoose')
// models
const { contract } = require('./../models')

/* seeders */
const {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract
} = require('./contract')

const numberOfContracts = 100 || seeder.numberOfContracts
const step = seeder.step

const main = async () => {
  // clean up collection
  await contract.deleteMany({})
  console.log('Contracts collection cleared')

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

