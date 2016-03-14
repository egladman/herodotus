# herodotus
An IRC bot written in node.JS that logs a channel's activity and saves it to [JSON](http://json.org/), [JSON Lines](http://jsonlines.org/), or [CSV](https://en.wikipedia.org/wiki/Comma-separated_values)

### Getting started

##### Clone
```bash
git clone https://github.com/egladman/herodotus.git && cd herodotus
```
##### Install Dependencies
```bash
npm install
```



##### Start

There are **5 optional** parameters

###### Example One

```bash
node server.js --channel='#herodotus-demo' --format='jsonl'
```

--

###### Example Two

```bash
node server.js --nick='qux' --channel='#foo' --server='bar' --port=1234
```

--

###### Example Three

```bash
node server.js --format='csv'
```

---

##### Default Configuration

server: `irc.freenode.net`

port: `6667`

channel: `#herodotus-demo`

nick: `herodotus-bot`

format: `json`


---


example `logs/YYYY-MM-DD.json`

```json
{  
  "server":"irc.freenode.net",
  "channel":"#herodotus-demo",
  "events":[  
    {  
      "nick":"foo",
      "message":"Vivamus elementum semper nisi",
      "time":1456070643
    },
    {  
      "nick":"bar",
      "message":"Aenean vulputate eleifend tellus",
      "time":1456070648
    },
    {  
      "nick":"baz",
      "message":"qux: Maecenas tempus, sit amet adipiscing sem neque sed ipsum",
      "time":1456070651
    },
    {  
      "nick":"qux",
      "message":"foo: Etiam sit amet orci eget eros faucibus tincidunt",
      "time":1456070653
    }
  ]
}
```

---


example `logs/YYYY-MM-DD.jsonl`

```json
{ "nick": "foo", "message": "Vivamus elementum semper nisi", "time": 1456070643 }
{ "nick": "bar", "message": "Aenean vulputate eleifend tellus", "time": 1456070648 }
{ "nick": "baz", "message": "qux: Maecenas tempus, sit amet adipiscing sem neque sed ipsum", "time": 1456070651 }
{ "nick": "qux", "message": "foo: Etiam sit amet orci eget eros faucibus tincidunt", "time": 1456070653 }
```

---


example `logs/YYYY-MM-DD.csv`

```csv
nick, message, time
"foo", "Vivamus elementum semper nisi", 1456070643
"bar", "Aenean vulputate eleifend tellus", 1456070648
"baz", "qux: Maecenas tempus, sit amet adipiscing sem neque sed ipsum", 1456070651
"qux", "foo: Etiam sit amet orci eget eros faucibus tincidunt", 1456070653

```

---
Tested on node `v4.2.6`

Contributions and/or feature requests are welcomed. Feel free to report issues.
