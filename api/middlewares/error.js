const error = (err, req, res) => {
  console.log(err.stack)
  return res.json({ status: 500 })
}

module.exports = error
