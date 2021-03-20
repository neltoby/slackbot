const status = require('./status.config.json')
const statusCode = status.status400
exports.Response = class Response {
    constructor({ user, response }) {
        this._user = user ? user : null ;
        this._response = response ? response : null ;
        if(this._response  && this._user === null){
            throw {
                message: 'Response is not tagged to a user',
                statusCode
            }
        }
    }

    get user () {
        return this._user
    }
    set user (val) {
        if(!val){
            throw {
                message: 'User id missing',
                statusCode
            }
        }
        this._user = val;
    }

    get response() {
        return this._response;
    }

    set response(res) {
        if(!res){
            throw {
                message: 'Missing response',
                statusCode
            }
        }
        this._response = res
    }
}