var http = require('http');
var irc = require('irc');
var fs = require('fs');
var mkdirp = require('mkdirp');
var argv = require('yargs').argv;
const chalk = require('chalk');


var port, server, channel, nick, format, formats;

formats = ['json', 'jsonl', 'csv', 'md', 'markdown'];

(argv.port) ? port = argv.port : port = 6667;
(argv.server) ? server = argv.server.toLowerCase() : server = 'irc.freenode.net';
(argv.channel) ? channel = argv.channel.toLowerCase() : channel = '#herodotus-demo';
(argv.nick) ? nick = argv.nick.toLowerCase() : nick = 'herodotus-bot';
(argv.verbose) ? verbose = true : verbose = false;

if (argv.format) {
  if (formats.indexOf(argv.format) === -1) {
    return console.log( chalk.red('ERROR') +  ' invalid format' );
  }

  format = argv.format.toLowerCase();
  if (format === 'markdown') format = 'md';

} else {
  format = 'json';
}

var client = new irc.Client(server, nick, {
  autoRejoin: true,
  autoConnect: false,
  port: port,
  userName: nick,
  secure: false,
  encoding: 'UTF-8'
});

client.connect(5, function(input) {
  console.log( chalk.green('Established connection with ' + server) );

  client.join(channel, function(input) {
    console.log( chalk.green('Joined ' + channel) );
  });
});

mkdirp('logs', function (err) {
  if(err) {
    return console.log( chalk.red(err) );
  }
});

var log = {};
log.server = server;
log.channel = channel;
log.events = [];

client.addListener('message', function (from, to, text) {
  const date = new Date();

  var epochTimeStamp = Math.floor(date / 1000);
  var isoTimeStamp = date.toISOString();

  var path = "logs/" + isoTimeStamp.slice(0,10) + "." + format

  var obj = { nick: from, message: text, time: epochTimeStamp };
  var update =  chalk.yellow('[' + isoTimeStamp.slice(11,19) + ']') + ' ' + path + ' has been updated';

  if (format === 'json') {
    log.events.push(obj);
    var contents = JSON.stringify(log) + '\n'

    fs.writeFile(path, contents, function(err) {
      if(err) {
        return console.log( chalk.red(err) );
      }
      if (verbose) console.log(update);
    });

  } else if (format === 'jsonl') {
    var contents = JSON.stringify(obj) + '\n'

    fs.appendFile(path, contents, function(err) {
      if(err) {
        return console.log( chalk.red(err) );
      }
      if (verbose) console.log(update);
    });

  } else if (format === 'csv') {
    var header = ['nick', 'message', 'time'];
    var contents = [JSON.stringify(from), JSON.stringify(text), epochTimeStamp];

    fs.stat(path, function(err, stat) {

      if(err == null) {
        fs.appendFile(path, contents.join() + '\n', function(err) {
          if(err) {
            return console.log( chalk.red(err) );
          }
          if (verbose) console.log(update);
        });
      } else if(err.code == 'ENOENT') {
        fs.writeFile(path, header.join() + '\n' + contents.join() + '\n');
        console.log(update);
      } else {
        return console.log( chalk.red(err) );
      }
    });

  } else if (format === 'md') {
    var contents = '[' + isoTimeStamp.slice(11,19) + ']  ' + '**' + from + '** ' + text + '<br />'
    fs.appendFile(path, contents, function(err) {
      if(err) {
        return console.log( chalk.red(err) );
      }
      if (verbose) console.log(update);
    });

  };

});
