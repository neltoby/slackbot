const makeActionController  = require('./action')
const controllerDispatcher = require('./controllerDispatcher')
const { actionCase, modalCase } = require('../useCase')
const { logger } = require('../../util/Logger')


const actionDispatchController = controllerDispatcher({ actionCase, modalCase })

const actionController = makeActionController({ actionDispatchController, logger});

exports.actionController = prop => actionController(prop);