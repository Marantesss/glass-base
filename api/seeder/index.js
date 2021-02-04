const { seeder } = require('../config')
const knex = require('../knex')

/* seeders */
const {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract,
} = require('./contract')

const { numberOfContracts, step } = seeder

const seedContracts = async (startRange = 0) => {
  for (let index = startRange; index < numberOfContracts; index += step) {
    // fetch 'step' contracts
    const contracts = await fetchGeneralContracts(index)

    const cleanContracts = []
    const cleanDocuments = []
    const cleanContracted = []
    const cleanContractor = []
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
      // store stuff in array
      cleanContracted.push(...contracted)
      cleanContractor.push(...contracting)
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
    const uniqueEntities = [...cleanContracted, ...cleanContractor].filter((entity) => {
      const duplicate = uniqueEntityIds.has(entity.nif)
      uniqueEntityIds.add(entity.nif)
      return !duplicate
    })
    // fetch any duplicate entities on db
    const duplicateEntitiesIds = await knex('entity')
      .whereIn('nif', [...uniqueEntityIds])
      .pluck('nif')
    // remove duplicate keys
    const cleanEntities = uniqueEntities.filter(
      (entity) => !duplicateEntitiesIds.includes(entity.nif),
    )
    // save entities
    await Promise.all(cleanEntities.map(async ({ contractId, id, ...restOfEntity }) => {
      await knex('entity').insert(restOfEntity)
    }))
    console.log(`Saved ${cleanEntities.length} new entities!`)

    // save contracted entities
    await Promise.all(cleanContracted.map(async ({ contractId, nif: entityNif }) => {
      await knex('entityContracted').insert({ contractId, entityNif })
    }))
    console.log(`Saved ${cleanContracted.length} new entities contracted!`)

    // save contractor entities
    await Promise.all(cleanContractor.map(async ({ contractId, nif: entityNif }) => {
      await knex('entityContractor').insert({ contractId, entityNif })
    }))
    console.log(`Saved ${cleanContractor.length} new entities contractor!`)
  }
}

const getContractCount = async () => {
  const { count } = await knex('contract').count().first()
  return parseInt(count, 10) // 10 => decimal
}

const cleanDatabase = async () => {
  // database tables
  const tables = ['entityContracted', 'entityContractor', 'document', 'entity', 'contract']
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
  const startRange = await getContractCount()
  if (!startRange) {
    await cleanDatabase()
  }
  await seedContracts(startRange)

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
