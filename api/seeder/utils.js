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

module.exports = {
  formatDateFromString,
}
