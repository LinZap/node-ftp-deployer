var argv = require('argv'),
	colors = require('colors'),
	path = require('path'),
	package_option = require('../package.json'),
	ftp_server = require('../lib/ftp-server.js'),
	ftp_publisher = require('../lib/publisher.js'),
	ftp_status = require('../lib/status.js'),
	f = require('../lib/patch-fs.js'),
	options = [
	{
		name: 'port',
		short: 'p',
		type: 'int',
		description: 'FTP server at the port'
	},
	{
		name: 'dir',
		short: 'd',
		type: 'string',
		description: 'FTP server in the directory'
	},
	{
		name: 'host',
		short: 'h',
		type: 'string',
		description: 'FTP server on the host'		
	},
	{
        name: 'ignore',
		short: 'i',
		type: 'csv,string',
		description: 'what kind of files you don\'t want to publish'	
    }],
	args = argv.option(options).version(package_option.version).run(),
	mode = args.targets[0];


switch(mode) {
	case 'server':
		var setting = parseArgv('server.json')
		ftp_server(setting)
		break;
	case 'publish':
		var setting = parseArgv('publish.json')
		ftp_publisher(setting)
		break;
	case 'status':
		var setting = parseArgv('publish.json')
		ftp_status(setting)
		break;
	default:
		console.log('[error] '.red+`dep: '${mode}' is not a ftp-deployer command`);
}


/*
	argv option is first, option_file is secondary
*/
function parseArgv(opt_fileName){

	var srv_path = path.resolve(process.cwd()+'/'+opt_fileName),
		srv_optexist = f.exists(srv_path),
		srv_opt = srv_optexist? require(srv_path): false,

		rootdir = srv_opt? srv_opt.rootdir||'./' : './',
		port = srv_opt? srv_opt.port||21 : 21,
		host = srv_opt? srv_opt.host||'127.0.0.1' : '127.0.0.1',
		ignore = srv_opt? srv_opt.ignore||[]:[];

	rootdir = args.options.dir ? 
		(path.isAbsolute(args.options.dir)? 
		path.resolve(args.options.dir):
		path.resolve('./'+args.options.dir)):
		path.resolve(rootdir),
	port = args.options.port || port;
	host = args.options.host || host;
	ignore = args.options.ignore || ignore;

	return {
		host: host,
		port: port,
		rootdir: rootdir,
		ignore: ignore
	}
}