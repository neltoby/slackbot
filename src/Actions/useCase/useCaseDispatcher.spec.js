const makeUseCaseDispatcher = require('./useCaseDispatcher')

describe('makeUseCaseDispatcher function', () => {

    test('makeUseCaseDispatcher shud return a function', () => {
        const mockFxn = jest.fn()
        let actions
        const useCaseDispatcher = makeUseCaseDispatcher({ 
            makeAction1Fxn: mockFxn, 
            makeAction2Fxn: mockFxn,
            makeAction3Fxn: mockFxn,
        })
        expect(typeof useCaseDispatcher).toBe('function')
        actions = [{
            action_id: 'select_1',
            block_id: 'actions_1',
        }]
        fxnname = useCaseDispatcher({ actions })
        expect(typeof fxnname).toBe('function')
        actions = [{
            action_id: 'select_2',
            block_id: 'actions_2',
        }]
        fxnname = useCaseDispatcher({ actions })
        expect(typeof fxnname).toBe('function')
        actions = [{
            action_id: 'select_3',
            block_id: 'actions_3',
        }]
        fxnname = useCaseDispatcher({ actions })
        console.log(fxnname.name)
        expect(typeof useCaseDispatcher({ actions })).toBe('function')
    })

})