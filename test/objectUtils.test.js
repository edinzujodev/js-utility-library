// tests/objectUtils.test.js

const { pick, omit, get, isEmpty } = require('../src/objectUtils');

const user = {
    name: 'Edin',
    age: 30,
    address: { city: 'Sarajevo', streets: [{ name: 'Ferhadija' }] },
};

test('picks only the given keys', () => {
    expect(pick(user, ['name', 'age'])).toEqual({ name: 'Edin', age: 30 });
});

test('pick skips keys the object does not have', () => {
    expect(pick(user, ['name', 'missing'])).toEqual({ name: 'Edin' });
});

test('omits the given keys without mutating the input', () => {
    expect(omit(user, ['address', 'age'])).toEqual({ name: 'Edin' });
    expect(user.age).toBe(30);
});

test('reads nested values with a dot/bracket path', () => {
    expect(get(user, 'address.city')).toBe('Sarajevo');
    expect(get(user, 'address.streets[0].name')).toBe('Ferhadija');
    expect(get(user, ['address', 'streets', 0, 'name'])).toBe('Ferhadija');
});

test('get returns the default for missing paths', () => {
    expect(get(user, 'address.zip', '71000')).toBe('71000');
    expect(get(user, 'job.title.level', 'n/a')).toBe('n/a');
    expect(get(null, 'a.b')).toBeUndefined();
});

test('get keeps falsy values that are not undefined', () => {
    expect(get({ a: { b: 0 } }, 'a.b', 5)).toBe(0);
    expect(get({ a: null }, 'a', 5)).toBeNull();
});

test('detects empty values', () => {
    for (const value of [null, undefined, '', [], {}, new Map(), new Set()]) {
        expect(isEmpty(value)).toBe(true);
    }
});

test('detects non-empty values', () => {
    for (const value of ['a', [0], { a: undefined }, new Map([[1, 1]]), new Set([1]), 0, false]) {
        expect(isEmpty(value)).toBe(false);
    }
});
