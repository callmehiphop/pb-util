import test from 'ava';
import {list, struct, value, JsonValue} from './index';

const arr = [null, 10];

const obj = {
  foo: 'bar',
  no: false,
  nil: null
};

const objWithUndefined = {
  foo: 'bar',
  no: false,
  nil: null,
  isUndefined: undefined
};

const listValue = {
  values: [{
    kind: 'nullValue',
    nullValue: 0
  }, {
    kind: 'numberValue',
    numberValue: 10
  }]
};

const structValue = {
  fields: {
    foo: {
      kind: 'stringValue',
      stringValue: 'bar'
    },
    no: {
      kind: 'boolValue',
      boolValue: false
    },
    nil: {
      kind: 'nullValue',
      nullValue: 0
    }
  }
};

test('value.encode - object', t => {
  const actual = value.encode(obj);
  const expected = {
    kind: 'structValue',
    structValue
  };

  t.deepEqual(actual, expected);
});

test('value.encode - array', t => {
  const actual = value.encode(arr);
  const expected = {
    kind: 'listValue',
    listValue
  };

  t.deepEqual(actual, expected);
});

test('value.encode - number', t => {
  const actual = value.encode(10);
  const expected = {
    kind: 'numberValue',
    numberValue: 10
  };

  t.deepEqual(actual, expected);
});

test('value.encode - string', t => {
  const actual = value.encode('foo');
  const expected = {
    kind: 'stringValue',
    stringValue: 'foo'
  };

  t.deepEqual(actual, expected);
});

test('value.encode - boolean', t => {
  const actual = value.encode(true);
  const expected = {
    kind: 'boolValue',
    boolValue: true
  };

  t.deepEqual(actual, expected);
});

test('value.encode - null', t => {
  const actual = value.encode(null);
  const expected = {
    kind: 'nullValue',
    nullValue: 0
  };

  t.deepEqual(actual, expected);
});

test('value.encode - unknown', t => {
  t.throws(() => {
    value.encode(new Date() as unknown as JsonValue);
  });
});

test('value.decode - listValue', t => {
  const encodedValue = {
    kind: 'listValue',
    listValue
  };

  const actual = value.decode(encodedValue);
  t.deepEqual(actual, arr);
});

test('value.decode - structValue', t => {
  const encodedValue = {
    kind: 'structValue',
    structValue
  };

  const actual = value.decode(encodedValue);
  t.deepEqual(actual, obj);
});

test('value.decode - nullValue', t => {
  const encodedValue = {
    kind: 'nullValue',
    nullValue: 0
  };

  const actual = value.decode(encodedValue);
  t.is(actual, null);
});

test('value.decode - stringValue', t => {
  const encodedValue = {
    kind: 'stringValue',
    stringValue: 'foo'
  };

  const actual = value.decode(encodedValue);
  t.is(actual, 'foo');
});

test('value.decode - numberValue', t => {
  const encodedValue = {
    kind: 'numberValue',
    numberValue: 10
  };

  const actual = value.decode(encodedValue);
  t.is(actual, 10);
});

test('value.decode - boolValue', t => {
  const encodedValue = {
    kind: 'boolValue',
    boolValue: true
  };

  const actual = value.decode(encodedValue);
  t.is(actual, true);
});

// https://github.com/callmehiphop/pb-util/issues/5
test('value.decode - multiple values', t => {
  const encodedValue = {
    kind: 'stringValue',
    stringValue: 'foo',
    nullValue: 0
  };

  const actual = value.decode(encodedValue);
  t.is(actual, 'foo');
});

test('value.decode - no kind', t => {
  const encodedValue = {
    stringValue: 'foo'
  };

  const actual = value.decode(encodedValue);
  t.is(actual, 'foo');
});

test('list.encode', t => {
  const actual = list.encode(arr);
  t.deepEqual(actual, listValue);
});

test('list.decode', t => {
  const actual = list.decode(listValue);
  t.deepEqual(actual, arr);
});

test('struct.encode', t => {
  const actual = struct.encode(obj);
  t.deepEqual(actual, structValue);
});

test('struct.encode - undefined value', t => {
  const actual = struct.encode(objWithUndefined);
  t.deepEqual(actual, structValue);
});

test('struct.decode', t => {
  const actual = struct.decode(structValue);
  t.deepEqual(actual, obj);
});

test('struct.decode - undefined fields', t => {
  const actual = struct.decode({});
  t.deepEqual(actual, {});
});
