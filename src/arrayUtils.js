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
    return array1.filter(value => array2.includes(value));
}

module.exports = { removeDuplicates, intersect };