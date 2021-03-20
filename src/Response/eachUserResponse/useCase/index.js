const makeResponseUsecase = require('./response')
const { findUserData } = require('../../../model')

const findUserDataFxn = async (prop) => {
    const testFindUserData = async  (par) => {
        return await []
    }
    return process.env.NODE_ENV === 'test' ? await testFindUserData(prop) :  await findUserData(prop) ;
}

const responseCase = makeResponseUsecase({ findUserData: findUserDataFxn })

exports.responseCase = props => responseCase(props);