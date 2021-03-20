const{ modalCase } = require('.')
const { viewAction } = require('../../../__test__/view')

describe('modalCase', () => {
    test('modalCase', async () => {
        const fakeViewAction = viewAction({})
        fakeViewAction.channel = fakeViewAction.view.private_metadata
        fakeViewAction.actions = [{}]
        const retval = await modalCase(fakeViewAction)
        expect(retval).toHaveProperty('blocks');
        expect(retval).toHaveProperty('channel');
        expect(retval.blocks[0]).toHaveProperty('type', 'context');
    })
})