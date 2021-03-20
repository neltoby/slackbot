const { logger } = require('../../util/Logger')
const redis = require('redis')
const { promisify } = require('util')
const { botResponse } = require('../../../botResponse.config')

exports.ActionService = class ActionService {
    static userInfo;
    static question;
    static selected;
    static log

    constructor({ actions, user, trigger_id, channel }) {
        
        if(!actions){
            throw {
                message: 'Missing actions array'
            }
        }
        if(!user){
            throw {
                message: 'Missing user obejct'
            }
        }
        if(!trigger_id){
            throw {
                message: 'Missing trigger_id'
            }
        }
        if(!channel){
            throw {
                message: 'Missing channel'
            }
        }

        ActionService.userInfo = user
        ActionService.log = logger
        this.actions = actions[0];
        this.user = user;
        this.trigger_id = trigger_id;
        this.channel = channel;
        this.retVal = null;
        this._selected = null;
        this._question = null;
        this._reset = false;
        this.block = null;
        this.logger = logger;
        this.botResponse = botResponse;
        this.mainBlock = null;
        this._addedBlock = {
            type: 'context',
            elements: [
                {
                type: 'mrkdwn',
                text: `*Updated your response to  ${this._question}*`,
                },
            ],
        }
    }

    #setQuestionInAddedBlock(question) {
        const addedBlock = {
            type: 'context',
            elements: [
                {
                type: 'mrkdwn',
                text: `*Updated your response to  ${question}*`,
                },
            ],
        }
        this.addedBlock = addedBlock
    }

    get getActions() {
        return this.actions
    }

    get getRetVal() {
        return this.retVal
    }

    get getSelected() {
        return this._selected
    }

    get getQuestion() {
        return this._question
    }
    get getUser() {
        return this.user
    }

    get getTriggerId() {
        return this.trigger_id
    }

    get getChannel() {
        return this.channel
    }

    get getReset() {
        return this._reset
    }

    set question (value) {
        this._question = value
        ActionService.question = value
    }

    set reset (value) {
        this._reset = value
    }

    set selected (value) {
        this._selected = value
        ActionService.selected = value
    }

    get addedBlock() {
        return this._addedBlock
    }

    set addedBlock (value) {
        if(!value){
            throw {
                message: 'added block is missing',
                statusCode: 400
            }
        }
        this._addedBlock = value
    }

    resetBlock(question){
        if(this._reset){
            this.#setQuestionInAddedBlock(question)
            this.block = [this.addedBlock, this.mainBlock]
            ActionService.log.info(
                `${new Date()} :::: ActionService Class.resetBlock method:::: reset=true`
            ) 
        }else{
            this.block = [this.mainBlock]
            ActionService.log.info(
                `${new Date()} :::: ActionService Class.resetBlock method:::: reset=false`
            )
        } 
    }
}