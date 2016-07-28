#!/usr/bin/env node

var Client = require('ftp');

var c = new Client({
	host: '127.0.0.1',
	port: 21
})

c.on('ready', function() {
	
	c.mkdir('rrr' , true, function(err) {
      if (err) throw err;
		  c.list(function(err, list) {
			if (err) throw err;
			console.dir(list);
			c.end();
		})
    })
})



c.on('close', function() {
	console.log('close');
})


c.on('end', function() {
	console.log('end');
})


c.on('error', function(err) {
	console.log('error',err);
})

c.connect();