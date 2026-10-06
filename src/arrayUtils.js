// src/arrayUtils.js

/**
 * Removes duplicates from an array.
 * @param {Array} array
 * @returns {Array}
 */
function removeDuplicates(array) {
    return [...new Set(array)];
}

/**
 * Finds the intersection of two arrays.
 * @param {Array} array1
 * @param {Array} array2
 * @returns {Array}
 */
function intersect(array1, array2) {
    const lookup = new Set(array2);
    return array1.filter(value => lookup.has(value));
}

/**
 * Returns the values of the first array that are not in the second.
 * @param {Array} array1
 * @param {Array} array2
 * @returns {Array}
 */
function difference(array1, array2) {
    const exclude = new Set(array2);
    return array1.filter(value => !exclude.has(value));
}

/**
 * Splits an array into chunks of the given size. The last chunk may be smaller.
 * @param {Array} array
 * @param {number} size - A positive integer.
 * @returns {Array<Array>}
 */
function chunk(array, size) {
    if (!Number.isInteger(size) || size < 1) {
        throw new RangeError('size must be a positive integer');
    }
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Groups array items by a key function or property name.
 * @param {Array} array
 * @param {Function|string} key - Function returning the group key, or a property name.
 * @returns {Object<string, Array>}
 */
function groupBy(array, key) {
    const getKey = typeof key === 'function' ? key : item => item[key];
    const groups = {};
    for (const item of array) {
        const groupKey = getKey(item);
        if (!Object.prototype.hasOwnProperty.call(groups, groupKey)) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
    }
    return groups;
}

/**
 * Creates an array of numbers from start up to, but not including, end.
 * With a single argument, counts from 0 to that number.
 * @param {number} start
 * @param {number} [end]
 * @param {number} [step=1] - Must not be 0; use a negative step to count down.
 * @returns {number[]}
 */
function range(start, end, step = 1) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (step === 0) {
        throw new RangeError('step must not be 0');
    }
    const result = [];
    for (let i = start; step > 0 ? i < end : i > end; i += step) {
        result.push(i);
    }
    return result;
}

/**
 * Splits an array into two: items that pass the predicate and items that don't.
 * @param {Array} array
 * @param {Function} predicate
 * @returns {[Array, Array]} [passing, failing]
 */
function partition(array, predicate) {
    const pass = [];
    const fail = [];
    for (const item of array) {
        (predicate(item) ? pass : fail).push(item);
    }
    return [pass, fail];
}

/**
 * Combines arrays element by element, stopping at the shortest array.
 * @param {...Array} arrays
 * @returns {Array<Array>}
 */
function zip(...arrays) {
    if (arrays.length === 0) {
        return [];
    }
    const length = Math.min(...arrays.map(array => array.length));
    return Array.from({ length }, (_, i) => arrays.map(array => array[i]));
}

module.exports = { removeDuplicates, intersect, difference, chunk, groupBy, range, partition, zip };