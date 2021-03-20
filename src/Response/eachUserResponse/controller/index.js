const makeResponseController = require('./response')
const { logger } = require('../../../util/Logger')
const { responseCase } = require('../useCase')

const responseController = makeResponseController({ logger, responseCase})

exports.responseController = props => responseController(props)