var http = require('http');
var irc = require('irc');
var fs = require('fs');
var mkdirp = require('mkdirp');
var argv = require('yargs').argv;

var port, server, channel, nick, format;

var formats = ['json', 'jsonl'];

(argv.port) ? port = argv.port : port = 6667;
(argv.server) ? server = argv.server.toLowerCase() : server = 'irc.freenode.net';
(argv.channel) ? channel = argv.channel.toLowerCase() : channel = '#herodotus-demo';
(argv.nick) ? nick = argv.nick.toLowerCase() : nick = 'herodotus-bot';

if (argv.format) {
  if (formats.indexOf(argv.format) === -1) {
    return console.error('invalid format');
  }
  format = argv.format.toLowerCase();
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
  console.log("Established connection with " + server);

  client.join(channel, function(input) {
    console.log("Joined " + channel);
  });
});

mkdirp('logs', function (err) {
  if(err) {
    return console.log(err);
  }
});

var log = {};
log.server = server;
log.channel = channel;
log.events = [];

client.addListener('message', function (from, to, text) {
  var date = new Date();

  var epochTimeStamp = Math.floor(date / 1000);
  var isoTimeStamp = date.toISOString();

  var path = "logs/" + isoTimeStamp.slice(0,10) + "." + format

  var obj = { nick: from, message: text, time: epochTimeStamp };

  if (format === 'json') {
    log.events.push(obj);
    var contents = JSON.stringify(log) + '\n'

    fs.writeFile(path, contents, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('[' + isoTimeStamp.slice(11,19) + '] ' + path + " has been updated");
    });


  } else if (format === 'jsonl') {
    var contents = JSON.stringify(obj) + '\n'

    fs.appendFile(path, contents, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('[' + isoTimeStamp.slice(11,19) + '] ' + path + " has been updated");
    });

  }
});
