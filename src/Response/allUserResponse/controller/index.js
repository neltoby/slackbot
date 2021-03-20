const makeAllResponseController = require('./response')
const { allResponseCase } = require('../useCase')
const { logger } = require('../../../util/Logger')

const allResponseController = makeAllResponseController({ allResponseCase, logger })

exports.allResponseController = () => allResponseController()