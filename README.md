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

##### Configure
```js
// server.js

var server = 'irc.freenode.net';
var port = 6667
var channel = '#osuosc';
var nick = 'herodotus';
```

##### Start
```bash
node server.js
```


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

Contributions and/or feature requests are welcomed.
