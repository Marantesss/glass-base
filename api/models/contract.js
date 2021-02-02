const { Schema, model } = require('mongoose')

const schema = new Schema({
  _id: { type: Number },
  contestants: [],
  documents: [{}],
  ambientCriteria: Boolean,
  announcementId: {
    type: Number,
    default: -1,
  },
  directAwardFundamentationType: {
    type: String,
    default: 'Não aplicável',
  },
  contractingProcedureUrl: String, // TODO: i guess
  observations: String, // TODO: i guess
  invitees: [],
  publicationDate: Date,
  enfOfContractType: String,
  totalEffectivePrice: String, //TODO: probably change this to Number (requires some work)
  frameworkAgreementProcedureId: {
    type: String,
    default: 'Não aplicável',
  },
  increments: Boolean,
  causesDeadlineChange: String, // TODO: i guess
  causesPriceChange: String, // TODO: i guess
  frameworkAgreementProcedureDescription: {
    type: String,
    default: 'Não aplicável',
  },
  closeDate: Date,
  contractFundamentationType: {
    type: String,
    default: 'Não preenchido',
  },
  contracted: [{ type: Number, ref: 'Entity'}],
  contracting: [{ type: Number, ref: 'Entity'}],
  cocontratantes: Boolean,
  contractingProcedureType: String,
  contractTypes: String,
  executionDeadline: String, // TODO: this will probably need some refactoring (ex. '60 dias')
  cpvs: String,
  contractTypeCS: Boolean,
  objectBriefDescription: String,
  income: Boolean,
  centralizedProcedure: Schema.Types.Mixed, // TODO: no clue
  executionPlace: String,
  nonWrittenContractJustificationTypes: String,
  initialContractualPrice: String, //TODO: probably change this to Number (requires some work)
  contractStatus: Schema.Types.Mixed, // TODO: no clue
  signingDate: Date,
  description: String,
}, { timestamps: true })

module.exports = model('Contract', schema)
