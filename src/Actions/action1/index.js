const buildAction1Fxn = require('./action')
const buildAction2Fxn = require('./action2')
const buildAction3Fxn = require('./action3')
const buildAction4Fxn = require('./action4')
const { logger } = require('../../util/Logger')
const { botResponse } = require('../../../botResponse.config')


const makeAction1Fxn = buildAction1Fxn()
const makeAction2Fxn = buildAction2Fxn()
const makeAction3Fxn = buildAction3Fxn()
const makeAction4Fxn = buildAction4Fxn()

exports.makeAction1Fxn = prop => makeAction1Fxn(prop)
exports.makeAction2Fxn = prop => makeAction2Fxn(prop)
exports.makeAction3Fxn = prop => makeAction3Fxn(prop)
exports.makeAction4Fxn = prop => makeAction4Fxn(prop)