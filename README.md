# enval

ENvironment variable VALue. Returns variable as object from JSON.parse/JSONIC or a string

## Install

```sh
npm i enval --save
```

## Usage

Instead of

```js
var myVal = process.env['MY_VARIABLE']
if (myVal) {
  myVal = JSON.parse(myVal)
}
```

use

```js
var enval = require('enval')

var myVal = enval('MY_VARIABLE')

// with default if undefined

myVal = enval('MY_VARIABLE', { foo: "bar" })
```

## Examples

Environment value | Returned Value | Description
--- | --- | ---
true | true | via JSON.parse()
null | null | via JSON.parse()
false | false | via JSON.parse()
0 | 0 | via JSON.parse()
17 | 17 | via JSON.parse()
hello | hello | via JSON.parse()
{ "foo": "bar"} | { foo: "bar" } | via JSON.parse()
foo:bar | { foo: "bar" } | via JSONIC()
greet:Bob,age:18 | { greet: "Bob", age: 18 } | via JSONIC()
invalid:jsonic,value,here | invalid:jsonic,value,here | pass-thru as unable to parse

## License MIT
