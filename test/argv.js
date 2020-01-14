const path = require('path')
const f = require('../lib/patch-fs')

require('yargs')
    .command(
        'server', 'start the ftp server',
        (yargs) => { },
        (argv) => {
            var setting = parseArgv('server.json', argv)
            console.log('start ftp server:', setting)
        }
    )
    .command(
        'publish', 'start the publish',
        (yargs) => { },
        (argv) => {
            var setting = parseArgv('publish.json', argv)
            console.log('start run publish:', setting)
        }
    )
    .command(
        'status', 'start the status',
        (yargs) => { },
        (argv) => {
            var setting = parseArgv('publish.json', argv)
            console.log('start print status:', setting)
        }
    )
    .option('port', {
        alias: 'p',
        type: 'number',
        description: 'FTP server at the port'
    })

    .option('dir', {
        alias: 'd',
        type: 'string',
        description: 'FTP server in the directory'
    })

    .option('host', {
        alias: 'h',
        type: 'string',
        description: 'FTP server on the host'
    })

    .option('ignore', {
        alias: 'i',
        type: 'array',
        description: 'what kind of files you don\'t want to publish'
    })
    .argv


function parseArgv(opt_fileName, args) {
    var srv_path = path.resolve(process.cwd() + '/' + opt_fileName),
        srv_optexist = f.exists(srv_path),
        srv_opt = srv_optexist ? require(srv_path) : false,

        rootdir = srv_opt ? srv_opt.rootdir || './' : './',
        port = srv_opt ? srv_opt.port || 21 : 21,
        host = srv_opt ? srv_opt.host || '127.0.0.1' : '127.0.0.1',
        ignore = srv_opt ? srv_opt.ignore || [] : [];

    rootdir = args.dir ?
        (path.isAbsolute(args.dir) ?
            path.resolve(args.dir) :
            path.resolve('./' + args.dir)) :
        path.resolve(rootdir),
        port = args.port || port;
    host = args.host || host;
    ignore = args.ignore || ignore;

    return {
        host: host,
        port: port,
        rootdir: rootdir,
        ignore: ignore
    }
}