# JS Utility Library

A JavaScript utility library for common data manipulation and formatting tasks.

## Installation

```bash
npm install github:edinzujodev/js-utility-library
```

## Usage

All utilities are available from the package root:

```js
const { chunk, formatDate, slugify } = require('js-utility-library');
```

### Arrays
```js
removeDuplicates([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
intersect([1, 2, 3, 4], [3, 4, 5, 6]);   // [3, 4]
difference([1, 2, 3, 4], [3, 4, 5, 6]);  // [1, 2]
chunk([1, 2, 3, 4, 5], 2);               // [[1, 2], [3, 4], [5]]
range(5);                                // [0, 1, 2, 3, 4]
range(0, 10, 3);                         // [0, 3, 6, 9]
groupBy([1, 2, 3, 4], n => (n % 2 ? 'odd' : 'even')); // { odd: [1, 3], even: [2, 4] }
groupBy(users, 'city');                  // groups objects by their city property
partition([1, 2, 3, 4], n => n > 2);     // [[3, 4], [1, 2]]
zip([1, 2], ['a', 'b']);                 // [[1, 'a'], [2, 'b']]
```

### Objects
```js
const user = { name: 'Edin', age: 30, address: { streets: [{ name: 'Ferhadija' }] } };

pick(user, ['name', 'age']);                // { name: 'Edin', age: 30 }
omit(user, ['address']);                    // { name: 'Edin', age: 30 }
get(user, 'address.streets[0].name');       // 'Ferhadija'
get(user, 'address.zip', 'unknown');        // 'unknown'
isEmpty({});                                // true (also '', [], null, empty Map/Set)
```

### Functions
```js
const search = debounce(query => fetchResults(query), 300); // runs 300ms after typing stops
const onScroll = throttle(updateHeader, 100);               // runs at most every 100ms
const fib = memoize(n => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
const init = once(() => connectToDatabase());               // later calls return the first result

search.cancel(); // debounce and throttle both support cancel()
```

### Dates
Dates are formatted in the local timezone. Build them from local components
(`new Date(2023, 7, 2)`); a string like `new Date('2023-08-02')` is parsed as UTC
midnight and shows as the previous day in timezones west of UTC.

```js
const date = new Date(2023, 7, 2);    // months are 0-based: 7 = August
formatDate(date);                     // '2023-08-02'
formatDate(addDays(date, 2));         // '2023-08-04'
daysBetween(date, new Date(2023, 7, 12)); // 10 (time of day is ignored)
isLeapYear(2024);                     // true
```

### Strings
```js
capitalizeFirstLetter('edin'); // 'Edin'
reverseString('edin');         // 'nide'
truncate('Hello world', 8);    // 'Hello...'
slugify('Héllo World!');       // 'hello-world'
toCamelCase('hello world');    // 'helloWorld'
toKebabCase('XMLHttpRequest'); // 'xml-http-request'
```

## Development

```bash
npm install
npm test
```
