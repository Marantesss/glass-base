const express = require('express')
const knex = require('../knex')

const router = express.Router({ mergeParams: true })

// TODO
const parseDateString = (date) => date

router.get('/', async (req, res) => {
  // TODO parse filter
  const startDate = parseDateString(req.query.startDate) || new Date('2020-01-01')
  const endDate = parseDateString(req.query.endDate) || new Date('2020-12-31')

  // perform queries asynchronously
  const [
    { contractCount },
    { contractValue },
    { contractAvgValue },
    contractsNumberOverTime,
    contractsValueOverTime,
    contractTypes,
    topContractedNumber,
    topContractedValue,
    topContractorsNumber,
    topContractorsValue,
  ] = await Promise.all([
    // BIG NUMBERS
    knex('contract')
      .count('id as contractCount')
      .first(),
    // https://stackoverflow.com/questions/13113096/how-to-round-an-average-to-2-decimal-places-in-postgresql/20934099
    // double precision
    knex('contract')
      .select(knex.raw('ROUND(SUM("initialContractualPrice"::double precision)::numeric, 2) as "contractValue"'))
      .first(),
    // TODO: 3798 contracts with initialContractualPrice = 0
    knex('contract')
      .select(knex.raw('ROUND(AVG("initialContractualPrice")::numeric, 2) as "contractAvgValue"'))
      .first(),

    // CONTRACTS OVER TIME
    knex('contract')
      .select(
        knex.raw('EXTRACT(MONTH from "publicationDate") AS "month"'),
        knex.raw('EXTRACT(YEAR from "publicationDate") AS "year"'),
      )
      .count('id as value')
      .whereBetween('publicationDate', [startDate, endDate])
      .groupBy('month', 'year')
      .orderBy('month', 'asc'),
    knex('contract')
      .select(
        knex.raw('EXTRACT(MONTH from "publicationDate") AS "month"'),
        knex.raw('EXTRACT(YEAR from "publicationDate") AS "year"'),
        knex.raw('ROUND(SUM("initialContractualPrice"::double precision)::numeric, 2) as "value"'),
      )
      .whereBetween('publicationDate', [startDate, endDate])
      .groupBy('month', 'year')
      .orderBy('month', 'asc'),

    // CONTRACT TYPES
    knex('contract')
      .select('contractingProcedureType')
      .count('contractingProcedureType as value')
      .groupBy('contractingProcedureType')
      .orderBy('value', 'desc')
      .limit(6),

    // TOP ENTITIES
    knex('entity')
      .select('entity.nif', 'entity.description as name')
      .count('entityContracted.entityNif as value')
      .join('entityContracted', 'entityContracted.entityNif', 'entity.nif')
      .groupBy('entity.nif')
      .orderBy('value', 'desc')
      .limit(6),
    knex('entity')
      .select('entity.nif', 'entity.description as name',
        knex.raw('ROUND(SUM("contract"."initialContractualPrice"::double precision)::numeric, 2) as "value"'))
      .join('entityContracted', 'entityContracted.entityNif', 'entity.nif')
      .join('contract', 'contract.id', 'entityContracted.contractId')
      .groupBy('entity.nif')
      .orderBy('value', 'desc')
      .limit(6),

    knex('entity')
      .select('entity.nif', 'entity.description as name')
      .count('entityContractor.entityNif as value')
      .join('entityContractor', 'entityContractor.entityNif', 'entity.nif')
      .groupBy('entity.nif')
      .orderBy('value', 'desc')
      .limit(6),
    knex('entity')
      .select('entity.nif', 'entity.description as name',
        knex.raw('ROUND(SUM("contract"."initialContractualPrice"::double precision)::numeric, 2) as "value"'))
      .join('entityContractor', 'entityContractor.entityNif', 'entity.nif')
      .join('contract', 'contract.id', 'entityContractor.contractId')
      .groupBy('entity.nif')
      .orderBy('value', 'desc')
      .limit(6),
  ])

  res.json({
    status: 'OK',
    contractCount,
    contractValue,
    contractAvgValue,
    contractTypes,
    contractsOverTime: { number: contractsNumberOverTime, value: contractsValueOverTime },
    topContracted: { number: topContractedNumber, value: topContractedValue },
    topContractors: { number: topContractorsNumber, value: topContractorsValue },
  })
})

module.exports = router
