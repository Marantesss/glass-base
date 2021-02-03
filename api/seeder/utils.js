const formatDateFromString = (dateString) => {
  // might be null
  if (!dateString) {
    return null
  }
  // original format "dd-mm-yyyy"
  const [day, month, year] = dateString.split('-')
  // transform to ISO "yyy-mm-dd" date object
  return new Date(year, month, day)
}

const formatCurrencyFromString = (currencyString) => {
  // might be null
  if (!currencyString) {
    return null
  }
  // original format "nn.nnn.nnn,nn €"
  // remove ' €'
  // replace '.' with ''
  // replace ',' with '.'
  const cleanString = currencyString.slice(0, -2)
    .replace('.', '')
    .replace(',', '.')
  // convert to float
  return parseFloat(cleanString)
}

module.exports = {
  formatDateFromString,
  formatCurrencyFromString,
}
