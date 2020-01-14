var f = require('./patch-fs.js'),
	colors = require('colors')

module.exports = function(setting){
	var host = setting.host,
		port = setting.port,
		rootdir = setting.rootdir,
		ignore = setting.ignore
	var res = f.readAll(rootdir,ignore)
	console.log('[Publish files]'.green);
	res.forEach(f=>{
		if(f.type=='file')
			console.log(' '+f.relpath.yellow);
		else 
			console.log(' '+f.relpath.green);
	})
};