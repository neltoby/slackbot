const { ActionService } = require('./actionService')
const { client, getAsync, setAsync } = require('../../util/Redis-Client')

module.exports = function buildAction1Fxn() {
    return function makeAction1Fxn(prop) {
        let all_options 
        class ActionFxn1 extends ActionService {
            constructor({ actions, user, trigger_id, channel }) {
                super({ actions, user, trigger_id, channel })
                this.#setBlockId_1()
            }

            #setTimerOptionArray(){
                this.logger.info(
                    `${new Date()} :::: ActionFxn1 Class.setTimerOptionArray method`
                )
                let timeArray = [
                    '12:00', 
                    '12:30', 
                    '13:00', 
                    '13:30', 
                    '14:00', 
                    '14:30', 
                    '15:00', 
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00'
                ]
                let daysArray = [
                    'Monday', 
                    'Tuesday',
                    'Wednesday',
                    'Thursady',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ]
                let options_groups = []
                daysArray.forEach(day => {
                    let obj = {}
                    obj['label'] = {
                        type: 'plain_text',
                        text: day
                    };
                    obj['options'] =  [];
                    timeArray.forEach(time => {
                        let timeObj = {}
                        timeObj['text'] = {
                            type: 'plain_text',
                            text: time
                        }
                        timeObj['value'] = `${day} ${time}`
                        obj.options.push(timeObj)
                    });
                    options_groups = [...options_groups, obj]
                });
                all_options = options_groups
                this.blockDecider()
            }

            blockDecider () {
                this.logger.info(
                    `${new Date()} :::: ActionFxn1 Class.blockDecider method`
                )
                this.mainBlock = {
                    type: "section",
                    block_id: "actions_2",
                    text: {
                        type: "mrkdwn",
                        text: `*${this.botResponse[1]}*`
                    },
                    accessory: {
                        action_id: "select_2",
                        type: "multi_static_select",
                        placeholder: {
                            type: "plain_text",
                            text: this.botResponse[1]
                        },
                        option_groups: all_options,
                        max_selected_items: 2
                    }
                }
                this.resetBlock(this.getQuestion);
                this.#setBlockId_2();    
            }

            #setBlockId_1 () {
                this.logger.info(
                    `${new Date()} :::: ActionFxn1 Class.setBlockId_1 method`
                )
                this.selected = this.actions.selected_option.value;
                this.question = this.actions.placeholder ? this.actions.placeholder.text : this.botResponse[0]; 
                this.#setTimerOptionArray()            
            }

            #setBlockId_2() {
                this.logger.info(
                    `${new Date()} :::: ActionFxn1 Class.setBlockId_2 method`
                )
                this.retVal = {
                    channel: this.channel.id,
                    replace_original: "true",
                    blocks: this.block
                }
            }
        }
        return new ActionFxn1(prop)
    }
}