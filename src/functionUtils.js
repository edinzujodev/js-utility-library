// src/functionUtils.js

/**
 * Delays calling fn until wait ms have passed since the last call.
 * Useful for search inputs and resize handlers.
 * @param {Function} fn
 * @param {number} wait - Milliseconds.
 * @returns {Function} Debounced function with a cancel() method.
 */
function debounce(fn, wait) {
    let timer = null;
    function debounced(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, wait);
    }
    debounced.cancel = () => {
        clearTimeout(timer);
        timer = null;
    };
    return debounced;
}

/**
 * Calls fn at most once every wait ms. The first call runs immediately;
 * calls made during the wait run once at the end with the latest arguments.
 * @param {Function} fn
 * @param {number} wait - Milliseconds.
 * @returns {Function} Throttled function with a cancel() method.
 */
function throttle(fn, wait) {
    let lastCall = -Infinity;
    let timer = null;
    let pendingArgs = null;
    let pendingThis = null;

    function throttled(...args) {
        const remaining = wait - (Date.now() - lastCall);
        if (remaining <= 0) {
            lastCall = Date.now();
            fn.apply(this, args);
            return;
        }
        pendingArgs = args;
        pendingThis = this;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                lastCall = Date.now();
                fn.apply(pendingThis, pendingArgs);
                pendingArgs = pendingThis = null;
            }, remaining);
        }
    }
    throttled.cancel = () => {
        clearTimeout(timer);
        timer = null;
        pendingArgs = pendingThis = null;
    };
    return throttled;
}

/**
 * Caches fn's results. By default the first argument is the cache key;
 * pass a resolver to build the key from all arguments.
 * @param {Function} fn
 * @param {Function} [resolver] - Receives the arguments and returns a cache key.
 * @returns {Function} Memoized function with its Map exposed as .cache.
 */
function memoize(fn, resolver) {
    const cache = new Map();
    function memoized(...args) {
        const key = resolver ? resolver(...args) : args[0];
        if (!cache.has(key)) {
            cache.set(key, fn.apply(this, args));
        }
        return cache.get(key);
    }
    memoized.cache = cache;
    return memoized;
}

/**
 * Makes fn run only on the first call; later calls return the first result.
 * @param {Function} fn
 * @returns {Function}
 */
function once(fn) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

module.exports = { debounce, throttle, memoize, once };
