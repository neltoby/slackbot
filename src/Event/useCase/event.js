const { eventFxn } = require('../event');

module.exports = function makeEventCase() {
  return function eventCase({
 client_msg_id, text, user, channel 
}) {
    const eventInstance = eventFxn({
      client_msg_id,
      text,
      user,
      channel,
    });
    eventInstance.valueSetter();
    return eventInstance.retval;
  };
};
