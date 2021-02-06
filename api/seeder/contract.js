const axios = require('axios')
const { seeder } = require('../config')

/* Utils */
const { formatDateFromString, formatCurrencyFromString, formatTitleCase } = require('./utils')

const { step, timeout: cancelTokenTimeout } = seeder
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
    // Sometimes the 'timeout' option seems to not work as expected
    // https://github.com/axios/axios/issues/647
    // maybe use cancel token... Because it looks like the timeout
    // in axios is response timeout, not connection timeout
    const abort = axios.CancelToken.source()

    const timeout = setTimeout(() => {
      abort.cancel(`Timeout of ${cancelTokenTimeout}ms.`)
    }, cancelTokenTimeout)

    // fetch 'step' contracts
    const { status, data } = await axios({ ...options, cancelToken: abort.token })
    clearTimeout(timeout)

    // watch out for server errors
    if (status !== 200) {
      console.warn(`${baseUrl} returned with status != 200`)
      // try again
      console.log('Trying again for contract')
      // TODO: this causes an infinite loop, maybe do something else about this
      return await fetchGeneralContracts(startRange)
    }

    // we only need an array of id's
    // return data.map((contract) => contract.id)
    return data
  } catch (err) {
    // network error
    // console.error(err)
    // throw new Error(`${baseUrl} returned with NETWORK ERROR EXCEPTION`)
    console.warn(`${baseUrl} returned with NETWORK ERROR EXCEPTION`)
    console.log(`Trying again for contracts starting in ${startRange}`)
    // TODO: this causes an infinite loop, maybe do something else about this
    // eslint-disable-next-line no-return-await
    return await fetchGeneralContracts(startRange)
  }
}

const fetchSpecificContract = async (id) => {
  // axios options
  const options = {
    method: 'GET',
    url: url(id),
  }

  try {
    // Sometimes the 'timeout' option seems to not work as expected
    // https://github.com/axios/axios/issues/647
    // maybe use cancel token... Because it looks like the timeout
    // in axios is response timeout, not connection timeout
    const abort = axios.CancelToken.source()

    const timeout = setTimeout(() => {
      abort.cancel(`Timeout of ${cancelTokenTimeout}ms.`)
    }, cancelTokenTimeout)

    // fetch 'step' contracts
    const { status, data } = await axios({ ...options, cancelToken: abort.token })
    clearTimeout(timeout)

    // watch out for server errors
    if (status !== 200) {
      console.warn(`${url(id)} returned with status != 200`)
      // try again
      console.log(`trying again for contract ${id}`)
      // TODO: this causes an infinite loop, maybe do something else about this
      return await fetchSpecificContract(id)
    }

    return data
  } catch (err) {
    // network error
    // console.error(err)
    // throw new Error(`${url(id)} returned with NETWORK ERROR EXCEPTION`)
    console.warn(`${url(id)} returned with NETWORK ERROR EXCEPTION`)
    console.log(`Trying again for contract ${id}`)
    // TODO: this causes an infinite loop, maybe do something else about this
    // eslint-disable-next-line no-return-await
    return await fetchSpecificContract(id)
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
  contractFundamentationType: contractData.contractFundamentationType,

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
    (entity) => ({
      ...entity,
      contractId: contractData.id,
      description: formatTitleCase(entity.description),
    }),
  ),
  contracting: contractData.contracting.map(
    // add contract id to entity object
    (entity) => ({
      ...entity,
      contractId: contractData.id,
      description: formatTitleCase(entity.description),
    }),
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
