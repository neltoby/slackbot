module.exports = function makeResponseController({responseCase, logger}){
    return async function responseController({ user }) {
        logger.info(
            `${new Date()} :::: server.postRoute.slack/response.responseController`
        );
        try{
            const res = await responseCase({ user })
            return {
                body: res,
                statusCode: 200
            }
        }catch(e){
            return {
                body: {
                    error: e.message
                }, 
                statusCode: e.statusCode
            }
        }
    }
}