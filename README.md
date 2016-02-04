# helen_keller
An IRC node bot that logs a channel's activity to a JSON file


```bash
npm install
node server.js
```

---

example `log.json`

```json
{
	"16:28:18": {
		"nick": "foo",
		"message": "Vivamus elementum semper nisi"
	},
	"16:28:22": {
		"nick": "bar",
		"message": "Aenean vulputate eleifend tellus"
	},
	"21:32:40": {
		"nick": "baz",
		"message": "qux: Maecenas tempus, sit amet adipiscing sem neque sed ipsum"
	},
	"09:02:09": {
		"nick": "qux",
		"message": "foo: Etiam sit amet orci eget eros faucibus tincidunt"
	}
}
```
