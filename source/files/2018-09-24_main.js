// require nodejs module in node_modules
var fs = require('fs')

// require module from js file
var module = require(__dirname + './class/module.js')

// require as function / object, so we can use it directly like this:
var module = require(__dirname + './class/module.js')(para)

// or do it later
var Module = require(__dirname + './class/module.js')
var module = Module(para)

// for object
var module = require(__dirname + './class/module.js')
var foo = module.foo
var loo = module.loo(foo)

// export object / function
exports = {object: "object", func: function(para){}}

// import node_modules
import foo from 'foo'

// import local js file
import foo from './foo'

// export for import
export let foo = {object: "object", func: function(para){}}
