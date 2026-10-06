// src/dateUtils.js

/**
 * Formats a date to YYYY-MM-DD using the local timezone.
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Adds days to a date.
 * @param {Date} date
 * @param {number} days
 * @returns {Date}
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Returns the number of calendar days from one date to another.
 * Negative if the second date is earlier. Times of day are ignored.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
function daysBetween(date1, date2) {
    // Compare as UTC calendar days so DST changes don't produce fractional days
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.round((utc2 - utc1) / 86400000);
}

/**
 * Checks whether a year is a leap year.
 * @param {number} year
 * @returns {boolean}
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = { formatDate, addDays, daysBetween, isLeapYear };