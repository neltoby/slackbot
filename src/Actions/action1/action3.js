const { ActionService } = require('./actionService')

module.exports = function buildAction3Fxn (){
    return function makeAction3Fxn(prop) {
        class ActionFxn3 extends ActionService{
            constructor({ actions, user, trigger_id, channel }){
                super({ actions, user, trigger_id, channel })
                this.#setBlockId_3()
            }

            #setBlockId_3(){
                this.logger.info(
                    `${new Date()} :::: ActionFxn3 Class.setBlockId_3 method`
                )
                this.selected = [
                    this.actions.selected_options[0].value, 
                    this.actions.selected_options[1].value
                ];
                this.question = this.actions.placeholder ? this.actions.placeholder.text : this.botResponse[2];
                this.blockDecider()
            }

            blockDecider(){
                this.logger.info(
                    `${new Date()} :::: ActionFxn3 Class.blockDecider method`
                )
                this.mainBlock = {
                    "type": "input",
                    "block_id": "actions_4",
                    "label": {
                        "type": "plain_text",
                        "text": this.botResponse[3]
                    },
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "select_4",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Write your answer"
                        }
                    }
                }
                this.resetBlock(this.getQuestion)
                this.#setBlockId_4()
            }

            #setBlockId_4(){
                this.logger.info(
                    `${new Date()} :::: ActionFxn3 Class.setBlockId_4 method`
                )
                this.retVal = {
                    "trigger_id": this.trigger_id,
                    "view": {
                        "type": "modal",
                        "title": {
                            "type": "plain_text",
                            "text": "3 digits?"
                        },
                        "private_metadata": this.channel.id,
                        "submit": {
                            "type": "plain_text",
                            "text": "Submit"
                        },
                        "close": {
                            "type": "plain_text",
                            "text": "Close"
                        },
                        "clear_on_close": true,
                        "notify_on_close": true,
                        "blocks": this.block
                    }
                    
                }
            }
        }
        return new ActionFxn3(prop)
    }
}