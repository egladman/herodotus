# herodotus
An IRC bot written in node.JS that logs a channel's activity and saves it to a JSON file



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

Example One

```bash
node server.js --nick='foo' --channel='#linux' --server='baz' --port=7000
```


Example Two

```bash
node server.js --channel='#linux' --nick='qux'
```



##### Default Configuration

server = 'irc.freenode.net'
port = 6667
channel = '#osuosc'
nick = 'herodotus-bot'


---

example `log.json`

```json
{
	"1455961058": {
		"nick": "foo",
		"message": "Vivamus elementum semper nisi"
	},
	"1455961061": {
		"nick": "bar",
		"message": "Aenean vulputate eleifend tellus"
	},
	"1455961064": {
		"nick": "baz",
		"message": "qux: Maecenas tempus, sit amet adipiscing sem neque sed ipsum"
	},
	"1455961105": {
		"nick": "qux",
		"message": "foo: Etiam sit amet orci eget eros faucibus tincidunt"
	}
}
```

---

Tested on node `v4.2.6`

Contributions and/or feature requests are welcome.
