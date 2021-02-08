const express = require('express')
const knex = require('../knex')

const router = express.Router({ mergeParams: true })

// TODO
const parseDateString = (date) => date

router.get('/', async (req, res) => {
  // TODO parse filter
  const startDate = parseDateString(req.query.startDate) || new Date('2020-01-01')
  const endDate = parseDateString(req.query.endDate) || new Date('2020-12-31')

  // TODO: perform queries asynchronously

  // BIG NUMBERS
  const { contractCount } = await knex('contract')
    .count('id as contractCount')
    .first()
  // https://stackoverflow.com/questions/13113096/how-to-round-an-average-to-2-decimal-places-in-postgresql/20934099
  // double precision
  const { contractValue } = await knex('contract')
    .select(knex.raw('ROUND(SUM("initialContractualPrice"::double precision)::numeric, 2) as "contractValue"'))
    .first()
  // TODO: 3798 contracts with initialContractualPrice = 0
  const { contractAvgValue } = await knex('contract')
    .select(knex.raw('ROUND(AVG("initialContractualPrice")::numeric, 2) as "contractAvgValue"'))
    .first()

  // Contracts over time
  const contractsOverTime = await knex('contract')
    .select('publicationDate')
    .count('publicationDate as value')
    .where('publicationDate', '>=', startDate)
    .andWhere('publicationDate', '<=', endDate)
    .groupBy('publicationDate')
    .orderBy('publicationDate', 'asc')

  // Contract Types
  const contractTypes = await knex('contract')
    .select('contractingProcedureType')
    .count('contractingProcedureType as value')
    .groupBy('contractingProcedureType')
    .orderBy('value', 'desc')
    .limit(6)

  // TOP ENTITIES
  const topContractedNumber = await knex('entity')
    .select('entity.nif', 'entity.description')
    .count('entityContracted.entityNif as value')
    .join('entityContracted', 'entityContracted.entityNif', 'entity.nif')
    .groupBy('entity.nif')
    .orderBy('value', 'desc')
    .limit(6)
  const topContractedValue = await knex('entity')
    .select('entity.nif', 'entity.description',
      knex.raw('ROUND(SUM("contract"."initialContractualPrice"::double precision)::numeric, 2) as "value"'))
    .join('entityContracted', 'entityContracted.entityNif', 'entity.nif')
    .join('contract', 'contract.id', 'entityContracted.contractId')
    .groupBy('entity.nif')
    .orderBy('value', 'desc')
    .limit(6)

  const topContractorNumber = await knex('entity')
    .select('entity.nif', 'entity.description')
    .count('entityContractor.entityNif as value')
    .join('entityContractor', 'entityContractor.entityNif', 'entity.nif')
    .groupBy('entity.nif')
    .orderBy('value', 'desc')
    .limit(6)
  const topContractorValue = await knex('entity')
    .select('entity.nif', 'entity.description',
      knex.raw('ROUND(SUM("contract"."initialContractualPrice"::double precision)::numeric, 2) as "value"'))
    .join('entityContractor', 'entityContractor.entityNif', 'entity.nif')
    .join('contract', 'contract.id', 'entityContractor.contractId')
    .groupBy('entity.nif')
    .orderBy('value', 'desc')
    .limit(6)

  res.json({
    status: 'OK',
    contractCount,
    contractValue,
    contractAvgValue,
    contractsOverTime,
    contractTypes,
    topContracted: { topContractedNumber, topContractedValue },
    topContractor: { topContractorNumber, topContractorValue },
  })
})

module.exports = router
