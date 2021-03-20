const { actionCase } = require('.')
const { eventaction } = require('../../../__test__/actions')

describe('eventaction', () => {

    test('eventaction', async () => {
        const retval = await actionCase(eventaction({}))
        expect(retval).toHaveProperty('replace_original');
        expect(retval).toHaveProperty('channel');
        expect(retval).toHaveProperty('blocks');
    })
})
