#!/usr/bin/env node
var ftpd = require('ftpd'),
argv = require('argv'),
path = require('path'),
package_option = require('../package.json'),
options = [
{
	name: 'port',
	short: 'p',
	type: 'int'
},
{
	name: 'dir',
	short: 'd',
	type: 'string'
}],

args = argv.option( options ).run();

var dir = args.options.dir ? 
(path.isAbsolute(args.options.dir)? 
	path.resolve(args.options.dir):
	path.resolve('./'+args.options.dir)):
path.resolve('./'),
port = args.options.port || 21;



var options = {
	host: process.env.IP || '127.0.0.1',
	port: port || 21,
	tls: null,
};

var server = new ftpd.FtpServer(options.host, {
	getInitialCwd: function() {
		return '/'
	},
	getRoot: function() {
		return dir
	},
	pasvPortRangeStart: 1025,
	pasvPortRangeEnd: 1050,
	tlsOptions: options.tls,
	allowUnauthorizedTls: true,
	useWriteFile: false,
	useReadFile: false,
  	uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.
});

server.on('error', function(error) {
	console.log('FTP Server error:', error);
});

server.on('client:connected', function(connection) {
	var username = null;
	console.log('client connected: ' + connection.remoteAddress);
	connection.on('command:user', function(user, success, failure) {
		if (user) {
			username = user;
			success();
		} else {
			failure();
		}
	});

	connection.on('command:pass', function(pass, success, failure) {
		if (pass)success(username)
		else failure();
	});

});

server.debugging = 4;
server.listen(options.port);
console.log('Listening on port ' + options.port);