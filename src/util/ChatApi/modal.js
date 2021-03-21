const axios = require('axios')
const { logger } = require('../Logger')
const apiRoot = process.env.API_ROOT;



const postModal = async response => {
    try{
        const data = JSON.stringify(response)

        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BOT_TOKEN}`
            }
        }

        const res = await axios.post('https://slack.com/api/views.open', data, config) 
    }catch(error) {
        logger.error(
            error
        )
    }

}

exports.postModal = postModal