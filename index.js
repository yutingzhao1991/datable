'use strict';

var fs = require('fs')
var _ = require('underscore')

var filter = function(data, handler) {
    var ret = []
    data.forEach(function(item) {
        if (handler(item)) {
            ret.push(item)
        }
    })
    return ret
}

var expand = function(data, name, values, handler) {
    var ret = []
    data.forEach(function(item) {
        values.forEach(function(val) {
            var newItem = _.clone(item)
            newItem[name] = val
            var temp = handler && handler(val, newItem)
            if (temp) {
                newItem = temp
            }
            ret.push(newItem)
        })
    })
    return ret
}

var groupby = function(data, keys, initHandler, processHandler) {
    var map = {}
    var SPLIT = '@@@'
    data.forEach(function(item) {
        var ids = []
        var temp = {}
        for (var i = 0; i < keys.length; i ++) {
            ids.push(item[keys[i]])
            temp[keys[i]] = item[keys[i]]
        }
        var unique = ids.join(SPLIT)
        if (!map[unique]) {
            map[unique] = temp
            initHandler && initHandler(map[unique])
        }
        processHandler && processHandler(map[unique], item)
    })
    var ret = []
    for (var i in map) {
        ret.push(map[i])
    }
    return ret
}

var pipeline = function(data, handler) {
    var ret = []
    data.forEach(function(item) {
        ret.push(handler(item) || item)
    })
    return ret
}

var readFromFile = function(SPLIT_FLAG, path, header) {
    var text = '' + fs.readFileSync(path)
    var data = []
    var items = text.split('\n')
    if (!header) {
        header = items.shift().split(SPLIT_FLAG)
    }
    items.forEach(function(item) {
        var ts = item.split(SPLIT_FLAG)
        if (ts.length != header.length) {
            return
        }
        var row = {}
        for (var i = 0; i < header.length; i ++) {
            row[header[i]] = ts[i] || null
        }
        data.push(row)
    })
    return data
}

var writeToFile = function(SPLIT_FLAG, data, path, header) {
    if (!header) {
        header = []
        var t = data[0] || {}
        for (var i in t) {
            header.push(i)
        }
    }
    var text = header.join(SPLIT_FLAG) + '\n'
    data.forEach(function (item) {
        var temp = []
        for (var i = 0; i < header.length; i++) {
            temp.push(item[header[i]]) 
        }
        text += temp.join(SPLIT_FLAG) + '\n'
    })
    fs.writeFileSync(path, text)
}


//
// init function, return a Datable object.
// data should be a array.
//
var createDatable = function(options, data) {
    var data = data || []
    var options = options || {}
    var SPLIT_FLAG = options.SPLIT_FLAG || '\t'
    return {
        filter: function(handler) {
            data = filter(data, handler)
            return this
        },
        groupby: function(keys, initHandler, processHandler) {
            data = groupby(data, keys, initHandler, processHandler)
            return this
        },
        pipeline: function(handler) {
            data = pipeline(data, handler)
            return this
        },
        expand: function(name, values, handler) {
            data = expand(data, name, values, handler)
            return this
        },
        readDataFromFile: function(path, header) {
            data = readFromFile(SPLIT_FLAG, path, header)
            return this
        },
        writeDataToFile: function(path, header) {
            writeToFile(SPLIT_FLAG, data, path, header)
            return this
        },
        setData: function(d) {
            data = d
            return this
        },
        getData: function() {
            return data
        }
    }
}

module.exports = createDatable

