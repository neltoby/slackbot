const makeAllResponseUsecase = require('./response')
const { findAllUserData } = require('../../../model')

const findAllUserDataFxn = async () => {
    const testFindUserData = async  (par) => {
        return await []
    }
    return process.env.NODE_ENV === 'test' ? await testFindUserData() :  await findAllUserData() ;
}

const allResponseCase = makeAllResponseUsecase({ findAllUserData: findAllUserDataFxn });

exports.allResponseCase = () => allResponseCase()