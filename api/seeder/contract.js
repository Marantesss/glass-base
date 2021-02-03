const axios = require('axios')
const { seeder } = require('../config')

/* Utils */
const { formatDateFromString, formatCurrencyFromString } = require('./utils')

const { step } = seeder
const baseUrl = `${seeder.url}/contratos`
const url = (id) => `${baseUrl}/${id}`

const fetchGeneralContracts = async (startRange) => {
  // axios options
  const options = {
    method: 'GET',
    headers: {
      Range: `${startRange}-${startRange + step - 1}`,
    },
    url: baseUrl,
  }

  try {
    // fetch 'step' contracts
    const { status, data } = await axios(options)

    // watch out for server errors
    if (status !== 200) {
      throw new Error(`${baseUrl} returned with status != 200`)
    }

    // log some information
    const { id, publicationDate } = data[data.length - 1]
    console.log(`${startRange + step - 1} => pub: ${publicationDate}, id: ${id}`)

    // we only need an array of id's
    return data.map((contract) => contract.id)
  } catch (err) {
    // network error
    // console.error(err)
    throw new Error(`${baseUrl} returned with status != 200`)
  }
}

const fetchSpecificContract = async (id) => {
  // axios options
  const options = {
    method: 'GET',
    url: url(id),
  }

  try {
    // fetch 'step' contracts
    const { status, data } = await axios(options)

    // watch out for server errors
    if (status !== 200) {
      throw new Error(`${url(id)} returned with status != 200`)
    }

    return data
  } catch (err) {
    // network error
    // console.error(err)
    throw new Error(`${url(id)} returned with status != 200`)
  }
}

const cleanContract = (contractData) => ({
  // TODO add new cenas
  // stuff we want to keep
  id: contractData.id,
  cpvs: contractData.cpvs,
  executionPlace: contractData.executionPlace,
  description: contractData.description,
  directAwardFundamentationType: contractData.directAwardFundamentationType,
  contractingProcedureType: contractData.contractingProcedureType,
  contractTypes: contractData.contractTypes,
  endOfContractType: contractData.endOfContractType,

  documents: contractData.documents.map(
    // add contract id to document object
    (document) => ({ ...document, contractId: contractData.id }),
  ),
  // clean up some dates
  publicationDate: formatDateFromString(contractData.publicationDate),
  signingDate: formatDateFromString(contractData.signingDate),
  // closeDate: formatDateFromString(contractData.closeDate)

  // contracted and contracting reference
  contracted: contractData.contracted.map(
    // add contract id to entity object
    (entity) => ({ ...entity, contractId: contractData.id }),
  ),
  contracting: contractData.contracting.map(
    // add contract id to entity object
    (entity) => ({ ...entity, contractId: contractData.id }),
  ),
  // - monetary values
  initialContractualPrice: formatCurrencyFromString(contractData.initialContractualPrice),
  totalEffectivePrice: formatCurrencyFromString(contractData.totalEffectivePrice),

  // TODO: there may be some other stuff that need cleaning
  // - execution deadline "60 dias"
  executionDeadline: contractData.executionDeadline,
  // - ...
})

module.exports = {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract,
}
