// tests/arrayUtils.test.js

const { removeDuplicates, intersect } = require('../src/arrayUtils');

test('removes duplicates from an array', () => {
    const array = [1, 2, 2, 3, 4, 4, 5];
    expect(removeDuplicates(array)).toEqual([1, 2, 3, 4, 5]);
});

test('finds the intersection of two arrays', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [3, 4, 5, 6];
    expect(intersect(array1, array2)).toEqual([3, 4]);
});