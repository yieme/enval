'use strict'

var JSONIC     = require('jsonic')
var S          = require('string')
var delimitLen = enval('DELIMIT_LEN', 25)

function delimit(str, len) {
  len = len || delimitLen
  str = str || ''
  if (str.length > len) str = str.substr(0, len)
  return str + S('.').repeat(len - str.length).s + ':'
}

function enval(name, defaultValue, log) {
  function logVal(val) {
    if (val !== undefined && log) {
      if (typeof log == 'function') {
        val = log(val) // apply transform function
      }
      console.log(delimit(name), JSON.stringify(val))
    }
    return val
  }

  if (typeof name == 'string') {
    try {
      return logVal(JSON.parse(process.env[name]))
    } catch(e) {
      try {
        return logVal(JSONIC(process.env[name]))
      } catch(e) {}
    }
  }
  return logVal((typeof process.env[name] == 'undefined') ? defaultValue : process.env[name])
}

module.exports = enval;
