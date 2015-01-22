datable@1.0.0
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

A light weight tool for handle data in table.

Installation
---

```sh
npm install datable
```

Usage
---
```javascript

var Datable = require('datable')

var d = new Datable({
    SPLIT_FLAG: ','
})
d.readDataFromFile('./input.csv')

console.log(d.getData())

d.filter(function (item) {
    return item.country != 'TT'
})

console.log(d.getData())

```

API
---

Refer to `demo/demo.js`, This demo will transfer data in `demo/input.csv` to `demo/output.csv`


License
---

ISC

[npm-image]: https://img.shields.io/npm/v/datable.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datable
[downloads-image]: http://img.shields.io/npm/dm/datable.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/datable
