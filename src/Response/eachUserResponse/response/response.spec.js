const { makeResponseClass } = require('.')

describe('response', () => {
    test('response class with user parameter', () => {
        const responseInstance = makeResponseClass({ user: 'Uwrwuete'});
        expect(responseInstance.user).toBe('Uwrwuete');
        expect(responseInstance.response).toBeNull();
        responseInstance.response = []
        expect(responseInstance.response).not.toBeNull();
    })

    test('response class with user and response parameter', () => {
        const responseInstance = makeResponseClass({ user: 'Uwrwuete', response: [] });
        expect(responseInstance.user).toBe('Uwrwuete');
        expect(responseInstance.response).not.toBeNull();
    })

    test('response class with no parameter', () => {
        expect(() => makeResponseClass({})).toThrow();
    })
})