const redis = require('redis')

const { promisify } = require('util')
const { logger } = require('../Logger')
const { botResponse } = require('../../../botResponse.config')

const client = redis.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
})

// const client = redis.createClient(`${process.env.REDIS_HOSTNAME}://${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`)

client.on('ready', async () => {
    await logger.info(
        `${new Date()} :::: redis.connection.ready`
    )
}) 

client.on('connect', async () => {
    await logger.info(
        `${new Date()} :::: redis.connection.connected`
    )
})

client.on('error', err => {
    logger.error(
        `${new Date()} :::: redis.connection.failed :::: ${err.message}`
    )
}) 

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.setex).bind(client)

const cacheVariable = async ({ varName , varValue }) => {
    if(!varName){
        logger.error(
            `${new Date()} :::: cacheVariable function :::: varName is missing`
        )
        throw {
            message: 'varName is missing'
        }
    }
    if(!varValue){
        logger.error(
            `${new Date()} :::: cacheVariable function :::: varValue is missing`
        )
        throw {
            message: 'varValue is missing'
        }
    }
    const cached = await setAsync(varName, 180, JSON.stringify(varValue))
    logger.info(
        `${new Date()} :::: cacheVariable function :::: varName: ${varName} :::: varValue: ${varValue}`
    )
    if(cached === 'OK'){
        logger.info(
            `${new Date()} :::: cacheVariable function :::: caching was succesfull`
        )
        return {
            action: 'caching',
            success: true,
            message: 'caching was succesfull'
        }
    }
    logger.info(
        `${new Date()} :::: cacheVariable function :::: caching was not succesfull`
    )
    return {
        action: 'caching',
        success: false,
        message: 'caching was not succesfull'
    }
}

const getVariable = async (varName) => {
    if(!varName){
        logger.error(
            `${new Date()} :::: getVariable function :::: varName is missing`
        )
        throw {
            message: 'varName is missing'
        }
    }
    logger.info(
        `${new Date()} :::: getVariable function :::: client.get method :::: varName :::: ${varName}`
    )
    const getResponse = await getAsync(varName)
    if(getResponse){
        logger.info(
            `${new Date()} :::: getVariable function :::: client.get method :::: response exist :::: ${getResponse}`
        )
        return {
            action: 'get_cache',
            success: true,
            message: 'cached value exist',
            value: JSON.parse(getResponse),
        }
    }else{
        logger.info(
            `${new Date()} :::: getVariable function :::: client.get method :::: response do not exist`
        )
        return {
            action: 'get_cache',
            success: false,
            message: 'cached value does not exist',
        }
    }
}

const getAllCached = async (userId) => {
    if(!userId){
        logger.error(
            `${new Date()} :::: getAllCached function :::: missing userid`
        )
        throw {
            message: 'missing userId'
        }
    }
    let retval = []
    const arr = []
    arr.length = 4;
    arr.fill(0, 0);
    console.log(arr.length);
    logger.info(
        `${new Date()} :::: getAllCached function :::: ${userId}`
    )
    retval = await Promise.all(arr.map(async (item, i) => {
        let res = await getVariable(`${userId}_${botResponse[i]}`)
        logger.info(
            `${new Date()} :::: getAllCached function :::: ${userId} :::: ${JSON.stringify(res)} :::: ${userId}_${botResponse[i]}`
        )
        res['key'] = botResponse[i]
        res['key_position'] = i
        return res
    }))
    // for(let i = 0; i < arr.length; i++){
    //     (
    //         async () => {
    //             let res = await getVariable(`${userId}_${botResponse[i]}`)
    //             logger.info(
    //                 `${new Date()} :::: getAllCached function :::: ${userId} :::: ${JSON.stringify(res)} :::: ${userId}_${botResponse[i]}`
    //             )
    //             res['key'] = botResponse[i]
    //             res['key_position'] = i
    //             retval = [res, ...retval]
    //         }
    //     )()
    // }
    logger.info(
        `${new Date()} :::: getAllCached function :::: ${JSON.stringify(retval)}`
    )
    return retval
}

module.exports = {
    client,
    getVariable,
    cacheVariable,
    getAllCached,
}