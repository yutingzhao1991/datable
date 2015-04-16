datable
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

A light weight tool for handle data in table.

Datable是一个轻量级的数据处理工具，它可以将一个二维的数据进行Fiter，Group等操作。
Datable非常灵活，没有太多规则，比如说Group的操作如下：

```js
// This is a GroupBy demo.
d.groupby(['date'] /* 指定按照date这一列来group */, function (res) {
    // date相同的行最后会被合并为一行，这里是对最终要输出的那一行的初始化
    res.successCount = 0
    res.errorCount = 0
}, function (res, item) {
    // 每一行都会被被交给这个函数处理，这里收到两个参数，第一个res是最终要合并输出的结果，item是当前遍历到的数据行
    if (item.code == '200') {
        res.successCount += parseInt(item.cnt)
    } else {
        res.errorCount += parseInt(item.cnt)
    }
})
```

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
2014-01-01 00:00,1501,1001
2014-01-02 00:00,1001,500
```

**expand**


Before:

```
date,successCount,errorCount
2014-01-01 00:00,1501,1001
2014-01-02 00:00,1001,500
```

Code:


```javascript
d.expand('index', ['1','2'], function (val, item) {
    item.name = 'index_' + val
})
```

After:

```
date,successCount,errorCount,index,name
2014-01-01 00:00,1501,1001,1,index_1
2014-01-01 00:00,1501,1001,2,index_2
2014-01-02 00:00,1001,500,1,index_1
2014-01-02 00:00,1001,500,2,index_2
```


**readDataFromFile**

Read data from file.

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
