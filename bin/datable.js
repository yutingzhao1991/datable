#!/usr/bin/env node
var datable = require('../')(process.argv.slice(2))
console.log(datable)