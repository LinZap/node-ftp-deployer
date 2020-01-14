var fs = require('fs'),
	path = require('path')

var list = function*(rootdir,ignores){
	var reg_exp = ignores.length ? buildIgnoreRegexp(ignores) : false,
	 	rootpath = rootdir = path.isAbsolute(rootdir)? path.resolve(rootdir): path.resolve('./'+rootdir),
		dir_tmp = [rootdir];
	while (dir_tmp.length>0) {
		var dir = dir_tmp.pop(),
			files = fs.readdirSync(dir)
		for (var i=0; i<files.length; i++) {

			if(reg_exp)
				if(reg_exp.test(files[i])) continue;

			var fp = path.resolve(dir+"/"+files[i]),
				info = { 
					path: fp ,
					name:files[i],
					relpath: fp.replace(rootdir,'').replace(/\\/g,'/')
				},
				stats = exists(fp);

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

var readAll = function(rootdir,ignores) {
	var paths = [],
		gen = list(rootdir,ignores),
		tmp = gen.next();
	while(!tmp.done){
		paths.push(tmp.value);
		tmp = gen.next();
	}
	return paths;
}


var exists = function(path){
	try{
		return fs.statSync(path);
	}catch(err){
		return false;
	}
}

function buildIgnoreRegexp(ignores) {
	var specx = ['\\\\','^','$','+','?','.','(',')','{','}','[',']'],
		specx_reg = new RegExp('('+specx.join(')|(\\')+')','g'),
		ignores = ignores.map(s=>s.replace(specx_reg,function(){return '\\'+arguments[0];}).replace('*','.*'));
	return new RegExp('(^'+ignores.join(')|(^')+')');
}


module.exports = {
	readAll: readAll,
	list: list,
	exists: exists
};