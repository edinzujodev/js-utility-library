// tests/dateUtils.test.js

const { formatDate, addDays } = require('../src/dateUtils');

test('formats date to YYYY-MM-DD', () => {
    const date = new Date('2023-08-02');
    expect(formatDate(date)).toBe('2023-08-02');
});

test('adds days to a date', () => {
    const date = new Date('2023-08-02');
    const result = new Date('2023-08-04');
    expect(addDays(date, 2)).toEqual(result);
});