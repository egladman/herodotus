var http = require('http');
var irc = require('irc');
var fs = require('fs');
var argv = require('yargs').argv;

var port, server, channel, nick;

(argv.port) ? port = argv.port : port = 6667;
(argv.server) ? server = argv.server : server = 'irc.freenode.net';
(argv.channel) ? channel = argv.channel : channel = '#herodotus-demo';
(argv.nick) ? nick = argv.nick : nick = 'herodotus-bot';

var file = 'log.json';

var client = new irc.Client(server, nick, {
  autoRejoin: true,
  autoConnect: false,
  port: port,
  userName: nick,
  secure: false,
  encoding: 'UTF-8'
});

client.connect(5, function(input) {
  console.log("Established connection with server");

  client.join(channel, function(input) {
    console.log("Joined " + channel);
  });
});

var array = [];

client.addListener('message', function (from, to, text) {
  var timeStamp = Math.floor(new Date() / 1000);
  var obj = { nick: from, message: text, time: timeStamp };

  array.push(obj);

  var content = '{\"events\":' + JSON.stringify(array) + '}\n'

  fs.writeFile(file, content, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log(file + " has been updated");
  });
});