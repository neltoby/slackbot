if (process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

module.exports = function buildEventFxn({ logger, botResponse }) {
  const commandValue = process.env.NODE_ENV === 'test' ? '@devson' : process.env.BOT_ID;
  let options = []
  return function eventFxn({
      client_msg_id, text, user, channel
    }) 
  {
    class NewEvent {
      constructor({
        client_msg_id, text, user, channel 
      }) {
        if (!client_msg_id) {
          throw {
            message: 'Missing client_msg_id',
          };
        }
        if (!text) {
          throw {
            message: 'Missing text field',
          };
        }
        if (!user) {
          throw {
            message: 'Missing user field',
          };
        }
        if (!channel) {
          throw {
            message: 'Missing channel field',
          };
        }
        this.client_msg_id = client_msg_id;
        this.text = text;
        this.user = user;
        this.channel = channel;
        this.value = null;
      }

      get retval() {
        return this.value;
      }

      set retval(value) {
        this.value = value;
      }

      #setHelpValue() {
        this.retval = {
          channel,
          blocks: [
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `call *${commandValue.toUpperCase()} help*`,
                },
              ],
            }
          ]
        };
      }

      #setHelloValue() {
        this.retval = {
          channel,
          blocks: [
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `call *Hello ${commandValue.toUpperCase()}*`,
                },
              ],
            }
          ]
        };
      }

      #setArrayOption() {
        const arr = [
          'Doing Well',
          'Neutral',
          'Feeling Good'
        ]
        arr.forEach(item => {
          let obj = {}
          obj['text'] = {
            type: 'plain_text',
            text: item
          }
          obj['value'] = item
          options = [...options, obj]
        })
      }

      #setExpectedValue() {
        this.#setArrayOption()
        this.retval = {
          channel,
          blocks: [
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `*${botResponse[0]}* :wave:`,
                },
              ],
            },
            {
              type: 'actions',
              block_id: 'actions_1',
              elements: [
                {
                  type: 'static_select',
                  placeholder: {
                    type: 'plain_text',
                    text: botResponse[0],
                  },
                  action_id: 'select_1',
                  options
                },
              ],
            },
          ],
        };
      }

      valueSetter() {
        const r_text = this.text.split(' ');
        logger.info(
          `${new Date()} :::: event.logic.class. :::: e_text.value = ${r_text} :::: line 49`
        );
        const { channel } = this;
        if (r_text.length < 3) {
          const command = r_text[0].toLowerCase();
          logger.info(
            `${new Date()} :::: event.logic.class. :::: cammand.value = ${command} :::: line 53`
          );
          if (command !== 'hello' && command !== commandValue) {
            logger.info(
              `${new Date()} :::: event.logic.class. :::: cammand.value = ${command} :::: line 55`
            );
            this.#setHelpValue()
          } else if (command === commandValue) {
            if (r_text[1].toLowerCase() === 'help') {
              this.#setHelloValue()
            } else {
              logger.info(
                `${new Date()} :::: event.logic.class. :::: cammand.value = ${command} :::: line 66`
              );
              this.#setHelpValue();
            }
          } else if (command.trim() === 'hello') {
            logger.info(
              `${new Date()} :::: event.logic.class. :::: cammand.value = ${command} :::: line 73`,
            );
            this.#setExpectedValue()
          } else {
            this.#setHelpValue()
          }
        } else {
          this.#setHelpValue()
        }
      }
    }
    return new NewEvent({
      client_msg_id,
      text,
      user,
      channel,
    });
  };
};
