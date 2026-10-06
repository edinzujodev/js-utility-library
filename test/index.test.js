// tests/index.test.js

const lib = require('..');

test('package entry point exports all utilities', () => {
    for (const name of ['removeDuplicates', 'intersect', 'formatDate', 'addDays', 'capitalizeFirstLetter', 'reverseString',
        'difference', 'chunk', 'groupBy', 'range', 'daysBetween', 'isLeapYear', 'truncate', 'slugify', 'toCamelCase', 'toKebabCase',
        'partition', 'zip', 'pick', 'omit', 'get', 'isEmpty', 'debounce', 'throttle', 'memoize', 'once']) {
        expect(typeof lib[name]).toBe('function');
    }
});
