'use strict'

var JSONIC = require('jsonic')

function enval(name, default) {
  if (typeof name == 'string') {
    try {
      return JSON.parse(process.env[name])
    } catch(e) {
      return JSONIC(process.env[name])
    }
  }
  return (typeof process.env[name] == 'undefined') ? default : process.env[name]
}

module.exports = enval;
