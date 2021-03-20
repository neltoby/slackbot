const { makeAction4Fxn } = require('../action1')

module.exports = function makeModalCase ({ saveData, logger, getVariable, cacheVariable, getAllCached }) {
    return async function modalCase({ view, actions, user, trigger_id, channel }) {
        const apiRoot = process.env.NODE_ENV == 'test' ? 'slack' : process.env.API_ROOT ;
        logger.info(
            `${new Date()} :::: server.postRoute.${apiRoot}/action.useCase :::: modalCase.start`
        )
        const actionInstance = makeAction4Fxn({ view, actions, user, trigger_id, channel })
        const question = actionInstance.getQuestion;
        const answer = actionInstance.getSelected;
        const team_id = actionInstance.getUser.team_id;
        const id = actionInstance.getUser.id
        const username = actionInstance.getUser.username
        const name = actionInstance.getUser.name
        const varName = `${id}_${question}`

        const addToDb = async (allRes) => {
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: addToDb`
            )
            let response = [{
                question_0: allRes[0].value, 
                question_1: allRes[1].value, 
                question_2: allRes[2].value, 
                question_3: allRes[3].value, 
            }]
            const doc = await saveData({ response, id, username, name, team_id })
        }

        const modifyBlock = async () => {
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: modifyBlock`
            )
            const allRes = await getAllCached(id)
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: modifyBlock :::: allRes :::: ${allRes}`
            )
            let notAvailable = []
            allRes.forEach(item => {
                if(!item.hasOwnProperty('value')) notAvailable = [item, ...notAvailable]
            })
            if(notAvailable.length) {
                resetBlock(notAvailable)
            }else{
                addToDb(allRes)
            }
        }

        const resetFxn = () => {
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: resetFxn`
            )
            actionInstance.reset = true
            actionInstance.blockDecider()
        }
        
        const resetBlock = (notAvailable) => {
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: resetBlock`
            )
            actionInstance.blockModifier(notAvailable)
        }

        const res = await getVariable(varName)
        if(res.success) resetFxn()
        const cached = await cacheVariable({ varName, varValue: answer })
        if(cached.success){
            logger.info(
                `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: cache was successful`
            )
            modifyBlock()
        }
        logger.info(
            `${new Date()} :::: server.postRoute.${apiRoot}/modal.useCase :::: modalCase.end`
        )
        return actionInstance.getRetVal
    }
}