// tests/arrayUtils.test.js

const { removeDuplicates, intersect, difference, chunk, groupBy, range, partition, zip } = require('../src/arrayUtils');

test('removes duplicates from an array', () => {
    const array = [1, 2, 2, 3, 4, 4, 5];
    expect(removeDuplicates(array)).toEqual([1, 2, 3, 4, 5]);
});

test('finds the intersection of two arrays', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [3, 4, 5, 6];
    expect(intersect(array1, array2)).toEqual([3, 4]);
});

test('finds values in the first array that are not in the second', () => {
    expect(difference([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2]);
});

test('splits an array into chunks', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 3)).toEqual([]);
});

test('chunk rejects an invalid size', () => {
    expect(() => chunk([1, 2], 0)).toThrow(RangeError);
    expect(() => chunk([1, 2], 1.5)).toThrow(RangeError);
});

test('groups items by a key function', () => {
    expect(groupBy([1, 2, 3, 4, 5], n => (n % 2 === 0 ? 'even' : 'odd'))).toEqual({
        odd: [1, 3, 5],
        even: [2, 4],
    });
});

test('groups items by a property name', () => {
    const people = [
        { name: 'Ana', city: 'Sarajevo' },
        { name: 'Ben', city: 'Mostar' },
        { name: 'Cid', city: 'Sarajevo' },
    ];
    expect(groupBy(people, 'city')).toEqual({
        Sarajevo: [people[0], people[2]],
        Mostar: [people[1]],
    });
});

test('creates numeric ranges', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(2, 6)).toEqual([2, 3, 4, 5]);
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
    expect(range(5, 0, -2)).toEqual([5, 3, 1]);
    expect(range(3, 3)).toEqual([]);
});

test('range rejects a zero step', () => {
    expect(() => range(0, 5, 0)).toThrow(RangeError);
});

test('partitions items by a predicate', () => {
    expect(partition([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual([[2, 4], [1, 3, 5]]);
    expect(partition([], Boolean)).toEqual([[], []]);
});

test('zips arrays together up to the shortest length', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
    expect(zip([1, 2, 3], ['a'])).toEqual([[1, 'a']]);
    expect(zip()).toEqual([]);
});
