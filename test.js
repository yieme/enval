function assert(ok, message) { // minimal assert, no need for a complex library
  console.log(message, (ok) ? 'OK' : 'FAILED')
  if (!ok) process.exit(1)
}

var enval = require('./')

var val = enval('TEST', undefined, true)
console.log(val)
assert(val !== undefined, 'TEST should exist');
assert(val.foo, '"foo" should exist');
assert(val.foo == 'bar', '"foo" should equal "bar"')

console.log('')
val = enval('TEST2', undefined, true)
assert(val !== undefined, 'TEST2 should exist');
assert(val.greet, '"greet" should exist');
assert(val.greet == 'Bob', '"greet" should equal "Bob"')
assert(val.age, '"age" should exist');
assert(val.age == 18, '"age" should equal 18')

console.log('')
val = enval('TEST3', undefined, true)
assert(val === null, 'TEST3 should be null');

console.log('')
val = enval('TEST4', undefined, true)
assert(val !== undefined, 'TEST4 should exist');
assert(val === 21, 'TEST4 should equal 21');

console.log('')
val = enval('TEST5', undefined, 4)
assert(val !== undefined, 'TEST5 should exist');
assert(val == "Howdy", 'TEST5 should equal "Howdy"');

console.log('')
val = enval('TEST6', undefined, true)
assert(val !== undefined, 'TEST6 should exist');
assert(val === 0, 'TEST6 should equal 0');

console.log('')
val = enval('TEST7', undefined, true)
assert(val !== undefined, 'TEST7 should exist');
assert(val === false, 'TEST7 should equal false');

console.log('')
val = enval('TEST8', undefined, true)
assert(val === undefined, 'TEST8 should not exist');

console.log('')
val = enval('TEST9', undefined, true)
assert(val !== undefined, 'TEST9 should exist');
assert(val == 'a:b,c:d,e', 'TEST9 should equal "a:b,c:d,e" as it is malformed JSON and JSONIC')

console.log('')
val = enval('TEST10', undefined, 1)
assert(val === 'Hi', 'TEST10 should be "Hi"');

console.log('')
val = enval('TEST11', undefined, function(v) { return v })
assert(val === 'Yo', 'TEST11 should be "Yo"');

console.log('')
val = enval('TEST_FN', undefined, function(v) { return 'No' })
assert(val === 'Yes', 'TEST_FN should be "Yes"');

console.log('')
val = enval('TEST_FN', undefined, 0)
assert(val === 'Yes', 'TEST_FN should still be "Yes"');
