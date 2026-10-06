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
    // Array.from splits by code point, so emoji and other surrogate pairs stay intact
    return Array.from(str).reverse().join('');
}

/**
 * Shortens a string to at most maxLength characters, ending with a suffix if cut.
 * @param {string} str
 * @param {number} maxLength
 * @param {string} [suffix='...']
 * @returns {string}
 */
function truncate(str, maxLength, suffix = '...') {
    const chars = Array.from(str);
    if (chars.length <= maxLength) {
        return str;
    }
    const keep = Math.max(0, maxLength - Array.from(suffix).length);
    return chars.slice(0, keep).join('') + suffix;
}

/**
 * Converts a string to a URL-friendly slug, e.g. 'Héllo World!' -> 'hello-world'.
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
    return str
        .normalize('NFD')
        .replace(/\p{M}/gu, '') // strip accents left over by NFD
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Splits a string into words on spaces, punctuation and camelCase boundaries.
 * @param {string} str
 * @returns {string[]}
 */
function splitWords(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean);
}

/**
 * Converts a string to camelCase, e.g. 'hello world' -> 'helloWorld'.
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
    return splitWords(str)
        .map((word, i) => {
            const lower = word.toLowerCase();
            return i === 0 ? lower : capitalizeFirstLetter(lower);
        })
        .join('');
}

/**
 * Converts a string to kebab-case, e.g. 'helloWorld' -> 'hello-world'.
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
    return splitWords(str).map(word => word.toLowerCase()).join('-');
}

module.exports = { capitalizeFirstLetter, reverseString, truncate, slugify, toCamelCase, toKebabCase };