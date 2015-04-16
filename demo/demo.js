
var Datable = require('../index')

var d = new Datable({
    SPLIT_FLAG: ','
})
d.readDataFromFile('./input.csv')

console.log(d.getData())

d.filter(function (item) {
    return item.country != 'TT'
})

console.log(d.getData())

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

console.log(d.getData())

d.pipeline(function (item) {
    item.date += ' 00:00'
})

console.log(d.getData())

d.expand('index', ['1','2'], function (val, item) {
    item.name = 'index_' + val
})

console.log(d.getData())

d.writeDataToFile('./output.csv')
