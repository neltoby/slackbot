const { logger } = require('../../../util/Logger');
const apiRoot = process.env.API_ROOT;

module.exports = (controller) => {
    return ( req, res ) => {
        logger.info(
            `${new Date()} :::: server.getRequest.${apiRoot}/response.httpadapter`
        )
        const { params: { user } } = req;
        controller({user}).then(httpResponse => {
            const { body, statusCode } = httpResponse
            res.status(statusCode).send(body)
        }).catch(e => {
            logger.info(
                `${new Date()} :::: server.getRequest.${apiRoot}/response.httpadapter :::: error:::: ${e}`
            )
            res.status(500).send({ error: 'Something went wrong'})
        })
    }
}