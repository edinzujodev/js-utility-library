# Advanced JS Utility Library

An advanced JavaScript utility library for comprehensive data manipulation and formatting tasks.

## Installation

```bash
npm install advanced-js-utility-library

## Usage

```bash
const { removeDuplicates, intersect } = require('advanced-js-utility-library/src/arrayUtils');

const array = [1, 2, 2, 3, 4, 4, 5];
console.log(removeDuplicates(array)); // [1, 2, 3, 4, 5]

const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
console.log(intersect(array1, array2)); // [3, 4]
```

```bash
const { formatDate, addDays } = require('advanced-js-utility-library/src/dateUtils');

const date = new Date('2023-08-02');
console.log(formatDate(date)); // '2023-08-02'

const newDate = addDays(date, 2);
console.log(formatDate(newDate)); // '2023-08-04'
```

```bash
const { capitalizeFirstLetter, reverseString } = require('advanced-js-utility-library/src/stringUtils');

console.log(capitalizeFirstLetter('edin'));
console.log(reverseString('edin'));
```
