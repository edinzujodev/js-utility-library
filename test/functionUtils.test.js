// tests/functionUtils.test.js

const { debounce, throttle, memoize, once } = require('../src/functionUtils');

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

test('debounce calls once with the latest arguments after the wait', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced('a');
    jest.advanceTimersByTime(50);
    debounced('b');
    jest.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('b');
});

test('debounce can be cancelled', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();
    jest.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
});

test('debounce keeps the calling context', () => {
    const obj = { value: 42, read: debounce(function () { this.result = this.value; }, 10) };
    obj.read();
    jest.advanceTimersByTime(10);
    expect(obj.result).toBe(42);
});

test('throttle runs immediately, then once more at the end of the wait', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled(1);
    throttled(2);
    throttled(3);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(1);

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(3);
});

test('throttle allows a new immediate call after the wait', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled(1);
    jest.advanceTimersByTime(150);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
});

test('throttle can cancel a pending call', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled(1);
    throttled(2);
    throttled.cancel();
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
});

test('memoize caches results by the first argument', () => {
    const square = jest.fn(n => n * n);
    const fastSquare = memoize(square);

    expect(fastSquare(4)).toBe(16);
    expect(fastSquare(4)).toBe(16);
    expect(square).toHaveBeenCalledTimes(1);
    expect(fastSquare.cache.size).toBe(1);
});

test('memoize uses a resolver for multi-argument keys', () => {
    const add = jest.fn((a, b) => a + b);
    const fastAdd = memoize(add, (a, b) => `${a},${b}`);

    expect(fastAdd(1, 2)).toBe(3);
    expect(fastAdd(1, 3)).toBe(4);
    expect(fastAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(2);
});

test('once only runs the function the first time', () => {
    const init = jest.fn(() => 'ready');
    const initOnce = once(init);

    expect(initOnce()).toBe('ready');
    expect(initOnce()).toBe('ready');
    expect(init).toHaveBeenCalledTimes(1);
});
