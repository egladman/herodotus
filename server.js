var http = require('http');
var irc = require('irc');
var fs = require('fs');
var mkdirp = require('mkdirp');
var argv = require('yargs').argv;

var port, server, channel, nick;

(argv.port) ? port = argv.port : port = 6667;
(argv.server) ? server = argv.server : server = 'irc.freenode.net';
(argv.channel) ? channel = argv.channel : channel = '#herodotus-demo';
(argv.nick) ? nick = argv.nick : nick = 'herodotus-bot';

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
log.events = [];

client.addListener('message', function (from, to, text) {
  var date = new Date();

  var epochTimeStamp = Math.floor(date / 1000);
  var isoTimeStamp = date.toISOString().slice(0,10);

  var path = "logs/" + isoTimeStamp + ".json"
  var obj = { nick: from, message: text, time: epochTimeStamp };

  log.events.push(obj);

  var contents = JSON.stringify(log) + '\n'

  fs.writeFile(path, contents, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log(path + " has been updated");
  });
});