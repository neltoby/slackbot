module.exports = function controllerDispatcher ( {actionCase, modalCase} ){
    return  function actionDispatchController ({ body }) {

        const { payload } = body
        const pay = JSON.parse(payload)
        const { type } = pay
        if(type === 'block_actions') {
            const { actions, user, trigger_id, channel } = pay
            return () => actionCase({ actions, user, trigger_id, channel })        
        }
        if(type === 'view_submission'){
            const { view, user, trigger_id } = pay
            const actions = [{}]
            const { private_metadata } = view
            return () => modalCase({ view, actions, user, trigger_id, channel: private_metadata })
        }   
        if(type === 'view_closed'){}
    }
}