const axios = require('axios')
const { seeder } = require('../config')

const url = (id) => `${seeder.url}/entidades/${id}`

const fetchSpecificEntity = async (id) => {
  // axios options
  const options = {
    method: 'GET',
    url: url(id),
  }

  try {
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

module.exports = {
  fetchSpecificEntity,
}
