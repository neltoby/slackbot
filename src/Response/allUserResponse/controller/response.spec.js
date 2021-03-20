const { allResponseController } = require('.')

describe('allResponseController', () => {
    test('allResponseController', async () => {
        const res = await allResponseController()
        expect(res).toHaveProperty('body')
        expect(res.body).toHaveProperty('users')
        expect(res).toHaveProperty('statusCode', 200)
    })
})