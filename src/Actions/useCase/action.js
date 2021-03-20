module.exports = function makeActionDispatcher({ saveData, dispatcher, logger, getVariable, cacheVariable }) {
    return async function actionCase ({ actions, user, trigger_id, channel }) {
        const apiRoot = process.env.NODE_ENV == 'test' ? 'slack' : process.env.API_ROOT ;
        logger.info(
            `${new Date()} :::: server.postRoute.${apiRoot}/action.useCase :::: actionCase.start`
        )
        const actionInstance = dispatcher({actions})({ actions, user, trigger_id, channel });
        const question = actionInstance.getQuestion;
        const answer = actionInstance.getSelected;
        const team_id = actionInstance.getUser.team_id;
        const id = actionInstance.getUser.id
        const username = actionInstance.getUser.username
        const name = actionInstance.getUser.name
        const varName = `${id}_${question}`

        const resetFxn = () => {
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/action.useCase :::: resetFxn`
            )
            actionInstance.reset = true
            actionInstance.blockDecider()
        }
        
        const res = await getVariable(varName)
        if(res.success) resetFxn()
        const cached = await cacheVariable({ varName, varValue: answer })

        // const doc = await saveData({ question, answer, team_id, id, username, name, trigger_id })
        // if(doc) console.log(doc)
        logger.info(
            `${new Date()} :::: server.postRoute.${apiRoot}/action.useCase :::: actionCase.end`
        )
        return actionInstance.getRetVal

    }
}