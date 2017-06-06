'use strict'

var JSONIC     = require('jsonic')
var S          = require('string')
var delimitLen = process.env.DELIMIT_LEN || 25
var colors     = require('colors')

function delimit(str, len) {
  len = len || delimitLen
  str = str || ''
  if (str.length > len) str = str.substr(0, len)
  return str + S('.').repeat(len - str.length).s + ':'
}

function enval(name, defaultValue, log) {
  function logVal(val) {
    if (val !== undefined && val !== null && log) {
      if (typeof log == 'number' && log > 0 && typeof val == 'string' && val.length > 0) {
        console.log(colors.gray(delimit(name)), colors.gray(val.substr(0, log) + '...'))
      } else if (typeof log == 'function') {
        if (typeof val == 'object') {
          val = JSON.parse(JSON.stringify(val)) // create new object preclude assignements in logging function
        }
        console.log(colors.gray(delimit(name)), colors.gray(JSON.stringify(log(val))))
      } else {
        console.log(colors.gray(delimit(name)), colors.gray(JSON.stringify(val)))
      }
    }
  }

  if (typeof name == 'string') {
    try {
      var value = JSON.parse(process.env[name])
      logVal(value)
      return value
    } catch(e) {
      try {
        var value = JSONIC(process.env[name])
        logVal(value)
        return value
      } catch(e) {
        var value = process.env[name]
        logVal(value)
        return value
      }
    }
  }

  var value = (typeof process.env[name] == 'undefined' || typeof process.env[name] == 'null') ? defaultValue : process.env[name]
  logVal(value)
  return value
}

module.exports = enval;
