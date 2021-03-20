const { LoggerClass } = require('./logger');

const logger = new LoggerClass(); 

exports.logger = logger.fieldLogger;
