datable
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

**Datable**

```
new Datable([options, data])
```

options:

- SPLIT_FLAG : default is '\t'

data:

A array.


**filter**

Filter out some rows according to a condition.

Before:

```
date,country,code,cnt
2014-01-01,US,500,1001
2014-01-02,CN,500,500
2014-01-02,US,200,1001
2014-01-01,CN,200,500
2014-01-01,CN,200,1001
2014-01-01,TT,500,500
```

Code:

```javascript
d.filter(function (item) {
    return item.country != 'TT'
})
```

After:

```
date,country,code,cnt
2014-01-01,US,500,1001
2014-01-02,CN,500,500
2014-01-02,US,200,1001
2014-01-01,CN,200,500
2014-01-01,CN,200,1001
```

**groupby**

Group by with some colomns, you can handler other colomns with your custom handler.

Before:

```
date,country,code,cnt
2014-01-01,US,500,1001
2014-01-02,CN,500,500
2014-01-02,US,200,1001
2014-01-01,CN,200,500
2014-01-01,CN,200,1001
```

Code:


```javascript
d.groupby(['date'], function (res) {
    res.successCount = 0
    res.errorCount = 0
}, function (res, item) {
    if (item.code == '200') {
        res.successCount += parseInt(item.cnt)
    } else {
        res.errorCount += parseInt(item.cnt)
    }
})
```

After:

```
date,successCount,errorCount
2014-01-01,1501,1001
2014-01-02,1001,500
```

**pipeline**

pipeline is a helper function for processing data one by one


Before:

```
date,successCount,errorCount
2014-01-01,1501,1001
2014-01-02,1001,500
```

Code:


```javascript
d.pipeline(function (item) {
    item.date += ' 00:00'
})
```

After:

```
date,successCount,errorCount
2014-01-01,1501,1001
2014-01-02,1001,500
```

**readDataFromFile**

Read data from file.

Before:

```javascript
d.readDataFromFile('./input.csv')
```

**writeDataToFile**

Write Data to file.

```javascript
d.writeDataToFile('./output.csv')
```

**getData**

```javascript
d.getData()
```

**setData**

```javascript
d.setData([])
```

License
---

ISC

[npm-image]: https://img.shields.io/npm/v/datable.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datable
[downloads-image]: http://img.shields.io/npm/dm/datable.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/datable
