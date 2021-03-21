const { postChat } = require('./message')
const { postModal } = require('./modal')

const app = () => {}

const apiDispatcher = async  (response) => {
  if(response.blocks){
    return await postChat(response)
  }else{
    return await postModal(response)
  }
}

exports.apiDispatcher = apiDispatcher;
exports.postChat = postChat;
