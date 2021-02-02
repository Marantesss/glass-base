exports.up = (knex) => knex.schema.createTable('contract', (table) => {
  // Create Id column of type integer
  table.integer('id').notNullable().primary()
  table.boolean('ambientCriteria')

  // create created at column
  table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now())
})

exports.down = (knex) => knex.schema
  .dropTable('contract')

/*
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
*/
