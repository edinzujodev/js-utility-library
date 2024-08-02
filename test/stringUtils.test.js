// tests/stringUtils.test.js

const { capitalizeFirstLetter, reverseString } = require('../src/stringUtils');

test('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('edin')).toBe('Edin');
});

test('reverses a string', () => {
    expect(reverseString('edin')).toBe('nide');
});
