module.exports = function makeUseCaseDispatcher({ 
    makeAction1Fxn, 
    makeAction2Fxn,
    makeAction3Fxn
})
{
    return function useCaseDispatcher ({ actions }) {
        const { block_id, action_id } = actions[0]
        if(block_id === 'actions_1' && action_id === 'select_1') 
            return makeAction1Fxn
        if(block_id === 'actions_2' && action_id === 'select_2') 
            return makeAction2Fxn
        if(block_id === 'actions_3' && action_id === 'select_3') 
            return makeAction3Fxn
    }
}