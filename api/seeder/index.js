const axios = require('axios')
const { seeder, database } = require('./../config');

/* Database */
require('./../mongoose')
/* Controllers */
const { contract } = require('./../models')


// 2.4 fetching hours
const numberOfContracts = seeder.numberOfContracts
const step = seeder.step
const url = seeder.url

const headers = {
  Range: `${numberOfContracts}-${numberOfContracts + 1}`
}


const fetchGeneralContracts = async (startRange) => {
  // axios options
  const options = {
    method: 'GET',
    headers: {
      Range: `${startRange}-${startRange + step - 1}`,
    },
    url,
  }

  try {
    // fetch 'step' contracts
    const { status, data } = await axios(options);
    
    // watch out for server errors
    if (status !== 200)
      return
    
    // log some information
    const { id, publicationDate } = data[data.length - 1]
    console.log(`${startRange + step - 1} => pub: ${publicationDate}, id: ${id}`)

    // we only need an array of id's
    return data.map(contract => contract.id)
  } catch (err) {
    // network error
    console.error(err)
    return
  }
}

const fetchSpecificContract = async (id) => {
  // axios options
  const options = {
    method: 'GET',
    url: `${url}/${id}`,
  }

  try {
    // fetch 'step' contracts
    const { status, data } = await axios(options);
    
    // watch out for server errors
    if (status !== 200)
      return

    return data
  } catch (err) {
    // network error
    console.error(err)
    return
  }
}

const formatDateFromString = (dateString) => {
  // might be null
  if (!dateString) {
    return null;
  }
  // original format "dd-mm-yyyy"
  const [day, month, year] = dateString.split('-')
  // transform to ISO "yyy-mm-dd" date object
  return new Date(year, month, day)
}

const cleanContract = async (contractData) => {
  // clean up some dates
  contractData.publicationDate = formatDateFromString(contractData.publicationDate)
  contractData.signingDate = formatDateFromString(contractData.signingDate)
  contractData.closeDate = formatDateFromString(contractData.closeDate)
  // TODO: there may be some other stuff that need cleaning
  // - monetary values
  // - time
  // - ...
}

const main = async () => {
  // clean up collection
  await contract.deleteMany({})
  
  for (let index = 0; index < 100; index += step) {
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
    // bulk save contracts
    await contract.insertMany(cleanContracts)
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

