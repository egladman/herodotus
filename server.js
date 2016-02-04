var server = 'irc.freenode.net';
var port = 6667
var channel = '#osuosc';
var nick = 'helen_keller';

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

function getDateTime() {
  var date = new Date();
  var sec  = date.getSeconds();
  var min  = date.getMinutes();
  var hour = date.getHours();

  sec = (sec < 10 ? "0" : "") + sec;
  min = (min < 10 ? "0" : "") + min;
  hour = (hour < 10 ? "0" : "") + hour;

  return hour + ':' + min + ':' + sec;
}

client.connect(5, function(input) {
  // console.log("Connected");
  client.join(channel, function(input) {
    console.log("Joined " + channel);
  });
});

var array = [];

client.addListener('message', function (from, to, text) {
  var time = getDateTime();
  var obj = { nick: from, message: text };
  var item = '\"' + time + '\"\:' + JSON.stringify(obj);

  array.push(item);

  fs.writeFile(file, '{' + array + '}\n', function() {
    // console.log("updated");
  });
});
