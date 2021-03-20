const { Response } = require('../../response')
const status = require('../../response/status.config.json')
const statusCode = status.status400

module.exports = function buildResponseClass () {
    return function makeResponseClass({ user, response }) {
        class UserResponse extends Response {
            constructor({ user, response }) {
                super({ user, response })
                if(this.user === null ) {
                    throw {
                        message: 'userId is missing',
                        statusCode
                    }
                }
            }
        }
        return response ? 
            new UserResponse({ user, response }) : new UserResponse({ user })
    }
}