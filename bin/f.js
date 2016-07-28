#!/usr/bin/env node
var f = require('../lib/patch-fs.js');

var p = process.argv[2] || '.'
console.log(f.readAll(p));

console.log('__dirname',__dirname);
console.log('process.cwd',process.cwd);