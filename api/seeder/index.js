const { seeder } = require('../config')
const knex = require('../knex')

/* seeders */
const {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract,
} = require('./contract')

const numberOfContracts = 1025000 || seeder.numberOfContracts
const startRange = 1005000
const { step } = seeder

const getContracts = async () => {
  for (let index = startRange; index < numberOfContracts; index += step) {
    // fetch 'step' contracts
    const contracts = await fetchGeneralContracts(index)

    const cleanContracts = []
    const cleanDocuments = []
    const cleanContracted = []
    const cleanContracting = []
    // fetch specific information for all contracts
    // IMPORTANT: We could have done this asynchronously but
    // the base.gov.pt api does not handle multiple requests well
    // eslint-disable-next-line no-restricted-syntax
    for (const { id } of contracts) {
      const contractData = await fetchSpecificContract(id)
      console.log(`Fetched contract ${id}!`)
      // clean contract
      const {
        contracted, contracting, documents, ...restOfContract
      } = cleanContract(contractData)
      console.log(contractData)
      // store stuff in array
      cleanContracted.push(...contracted)
      cleanContracting.push(...contracting)
      cleanDocuments.push(...documents)
      cleanContracts.push(restOfContract)
    }
    console.log(`Fetched contracts from ${index} to ${index + step}!`)

    // save contracts
    await knex('contract').insert(cleanContracts)
    console.log(`Saved ${cleanContracts.length} new contracts!`)

    // save documents
    await knex('document').insert(cleanDocuments)
    console.log(`Saved ${cleanDocuments.length} new documents!`)

    // get all 'new' entities (non duplicates)
    const uniqueEntityIds = new Set()
    const uniqueEntities = [...cleanContracted, ...cleanContracting].filter((entity) => {
      const duplicate = uniqueEntityIds.has(entity.id)
      uniqueEntityIds.add(entity.id)
      return !duplicate
    })
    // fetch any duplicate entities on db
    const duplicateEntitiesIds = await knex('entity')
      .whereIn('id', [...uniqueEntityIds])
      .pluck('id')
    // remove duplicate keys
    const cleanEntities = uniqueEntities.filter(
      (entity) => !duplicateEntitiesIds.includes(entity.id),
    )
    // save entities
    await Promise.all(cleanEntities.map(async ({ contractId, ...restOfEntity }) => {
      await knex('entity').insert(restOfEntity)
    }))
    console.log(`Saved ${cleanEntities.length} new entities!`)

    // save contracted entities
    await Promise.all(cleanContracted.map(async ({ contractId, id: entityId }) => {
      await knex('entityIsContracted').insert({ contractId, entityId })
    }))
    console.log(`Saved ${cleanContracted.length} new entities contracted!`)

    // save contracting entities
    await Promise.all(cleanContracting.map(async ({ contractId, id: entityId }) => {
      await knex('entityContracts').insert({ contractId, entityId })
    }))
    console.log(`Saved ${cleanContracting.length} new entities contracts!`)
  }
}

const cleanDatabase = async () => {
  // database tables
  const tables = ['entityContracts', 'entityIsContracted', 'document', 'entity', 'contract']
  // delete all content
  await Promise.all(tables.map(async (table) => {
    await knex(table).del()
    console.log(`Table ${table} content deleted!`)
  }))
}

/*
const getEntities = async () => {
  // clean up collection
  await entity.deleteMany({})
  console.log('Entity collection cleared')

  const queryPromises = []
  // fetch all unique entity ids for contracted
  queryPromises.push(contract.find()
    .distinct('contracted')
    .exec())
  // fetch all unique entity ids for contracting
  queryPromises.push(contract.find()
    .distinct('contracting')
    .exec())

  // wait for queries to finish
  const [contracted, contracting] = await Promise.all(queryPromises)

  // union of the two arrays (no duplicates with set)
  const entities = [...new Set([...contracted, ...contracting])]
  const entityObjects = []
  // TODO
  // eslint-disable-next-line no-restricted-syntax
  for (const id of entities) {
    // eslint-disable-next-line no-await-in-loop
    const entityData = await fetchSpecificEntity(id)
    console.log(entityData)
    // clean contract
    entityObjects.push(entityData)
  }
  // save do collection
  await entity.insertMany(entityObjects)
  console.log(entities)
}
*/

const main = async () => {
  // await cleanDatabase()
  await getContracts()

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
