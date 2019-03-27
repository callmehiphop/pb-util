# pb-util

> Utilities for working with common protobuf types.

## Installing

```sh
$ npm i --save pb-util
```

## API

### value.encode(val)

Encodes a JSON value into a [`google.protobuf.Value`][pb-value].

#### val

Type: `string` `number` `boolean` `null` `object` `array`

```js
const {value} = require('pb-util');

const stringValue = value.encode('hello!');
// => {
//   kind: 'stringValue',
//   stringValue: 'hello!'
// }
```

### value.decode(protoValue)

Decodes a [`google.protobuf.Value`][pb-value] into a JSON value.

#### protoValue

Type: [`google.protobuf.Value`][pb-value]

```js
const {value} = require('pb-util');

const str = value.decode({
  kind: 'stringValue',
  stringValue: 'beep boop'
});
// => 'beep boop'
```

### struct.encode(json)

Encodes a JSON object into a [`google.protobuf.Struct`][pb-struct].

#### json

Type: `object`

```js
const {struct} = require('pb-util');

const structValue = struct.encode({foo: 'bar'});
// => {
//   fields: {
//     foo: {
//       kind: 'stringValue',
//       stringValue: 'bar'
//     }
//   }
// }
```

### struct.decode(structValue)

Decodes a [`google.protobuf.Struct`][pb-struct] into a JSON object.

#### structValue

Type: [`google.protobuf.ListValue`][pb-list]

```js
const {struct} = require('pb-util');

const obj = struct.decode({
  fields: {
    foo: {
      kind: 'stringValue',
      stringValue: 'bar'
    },
    yes: {
      kind: 'boolValue',
      boolValue: true
    }
  }
});
// => {
//   foo: 'bar',
//   yes: true
// }
```

### list.encode(array)

Encodes an array of JSON values into a [`google.protobuf.ListValue`][pb-list].

#### array

Type: `array`

```js
const {list} = require('pb-util');

const listValue = list.encode(['foo', 'bar']);
// => {
//   values: [
//     {
//       kind: 'stringValue',
//       stringValue: 'foo'
//     },
//     {
//       kind: 'stringValue',
//       stringValue: 'bar'
//     }
//   ]
// }
```

### list.decode(listValue)

Decodes a [`google.protobuf.ListValue`][pb-list] into an array of JSON values.

#### listValue

Type: [`google.protobuf.ListValue`][pb-list]

```js
const {list} = require('pb-util');

const arr = list.decode({
  values: [
    {
      kind: 'stringValue',
      stringValue: 'foo'
    },
    {
      kind: 'numberValue',
      numberValue: 10
    }
  ]
});
// => ['foo', 10]
```

## License

ISC

[pb-value]: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Value
[pb-list]: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#listvalue
[pb-struct]: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct
