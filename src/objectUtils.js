// src/objectUtils.js

/**
 * Creates a new object with only the given keys.
 * @param {Object} obj
 * @param {string[]} keys
 * @returns {Object}
 */
function pick(obj, keys) {
    const result = {};
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * Creates a new object without the given keys.
 * @param {Object} obj
 * @param {string[]} keys
 * @returns {Object}
 */
function omit(obj, keys) {
    const exclude = new Set(keys);
    const result = {};
    for (const key of Object.keys(obj)) {
        if (!exclude.has(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * Safely reads a nested value, e.g. get(user, 'address.streets[0].name').
 * @param {Object} obj
 * @param {string|Array<string|number>} path - Dot/bracket path or array of keys.
 * @param {*} [defaultValue] - Returned when the value is missing or undefined.
 * @returns {*}
 */
function get(obj, path, defaultValue) {
    const keys = Array.isArray(path) ? path : path.match(/[^.[\]]+/g) || [];
    let current = obj;
    for (const key of keys) {
        if (current === null || current === undefined) {
            return defaultValue;
        }
        current = current[key];
    }
    return current === undefined ? defaultValue : current;
}

/**
 * Checks whether a value is empty: null, undefined, an empty string, array,
 * Map or Set, or an object with no own keys. Numbers and booleans are never empty.
 * @param {*} value
 * @returns {boolean}
 */
function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
}

module.exports = { pick, omit, get, isEmpty };
