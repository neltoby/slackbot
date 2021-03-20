const { makeAction3Fxn } = require('.')
const { eventaction } = require('../../../__test__/actions')

describe('makeAction3Fxn', () => {
    test('makeAction3Fxn', () => {
        const fakeAction = eventaction({})
        fakeAction.actions[0].selected_options = [
            {
              text: { type: 'plain_text', text: 'Footbal', emoji: true },
              value: 'Football'
            },
            {
              text: { type: 'plain_text', text: 'Swimming', emoji: true },
              value: 'Swimming'
            }
        ]
        const newAxn = makeAction3Fxn(fakeAction)
        expect(newAxn.getChannel).toHaveProperty('id')
        expect(newAxn.getChannel).toHaveProperty('name')
        expect(newAxn.getTriggerId).toBeDefined()
        expect(newAxn.getUser).toHaveProperty('id')
        expect(newAxn.getUser).toHaveProperty('name')
        expect(newAxn.getUser).toHaveProperty('username')
        expect(newAxn.getUser).toHaveProperty('team_id')
        expect(newAxn.getActions).toHaveProperty('type')
        expect(newAxn.getActions).toHaveProperty('action_id')
        expect(newAxn.getActions).toHaveProperty('block_id')
        expect(newAxn.getActions).toHaveProperty('selected_option')
        expect(newAxn.getActions).toHaveProperty('placeholder')
        expect(newAxn.getActions).toHaveProperty('action_ts')
        expect(newAxn.getSelected).not.toBeNull()
        expect(newAxn.getQuestion).not.toBeNull()
        // expect(newAxn.getRetVal).toHaveProperty('channel')
        expect(newAxn.getRetVal).toHaveProperty('view')
        expect(newAxn.getRetVal.view.blocks[0].block_id).toBe('actions_4')
    })
})