# herodotus
An IRC bot written in node.JS that logs a channel's activity and saves it to a JSON file


```bash
npm install
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

--

Contributions and feature requests are welcome
