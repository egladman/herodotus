# herodotus
An IRC bot written in node.JS that logs a channel's activity and saves it to a JSON file

**the current day's log is overwritten when reinitialized**

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

There are **4 optional** parameters

###### Example One

```bash
node server.js --nick='herodotus__bot' --channel='#herodotus-demo'
```

--

###### Example Two

```bash
node server.js --nick='___logbot___' --channel='#foo' --server='bar' --port=1234
```

--

###### Example Three

```bash
node server.js
```

---

##### Default Configuration

server: `irc.freenode.net`

port: `6667`

channel: `#herodotus-demo`

nick: `herodotus-bot`


---


example `logs/YYYY-MM-DD.json`

```json
{
	"events": [
		{
			"nick": "foo",
			"message": "Vivamus elementum semper nisi",
			"time": 1456070643
		}, {
			"nick": "bar",
			"message": "Aenean vulputate eleifend tellus",
			"time": 1456070648
		}, {
			"nick": "baz",
			"message": "qux: Maecenas tempus, sit amet adipiscing sem neque sed ipsum",
			"time": 1456070651
		}, {
			"nick": "qux",
			"message": "foo: Etiam sit amet orci eget eros faucibus tincidunt",
			"time": 1456070653
		}
	]
}
```

---

Tested on node `v4.2.6`

Contributions and/or feature requests are welcomed. Feel free to report issues.
