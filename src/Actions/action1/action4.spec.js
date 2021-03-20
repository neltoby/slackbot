const { makeAction4Fxn } = require('.')
const { viewAction } = require('../../../__test__/view')

describe('makeAction4Fxn', () => {

    test('makeAction4Fxn instantiation', () => {
        const fakeViewAction = viewAction({})
        fakeViewAction.channel = fakeViewAction.view.private_metadata
        fakeViewAction.actions = [{}]
        const newAxn = makeAction4Fxn(fakeViewAction)
        expect(newAxn.getChannel).not.toBeNull()
        expect(newAxn.getTriggerId).toBeDefined()
        expect(newAxn.getUser).toHaveProperty('id')
        expect(newAxn.getUser).toHaveProperty('name')
        expect(newAxn.getUser).toHaveProperty('username')
        expect(newAxn.getUser).toHaveProperty('team_id')
        expect(newAxn.getSelected).not.toBeNull()
        expect(newAxn.getQuestion).not.toBeNull()
        expect(newAxn.getRetVal).toHaveProperty('blocks')
        expect(newAxn.getRetVal.blocks[0]).toHaveProperty('type')
    })

})