const { actionController } = require('.')
const { eventaction} = require('../../../__test__/actions')

describe('action controller', () => {
    test('action controller', async () => {
        const fakeAction = eventaction({})
        fakeAction.type = 'block_actions';
        const payload = {
            body: {
                payload: JSON.stringify(fakeAction)
            }
        }
        expect(await actionController(payload)).toHaveProperty('body')
    })
    
})