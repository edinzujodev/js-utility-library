// src/stringUtils.js

/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverses a string.
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}

module.exports = { capitalizeFirstLetter, reverseString };