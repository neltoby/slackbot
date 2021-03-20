const { ActionService } = require('./actionService')
const { eventaction } = require('../../../__test__/actions')

describe('actionservice', () => {
    test('throw if actions is missing', () => {
        expect(() => new ActionService(eventaction({actions: null})))
    })

    test('throw if channel is missing', () => {
        expect(() => new ActionService(eventaction({channel: null})))
    })

    test('throw if user is missing', () => {
        expect(() => new ActionService(eventaction({user: null})))
    })

    test('throw if trigger_id is missing', () => {
        expect(() => new ActionService(eventaction({trigger_id: null})))
    })
})