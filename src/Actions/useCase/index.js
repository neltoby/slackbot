const { 
    makeAction1Fxn, 
    makeAction2Fxn, 
    makeAction3Fxn,
} = require('../action1')

const makeUseCaseDispatcher = require('./useCaseDispatcher')
const makeActionDispatcher = require('./action')
const { saveResponse } = require('../../model')
const makeModalCase = require('./modal')
const { logger } = require('../../util/Logger')
const { getVariable, cacheVariable, getAllCached } = require('../../util/Redis-Client')

const modalCase = makeModalCase({ 
    saveData: saveResponse, 
    logger, 
    getVariable,  
    cacheVariable,
    getAllCached
})

const useCaseDispatcher = makeUseCaseDispatcher({ makeAction1Fxn, makeAction2Fxn, makeAction3Fxn })
const actionCase = makeActionDispatcher({ 
    saveData: saveResponse , 
    dispatcher: useCaseDispatcher, 
    logger, 
    getVariable,  
    cacheVariable
})

exports.actionCase = prop => actionCase(prop)
exports.modalCase = prop => modalCase(prop)