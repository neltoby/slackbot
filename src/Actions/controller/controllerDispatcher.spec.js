const { eventaction } = require('../../../__test__/actions')
const { viewAction } =  require('../../../__test__/view')
const controllerDispatcher = require('./controllerDispatcher')

describe('controllerDispatcher', () => {

    test('controllerDispatcher fxn actionCase', () => {
        const mockFxn = jest.fn()
        const fakeAction = eventaction({})
        fakeAction.type = 'block_actions'
        const payload = { body: {
            payload: JSON.stringify(fakeAction)
        }}
        const actionDispatchController = controllerDispatcher({ 
            actionCase: mockFxn,
            modalCase: mockFxn
        })
        expect(typeof actionDispatchController).toBe('function')
        expect(typeof actionDispatchController(payload)).toBe('function')
    })

    test('controllerDispatcher fxn modalCase', () => {
        const mockFxn = jest.fn()
        const fakeAction = viewAction({})
        const payload = { body: {
            payload: JSON.stringify(fakeAction)
        }}
        const actionDispatchController = controllerDispatcher({ 
            actionCase: mockFxn,
            modalCase: mockFxn
        })
        expect(typeof actionDispatchController).toBe('function')
        expect(typeof actionDispatchController(payload)).toBe('function')
    })
})