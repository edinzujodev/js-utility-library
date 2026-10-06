// index.js

const arrayUtils = require('./src/arrayUtils');
const dateUtils = require('./src/dateUtils');
const functionUtils = require('./src/functionUtils');
const objectUtils = require('./src/objectUtils');
const stringUtils = require('./src/stringUtils');

module.exports = { ...arrayUtils, ...dateUtils, ...functionUtils, ...objectUtils, ...stringUtils };
