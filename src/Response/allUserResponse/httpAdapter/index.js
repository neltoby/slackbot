const { logger } = require('../../../util/Logger');
const apiRoot = process.env.API_ROOT;

module.exports = (controller) => {
    return (req, res) => {
        logger.info(
            `${new Date()} :::: server.getRequest.${apiRoot}/allresponse.httpadapter`
        )
        controller().then(httpResponse => {
            const { body, statusCode } = httpResponse
            res.status(statusCode).send(body)
        }).catch(e => {
            res.status(500).send({error: 'Something went wrong'})
        })
    }
}