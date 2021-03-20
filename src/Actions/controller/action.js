const apiRoot = process.env.NODE_ENV == 'test' ? 'slack' : process.env.API_ROOT ;
module.exports = function makeActionController({ actionDispatchController, logger }) {
    return async function actionController({ body }) {
        try{
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/action.actioncontroller`
            )
            let res =  await actionDispatchController({ body })()
            return {
                body: res
            }
        }catch(e) {
            logger.error(
                `${new Date()} :::: server.postRoute.${apiRoot}/action.actioncontroller :::: ${e.message}`
            )
            return{
                error: 'something went wrong'
            }
        }
    }
}