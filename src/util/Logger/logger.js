const winston = require('winston')
const { types } = require('./Logger.config.json')

exports.LoggerClass = class LoggerClass {
    static #logger 

    constructor() {
        this.fieldLogger = this.#getLoggerInstance()
    }

    static #makeLogger(){
        LoggerClass.#logger = winston.createLogger({
            transports: [
                new winston.transports.Console(types.console),
                new winston.transports.File(types.file)
            ]
        })
    }

    #getLoggerInstance() {
        if(!LoggerClass.#logger) {
            LoggerClass.#makeLogger()
        }
        return LoggerClass.#logger
    }
}