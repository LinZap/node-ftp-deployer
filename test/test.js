var fs = require('fs'),
	path = require('path'),
	colors = require('colors'),
	ignores = require('../client-ignore.json'),
	reg_exp = buildIgnoreRegexp(ignores)


function* fullread(rootdir){
	var rootpath = rootdir = path.isAbsolute(p)? path.resolve(p): path.resolve('./'+p),
		dir_tmp = [rootdir];
	while (dir_tmp.length>0) {
		var dir = dir_tmp.pop(),
			files = fs.readdirSync(dir)
		for (var i=0; i<files.length; i++) {

			if(reg_exp.test(files[i])) continue;

			var fp = path.resolve(dir+"/"+files[i]),
				info = { path: fp },
				stats = fs.statSync(fp);
			if(stats.isFile()) info.type='file'
			else if(stats.isDirectory()){
				dir_tmp.push(fp);
				info.type='dir'
			}
			else info.type='other'
			yield info;
		}
	}
}


function buildIgnoreRegexp(ignores) {
	var specx = ['\\\\','^','$','+','?','.','(',')','{','}','[',']'],
		specx_reg = new RegExp('('+specx.join(')|(\\')+')','g'),
		ignores = ignores.map(s=>s.replace(specx_reg,function(){return '\\'+arguments[0];}).replace('*','.*'));
	return new RegExp('(^'+ignores.join(')|(^')+')');
}




while(!tmp.done){
	var data = tmp.value
	console.log(data.type.green,data.path);
	tmp = gen.next();
}

