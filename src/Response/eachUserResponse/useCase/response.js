const { makeResponseClass } = require('../response')

module.exports = function makeResponseUsecase ({ findUserData}) {
    return async function responseCase ({ user }) {
        const userInfo = makeResponseClass({ user})
        const response = await findUserData({ user })
        userInfo.response = response
        return {
            userId: userInfo.user,
            response: userInfo.response
        }
    }
}