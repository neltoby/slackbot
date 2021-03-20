module.exports = function makeEventController({ eventCase, logger }) {
  return async function eventController(body) {
    logger.info(
      `${new Date()} :::: server.postRoute.slack/event.eventcontroller`
    );
    try {
      const {
        event: {channel, text, client_msg_id, user}
      } = body;
      const res = eventCase({
        client_msg_id,
        text,
        user,
        channel,
      });
      return {
        body: res,
      };
    } catch (e) {
      logger.error(
        `${new Date()} :::: server.postRoute.slack/event.eventcontroller :::: ${
          e.message
        }`,
      );
      return {
        error: 'something went wrong',
      };
    }
  };
};
