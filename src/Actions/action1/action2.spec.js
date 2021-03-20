const { makeAction2Fxn } = require('.')
const { eventaction } = require('../../../__test__/actions')

describe('makeAction2Fxn', () => {
    test('makeAction2Fxn', () => {
        const fakeAction = eventaction({})
        fakeAction.actions[0].selected_options = [
            {
              text: { type: 'plain_text', text: '13:00', emoji: true },
              value: 'Monday 13:00'
            },
            {
              text: { type: 'plain_text', text: '14:00', emoji: true },
              value: 'Tuesday 14:00'
            }
        ]
        const newAxn = makeAction2Fxn(fakeAction)
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
        expect(newAxn.getRetVal).toHaveProperty('channel')
        expect(newAxn.getRetVal).toHaveProperty('blocks')
        expect(newAxn.getRetVal.blocks[0].block_id).toBe('actions_3')
    })
})