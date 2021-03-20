const { ActionService } = require('./actionService')

module.exports = function buildAction2Fxn () {
    return function makeAction2Fxn (props) {
        let options = []
        class ActionFxn2 extends ActionService {
            constructor({ actions, user, trigger_id, channel }) {
                super({ actions, user, trigger_id, channel })
                this.#setBlockId_2()
            }

            #setBlockId_2() {
                this.logger.info(
                    `${new Date()} :::: ActionFxn2 Class.setBlockId_2 method`
                )
                this.selected = [
                    this.actions.selected_options[0].value, 
                    this.actions.selected_options[1].value
                ];
                this.question = this.actions.placeholder ? this.actions.placeholder.text : this.botResponse[1];
                this.#setOptionArray()
            }

            blockDecider () {
                this.logger.info(
                    `${new Date()} :::: ActionFxn2 Class.blockDecider method`
                )
                this.mainBlock = {
                    type: "section",
                    block_id: "actions_3",
                    text: {
                        type: "mrkdwn",
                        text: `*${this.botResponse[2]}*`
                    },
                    accessory: {
                        action_id: "select_3",
                        type: "multi_static_select",
                        placeholder: {
                            type: "plain_text",
                            text: this.botResponse[2]
                        },
                        options,
                        max_selected_items: 2
                    }
                }
                this.resetBlock(this.getQuestion)
                this.#setBlockId_3()
            }

            #setOptionArray() {
                this.logger.info(
                    `${new Date()} :::: ActionFxn2 Class.setOptionArray method`
                )
                let arrOption = [
                    'Football', 
                    'Music', 
                    'Sleep',
                    'Movies',
                    'Basketball',
                    'Swimming'
                ]
                arrOption.forEach(item => {
                    let obj = {}
                    obj['text'] = {
                        type: 'plain_text',
                        text: item
                    };
                    obj['value'] = item
                    options = [ ...options, obj ]
                })
                this.blockDecider()
            }

            #setBlockId_3() {
                this.logger.info(
                    `${new Date()} :::: ActionFxn2 Class.setBlock_3 method`
                )
                this.retVal = {
                    channel: this.channel.id,
                    replace_original: "true",
                    blocks: this.block
                }
            }
        }
        return new ActionFxn2(props)
    }
}