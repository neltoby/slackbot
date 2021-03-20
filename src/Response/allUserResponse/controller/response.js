module.exports = function makeAllResponseController ({ allResponseCase, logger}) {
    return async function allResponseController(){
        logger.info(
            `${new Date()} :::: server.postRoute.slack/response.allresponsecontroller`
        );
        try{
            const res = await allResponseCase()
            return {
                body: res,
                statusCode: 200
            }
        }catch(e){
            return {
                body: {
                    error: e.message,
                },
                statusCode: e.statusCode
            }
        }
    }
}