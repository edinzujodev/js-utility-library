// tests/stringUtils.test.js

const { capitalizeFirstLetter, reverseString, truncate, slugify, toCamelCase, toKebabCase } = require('../src/stringUtils');

test('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('edin')).toBe('Edin');
});

test('reverses a string', () => {
    expect(reverseString('edin')).toBe('nide');
});


test('reverses a string containing emoji', () => {
    expect(reverseString('a😀b')).toBe('b😀a');
});

test('capitalizeFirstLetter handles an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
});

test('truncates long strings with a suffix', () => {
    expect(truncate('Hello world', 8)).toBe('Hello...');
    expect(truncate('Hello world', 8, '…')).toBe('Hello w…');
});

test('truncate leaves short strings unchanged', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Hello', 5)).toBe('Hello');
});

test('truncate does not split emoji', () => {
    expect(truncate('😀😀😀😀😀', 4)).toBe('😀...');
});

test('creates URL slugs', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('  Ćevapi & Burek  ')).toBe('cevapi-burek');
    expect(slugify('Héllo---Wörld')).toBe('hello-world');
});

test('converts strings to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
    expect(toCamelCase('Hello-World_foo')).toBe('helloWorldFoo');
    expect(toCamelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
});

test('converts strings to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
    expect(toKebabCase('Hello World_foo')).toBe('hello-world-foo');
    expect(toKebabCase('XMLHttpRequest')).toBe('xml-http-request');
});
