var server = 'irc.freenode.net';
var port = 6667
var channel = '#osuosc';
var nick = 'herodotus';

var file = 'log.json';

var http = require('http');
var irc = require('irc');
var fs = require('fs');

var client = new irc.Client(server, nick, {
  autoRejoin: true,
  autoConnect: false,
  port: port,
  userName: nick,
  secure: false,
  encoding: 'UTF-8'
});

client.connect(5, function(input) {
  // console.log("Connected");
  client.join(channel, function(input) {
    console.log("Joined " + channel);
  });
});

var array = [];

client.addListener('message', function (from, to, text) {
  var time = Math.floor(new Date() / 1000);
  var obj = { nick: from, message: text };
  var item = '\"' + time + '\"\:' + JSON.stringify(obj);

  array.push(item);

  fs.writeFile(file, '{' + array + '}\n', function() {
    // console.log("updated");
  });
});