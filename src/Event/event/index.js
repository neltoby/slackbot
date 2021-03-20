const buildEventFxn = require('./event');
const { logger } = require('../../util/Logger');
const { botResponse } = require('../../../botResponse.config')

const eventFxn = buildEventFxn({ logger, botResponse });

exports.eventFxn = (val) => eventFxn(val);
// exports.
