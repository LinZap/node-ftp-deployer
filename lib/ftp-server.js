var ftpd = require('ftpd');

module.exports = function(setting){

	var host = setting.host,
		port = setting.port,
		rootdir = setting.rootdir,
		options = {
			host: host,
			port: port,
			tls: null,
			pasv: true,
		};

	var server = new ftpd.FtpServer(options.host, {
		getInitialCwd: function() {
			return '/'
		},
		getRoot: function() {
			return rootdir
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
		//console.log('client connected: ' + connection.remoteAddress);
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
	console.log('FTP-Server listening on '+ options.host +' port ' + options.port);
	console.log('Root Path at: '+ rootdir);
}


