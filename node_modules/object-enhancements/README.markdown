# js-object-enhancements [![Build Status](https://secure.travis-ci.org/llafuente/js-object-enhancements.png?branch=master)](http://travis-ci.org/llafuente/js-object-enhancements)
==========

## Introduction
============

Functions included

```js

var object = require("object-enhancements");

// proper typeof implementation
object.typeof(): String

// loop an object, like forEach
object.forEach(obj, callback(value[, key]))
object.each(obj, callback(value[, key]))

// recursive clone the object, no only the structure also the values
object.clone(obj): Mixed

// merge two objects recursive.
// to merge only existing keys in from object: must_exists = true
// to also clone values: clone = true
object.merge(from, to[, clone = false[, must_exists = false]]): Object

// combine two arrays into an object given keys-values
object.combine(array_keys, array_values): Object

// extract from an object given keys
// extract return an object with all keys given, if not found in obj will return default_value
object.extract(obj, array_keys[, default_value = null]): Object

// check if an object don't have any key-value
object.empty(obj): Boolean

// tell you how depth is the object structure
// note: also loop arrays
object.depth(obj): Number

// sort object keys, so in loop will be sorted
object.ksort(obj)

// recursive filter an object (sync!)
object.rFilter(obj, callback, loop_arrays): Object

// create a new object with keys prefixed
object.prefixKeys(obj, prefix, ignore_keys): Object

// create a new object with removing the prefix from keys (if exists)
object.prefixKeys(obj, prefix, ignore_keys): Object

// Computes the difference of objects with additional index check
object.diff(obj[, ...Objects]): Object


// compatibility layer for old browsers
Object.keys // what you expect, get all enumerable keys
Object.defineProperty // throws in case of setter/getter
Object.seal // just do nothing



```

## Install
==========

With [npm](http://npmjs.org) do:

```

npm install object-enhancements


```

## test (travis-ci ready!)
==========================

```

npm test
// or
cd /test
node test.js

```

## license
==========

MIT.
