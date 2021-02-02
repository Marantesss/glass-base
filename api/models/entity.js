const { Schema, model } = require('mongoose')

const schema = new Schema({
  _id: Number,
  sumTotalContractsGiven: String,
  sumTotalContractsReceived: String,
  totalContractsGiven: Number,
  totalContractsReceived: Number,
  nif: String,
  description: String,
  location: String, // TODO: font some other way to store this (maybe gps coord, use google maps api... ???)
  // contracts
  contracts: [{ type: Number, ref: 'Contract' }]
}, { timestamps: true })

module.exports = model('Entity', schema)

