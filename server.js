var server = 'irc.freenode.net';
var port = 6667
var channel = '#helen_keller-testing';
var nick = 'helen_keller';

var file = 'log.json';

var http = require('http');
var irc = require('irc');
var fs = require('fs');


var client = new irc.Client(server, nick, {
  autoConnect: false,
  port: port,
  userName: nick,
  secure: false
});


function getDateTime() {
  var date, sec, min, hour;

  date = new Date();

  sec  = date.getSeconds();
  min  = date.getMinutes();
  hour = date.getHours();

  sec = (sec < 10 ? "0" : "") + sec;
  min = (min < 10 ? "0" : "") + min;
  hour = (hour < 10 ? "0" : "") + hour;

  return hour + ':' + min + ':' + sec;
}


client.connect(5, function(input) {
  console.log("Connected");
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

  fs.writeFile(file, '{' + array + '}', function() {
    console.log("updated");
  });
});
