const { Response } = require('.')

describe('response', () => {
    test('response class with user parameter', () => {
        const responseInstance = new Response({ user: 'Uwrwuete'});
        expect(responseInstance.user).toBe('Uwrwuete');
        expect(responseInstance.response).toBeNull();
        responseInstance.response = []
        expect(responseInstance.response).not.toBeNull();
    })

    test('response class with user and response parameter', () => {
        const responseInstance = new Response({ user: 'Uwrwuete', response: [] });
        expect(responseInstance.user).toBe('Uwrwuete');
        expect(responseInstance.response).not.toBeNull();
    })

    test('response class with no parameter', () => {
        const responseInstance = new Response({});
        expect(responseInstance.user).toBeNull();
        expect(responseInstance.response).toBeNull();
        responseInstance.user = 'Uwrwuete'
        responseInstance.response = []
        expect(responseInstance.user).toBe('Uwrwuete');
        expect(responseInstance.response).not.toBeNull();
    })
})