#!/usr/bin/env node
var f = require('../lib/patch-fs.js');

var p = process.argv[2] || '.'
console.log(f.readAll(p));
