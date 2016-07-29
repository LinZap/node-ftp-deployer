var colors = require('colors'),
	ftp = require('./gen-publisher-helper.js'),
	f = require('./patch-fs.js');

module.exports = function(setting){

	var host = setting.host,
		port = setting.port,
		rootdir = setting.rootdir,
		ignore = setting.ignore

	var gen = (function*(){

		var c = yield ftp.conn(gen,setting);

		if(!c) process.exit();

		var list = yield ftp.list(gen,c) || [];

		// remove all of deploy-dir files and dirs
		for (var i = 0; i < list.length; i++) 
			yield ftp.rm(gen,c,list[i].name,list[i].type=='d')
		

		// push all of deploy-dir files and dirss
		var fgen = f.list(rootdir,ignore),
			tmp = fgen.next();

		while(!tmp.done){
			var inf = tmp.value, res
			if(inf.type=='dir')
				res = yield ftp.mkdir(gen,c,inf.relpath)
			else 
				res = yield ftp.put(gen,c,inf.path,inf.relpath)

			console.log((res?"[success]".green:['failure'].red),inf.relpath)

			tmp = fgen.next();
		}

		c.end()

	})();
	gen.next()
};