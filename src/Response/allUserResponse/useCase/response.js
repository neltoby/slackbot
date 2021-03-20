const { Response } = require('../../response')

module.exports = function makeAllResponseUsecase ({ findAllUserData}) {
    return async function allResponseCase () {
        let userInfo = []
        const response = await findAllUserData()
        
        response.forEach(res => {
            const users = new Response({})
            users.user = res.user
            users.response = res.response
            userInfo = [...userInfo, users]
        });
        return {
            users: userInfo,
        }
    }
}