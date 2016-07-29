var ftp = require('../lib/gen-publisher-helper.js'),
	setting = require('../publish.json'),
	f = require('../lib/patch-fs.js');


var gen = (function*(){

	var c = yield ftp.conn(gen,setting);

	if(!c) process.exit();

	var list = yield ftp.list(gen,c) || [];

	// remove all of deploy-dir files and dirs
	for (var i = 0; i < list.length; i++) 
		yield ftp.rm(gen,c,list[i].name,list[i].type=='d')
	
	// yield ftp.mkdir(gen,c,"test")
	// yield ftp.put(gen,c,"\\test\\test.js","\\test\\test.js")

	// push all of deploy-dir files and dirs
	var fgen = f.list(process.cwd(),setting.ignore),
		tmp = fgen.next();
	while(!tmp.done){
		var inf = tmp.value;
		if(inf.type=='dir')
			yield ftp.mkdir(gen,c,inf.relpath)
		else 
			yield ftp.put(gen,c,inf.path,inf.relpath)
		tmp = fgen.next();
	}


	
	c.end()

})();

gen.next()