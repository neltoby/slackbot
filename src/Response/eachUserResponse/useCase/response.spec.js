const { responseCase } = require('.')

describe('responseCase', () => {
    test('responseCase', async () => {
        const response = await responseCase({ user: 'userid' })
        expect(response).toHaveProperty('userId')
        expect(response).toHaveProperty('response')
    })
})