'use strict'

var JSONIC     = require('jsonic')
var S          = require('string')
var delimitLen = process.env.DELIMIT_LEN || 25
var colors     = require('colors')

function delimit(str, len) {
  len = len || delimitLen
  str = str || ''
  if (str.length > len) str = str.substr(0, len)
  console.log('str:', str, typeof str, len, str.length)
  return str + S('.').repeat(len - str.length).s + ':'
}

function enval(name, defaultValue, log) {
  function logVal(val) {
    if (val !== undefined && val !== null && log) {
      if (typeof log == 'number' && log > 0 && typeof val == 'string' && val.length > 0) {
        console.log(colors.gray(delimit(name)), colors.gray(val.substr(0, log) + '...'))
      } else if (typeof log == 'function') {
        console.log(colors.gray(delimit(name)), colors.gray(JSON.stringify(log(val))))
      } else {
        console.log(colors.gray(delimit(name)), colors.gray(JSON.stringify(val)))
      }
    }
  }

  if (typeof name == 'string') {
    try {
      var val = JSON.parse(process.env[name])
      logVal(val)
      return val
    } catch(e) {
      try {
        var val = JSONIC(process.env[name])
        logVal(val)
        return val
      } catch(e) {
        var val = process.env[name]
        logVal(val)
        return val
      }
    }
  }

  var val = (typeof process.env[name] == 'undefined') ? defaultValue : process.env[name]
  logVal(val)
  return val
}

module.exports = enval;
