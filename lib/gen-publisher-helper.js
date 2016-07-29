var Client = require('ftp');

function conn(gen,option){
	var c = new Client(option);
	c.on('ready',()=>{
		gen.next(c);
	})
	c.on('close',()=>{
		console.log('close')
		gen.next(false);
	})
	c.on('end',()=>{
		console.log('end')
		gen.next(false);
	})
	c.on('error',()=>{
		console.log('error')
		gen.next(false);
	})
	c.connect()
}

function list(gen,c){
	c.list((err, list)=>{
		if (err) gen.next(false);
		else gen.next(list);
	});
}

function put(gen,c,path,fileName) {
	c.put(path, fileName, (err)=>{
		if (err) gen.next(false);
		else gen.next(true);
	});
}


function rm(gen,c,fileName,isdir){
	if(isdir){
		c.rmdir(fileName,true,(err)=>{
			if(err) gen.next(false);
			else gen.next(true);
		})
	}
	else{
		c.delete(fileName,(err)=>{
			if(err) gen.next(false);
			else gen.next(true);
		})
	}
}

function mkdir(gen,c,fileName){
	c.mkdir(fileName,false,(err)=>{
		if(err) gen.next(false);
		else gen.next(true);
	})
}

module.exports = {
	conn: conn,
	list: list,
	put: put,
	rm: rm,
	mkdir: mkdir
};