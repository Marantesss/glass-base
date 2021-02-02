const axios = require('axios')
const { seeder } = require('./../config');

/* Utils */
const { formatDateFromString } = require('./utils')

const step = seeder.step
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
    const { status, data } = await axios(options);

    // watch out for server errors
    if (status !== 200) {
      throw `${baseUrl} returned with status != 200`
    }

    // log some information
    const { id, publicationDate } = data[data.length - 1]
    console.log(`${startRange + step - 1} => pub: ${publicationDate}, id: ${id}`)

    // we only need an array of id's
    return data.map(contract => contract.id)
  } catch (err) {
    // network error
    // console.error(err)
    throw `${baseUrl} returned with status != 200`
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
    const { status, data } = await axios(options);

    // watch out for server errors
    if (status !== 200) {
      throw `${url(id)} returned with status != 200`
    }

    return data
  } catch (err) {
    // network error
    // console.error(err)
    throw `${url(id)} returned with status != 200`
  }
}

const cleanContract = async (contractData) => {
  // save id to _id
  contractData._id = contractData.id
  delete contractData.id

  // clean up some dates
  contractData.publicationDate = formatDateFromString(contractData.publicationDate)
  contractData.signingDate = formatDateFromString(contractData.signingDate)
  contractData.closeDate = formatDateFromString(contractData.closeDate)

  // contracted and contracting reference
  contractData.contracted = contractData.contracted.map(elem => elem.id)
  contractData.contracting = contractData.contracting.map(elem => elem.id)

  // TODO: there may be some other stuff that need cleaning
  // - monetary values
  // - time
  // - ...
}

module.exports = {
  fetchGeneralContracts,
  fetchSpecificContract,
  cleanContract,
}
