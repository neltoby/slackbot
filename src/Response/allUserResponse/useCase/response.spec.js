const { allResponseCase } = require('.')

describe('allResponseCase', () => {
    test('allResponseCase', async () => {
        const res = await allResponseCase()
        expect(res).toHaveProperty('users')
    })
})