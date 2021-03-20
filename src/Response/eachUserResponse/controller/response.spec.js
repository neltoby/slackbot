const { responseController } = require('.')

describe('responseController', () => {
    test('responseController', async () => {
        const res = await responseController({ user: 'Uretyers' })
        expect(res).toHaveProperty('body')
        expect(res.body).toHaveProperty('userId')
        expect(res).toHaveProperty('statusCode')
        expect(res.statusCode).toBe(200)
    })
})