const makeEventController = require('./event');
const { eventCase } = require('../useCase');
const { logger } = require('../../util/Logger');

const eventController = makeEventController({ eventCase, logger });

exports.eventController = (props) => eventController(props);
