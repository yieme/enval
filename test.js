function assert(ok, message) { // minimal assert, no need for a complex library
  console.log(message, (ok) ? 'OK' : 'FAILED')
  if (!ok) process.exit(1)
}

var envic = require('./')

var val = envic('TEST', undefined, true)
console.log(val)
assert(val !== undefined, 'TEST should exist');
assert(val.foo, '"foo" should exist');
assert(val.foo == 'bar', '"foo" should equal "bar"')

console.log('')
val = envic('TEST2', undefined, true)
assert(val !== undefined, 'TEST2 should exist');
assert(val.greet, '"greet" should exist');
assert(val.greet == 'Bob', '"greet" should equal "Bob"')
assert(val.age, '"age" should exist');
assert(val.age == 18, '"age" should equal 18')

console.log('')
val = envic('TEST3', undefined, true)
assert(val === null, 'TEST3 should be null');

console.log('')
val = envic('TEST4', undefined, true)
assert(val !== undefined, 'TEST4 should exist');
assert(val === 21, 'TEST4 should equal 21');

console.log('')
val = envic('TEST5', undefined, true)
assert(val !== undefined, 'TEST5 should exist');
assert(val == "Howdy", 'TEST5 should equal "Howdy"');

console.log('')
val = envic('TEST6', undefined, true)
assert(val !== undefined, 'TEST6 should exist');
assert(val === 0, 'TEST6 should equal 0');

console.log('')
val = envic('TEST7', undefined, true)
assert(val !== undefined, 'TEST7 should exist');
assert(val === false, 'TEST7 should equal false');

console.log('')
val = envic('TEST8', undefined, true)
assert(val === undefined, 'TEST8 should not exist');

console.log('')
val = envic('TEST9', undefined, true)
assert(val !== undefined, 'TEST9 should exist');
assert(val == 'a:b,c:d,e', 'TEST9 should equal "a:b,c:d,e" as it is malformed JSON and JSONIC')

console.log('')
val = envic('TEST10', undefined, 1)
assert(val === 'Hi', 'TEST10 should be "Hi"');

console.log('')
val = envic('TEST11', undefined, function(v) { return v })
assert(val === 'Yo', 'TEST11 should be "Yo"');

console.log('')
val = envic('TEST_FN', undefined, function(v) { return 'No' })
assert(val === 'Yes', 'TEST_FN should be "Yes"');
