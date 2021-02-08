const express = require('express')
const knex = require('../knex')

const router = express.Router()

router.get('/', async (req, res) => {
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

  res.json({
    status: 200,
    message: 'alive',
    contractCount: parseInt(contractCount, 10),
    contractValue: parseFloat(contractValue, 10),
    contractAvgValue: parseFloat(contractAvgValue, 10),
  })
})

module.exports = router
