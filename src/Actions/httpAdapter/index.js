const { apiDispatcher } = require('../../util/ChatApi');
const { logger } = require('../../util/Logger');

const apiRoot = process.env.API_ROOT;

module.exports = (controller) => async (req, res) => {
  try {
    logger.info(
      `${new Date()} :::: server.postRequest.${apiRoot}/action.httpadapter`
    )
    const { body } = req;

    console.log(body.payload)
    
    controller({ body }).then(async (httpResponse) => {
      const result = await apiDispatcher(httpResponse.body)
      res.json({});
    });
  } catch (e) {
    logger.info(
      `${new Date()} :::: server.postRequest.${apiRoot}/action.httpadapter :::: ${e.message}`
    );
    res.json({});
  }
};