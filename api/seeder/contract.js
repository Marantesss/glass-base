const axios = require('axios')
const { seeder } = require('../config')

/* Utils */
const { formatDateFromString } = require('./utils')

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

const cleanContract = async (contractData) => {
  const cleanContractData = contractData
  // save id to _id
  // eslint-disable-next-line no-underscore-dangle
  cleanContractData._id = contractData.id
  delete cleanContractData.id

  // clean up some dates
  cleanContractData.publicationDate = formatDateFromString(contractData.publicationDate)
  cleanContractData.signingDate = formatDateFromString(contractData.signingDate)
  cleanContractData.closeDate = formatDateFromString(contractData.closeDate)

  // contracted and contracting reference
  cleanContractData.contracted = contractData.contracted.map((elem) => elem.id)
  cleanContractData.contracting = contractData.contracting.map((elem) => elem.id)

  // TODO: there may be some other stuff that need cleaning
  // - monetary values
  // - time
  // - ...

  return cleanContractData
}

module.exports = {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract,
}
