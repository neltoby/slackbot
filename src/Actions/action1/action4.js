const { ActionService } = require('./actionService')

module.exports = function buildAction4Fxn (){
    return function makeAction4Fxn(prop) {
        class ActionFxn4 extends ActionService{
            constructor({ view, actions, user, trigger_id, channel }){
                super({ actions, user, trigger_id, channel })
                this.view = view;
                this.actions = null;
                this.modified = [];
                this.#setBlockId_4()
            }

            #setBlockId_4(){
                this.logger.info(
                    `${new Date()} :::: ActionFxn4 Class.setBlockId_4 method`
                )
                this.selected = this.view.state['values']['actions_4']['select_4']['value'];
                this.question = this.botResponse[3];
                // this.view.blocks.length > 1 ? this.view.blocks[1]['label']['text'] || this.botResponse[3] : 
                // this.view.blocks[0]['label']['text'] || this.botResponse[3];
                this.blockDecider()
            }

            blockDecider() {
                this.logger.info(
                    `${new Date()} :::: ActionFxn4 Class.blockDecider method`
                )
                this.mainBlock = {
                    type: 'context',
                    elements: [
                        {
                        type: 'mrkdwn',
                        text: `*${this.botResponse[4]} <@${this.user.id}>*`,
                        },
                    ],
                }
                this.resetBlock(this.getQuestion)
                this.#setBlockId_5()
            }

            blockModifier (arr) {
                if(!Array.isArray(arr)){
                    throw {
                        message: 'blockModifier can only accept array as parameter'
                    }
                }
                const attention = {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*It seem this is a new session with you, i could not find your response to the following *`,
                        },
                    ],
                }
                this.modified = [attention, ...this.modified]
                arr.forEach(item => {
                    let response = {
                        type: 'context',
                        elements: [
                            {
                                type: 'mrkdwn',
                                text: `*${this.botResponse[item['key_position']]}*`,
                            },
                        ],
                    }
                    this.modified = [response, ...this.modified]
                    this.block = [...this.modified, ...this.block]
                    this.#setBlockId_5()
                })
            }

            #setBlockId_5(){
                this.logger.info(
                    `${new Date()} :::: ActionFxn4 Class.setBlockId_5 method`
                )
                this.retVal = {
                    channel: this.channel,
                    blocks: this.block                  
                }
            }
        }
        return new ActionFxn4(prop)
    }
}