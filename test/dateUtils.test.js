// tests/dateUtils.test.js

const { formatDate, addDays, daysBetween, isLeapYear } = require('../src/dateUtils');

// Dates are built from local components; new Date('2023-08-02') is parsed as UTC
// midnight and would format as the previous day in timezones west of UTC.
test('formats date to YYYY-MM-DD', () => {
    const date = new Date(2023, 7, 2);
    expect(formatDate(date)).toBe('2023-08-02');
});

test('adds days to a date', () => {
    const date = new Date(2023, 7, 2);
    const result = new Date(2023, 7, 4);
    expect(addDays(date, 2)).toEqual(result);
});

test('adds days across a month boundary', () => {
    expect(formatDate(addDays(new Date(2023, 7, 30), 3))).toBe('2023-09-02');
});

test('does not mutate the input date', () => {
    const date = new Date(2023, 7, 2);
    addDays(date, 5);
    expect(formatDate(date)).toBe('2023-08-02');
});

test('counts calendar days between two dates', () => {
    expect(daysBetween(new Date(2023, 7, 2), new Date(2023, 7, 12))).toBe(10);
    expect(daysBetween(new Date(2023, 7, 12), new Date(2023, 7, 2))).toBe(-10);
});

test('daysBetween ignores the time of day', () => {
    expect(daysBetween(new Date(2023, 7, 2, 23, 59), new Date(2023, 7, 3, 0, 1))).toBe(1);
});

test('daysBetween is not affected by daylight saving changes', () => {
    // Spans the spring and autumn clock changes in most DST-observing timezones
    expect(daysBetween(new Date(2023, 0, 1), new Date(2024, 0, 1))).toBe(365);
});

test('detects leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
});
