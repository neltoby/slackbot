const { postChat } = require('../../util/ChatApi');
const { logger } = require('../../util/Logger');

const apiRoot = process.env.API_ROOT;

module.exports = (controller) => async (req, res) => {
  try {
    logger.info(
      `${new Date()} :::: server.postRequest.${apiRoot}/event.httpadapter`
    )
    const { body } = req;
    controller(body).then((httpResponse) => {
      postChat(httpResponse.body);
      res.json({});
    });
  } catch (e) {
    logger.info(
      `${new Date()} :::: server.postRequest.${apiRoot}/event.httpadapter :::: ${e.message}`
    );
    res.json({});
  }
};
