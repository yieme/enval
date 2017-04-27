'use strict'

var JSONIC = require('jsonic')

function enval(name, defaultValue) {
  if (typeof name == 'string') {
    try {
      return JSON.parse(process.env[name])
    } catch(e) {
      try {
        return JSONIC(process.env[name])
      } catch(e) {}
    }
  }
  return (typeof process.env[name] == 'undefined') ? defaultValue : process.env[name]
}

module.exports = enval;
