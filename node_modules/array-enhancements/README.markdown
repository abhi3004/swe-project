# js-array-enhancements[![Build Status](https://secure.travis-ci.org/llafuente/js-array-enhancements.png?branch=master)](http://travis-ci.org/llafuente/js-array-enhancements)

![NPM](https://nodei.co/npm/array-enhancements.png?compact=true)

## Introduction


Functions included

``` js

var array = require("array-enhancements");

```


* array.ize(Mixed item): Array

  Create an array given any type of argument


* array.add(Array, [Array[, ...]]): Array

  Append any given number of arrays into a new one


* array.clone(Array arr): Array

  Clone (could be recursive) a dense array

  Note: only loop arrays not objects


* array.insertAt(Array ar, Mixed o, Number index): Boolean

  Add an element at the specified index (alias of splice)


* array.combine(Array **&**dst, Array [, Array ...])

  Append any number of arrays into the first one


* array.countValues(Array array [, Boolean ci]): Array

  Counts all the values of an array

  Second argument (ci) enable case insensitive comparison

* array.sortObject(Array arr, String key)

  Sort an array of Objects by given key.


* array.chunk(Array array, Number size[, Boolean preserve_keys = false])

  Split an array into chunks


* array.shuffle(Array **&**arr)

  This function shuffles (randomizes the order of the elements in) an array.


* array.pad(Array arr, Number size, Mixed value): Array

  Returns a copy of the array padded to size specified by size with value value.

  If size is positive then the array is padded on the right. If it's negative then on the left. If the absolute value of size is less than or equal to the length of the array then no padding takes place


* array.product(Array arr): Number|NaN

  Calculate the product of values in an array


* array.sum(Array arr): Number|NaN

  Calculate the product of values in an array


* array.dense(Array arr): Array

  Create a new dense array from given one

* array.random(Array arr): Mixed

  Picks one random value of an array

* array.rand(Array arr, Number len): Array

  Picks one or more random entries out of an array, and returns the key (or keys) of the random entries.


* array.fill(Number start, Number count, Mixed value): Array

  Fill a new array with value


* array.column(arr, field): Array

  Return the values from a single column in the input array.

  Values should be Objects.


* array.kmap(Array arr, String field)

  Returns an Object with the key a property of the object.

  Values must be objects.


* array.search(Array arr, String key, Mixed value): Array

  Search in an array of Objects given key-value and return the list that match.


* array.random(Array arr): Mixed

  Get a random value, the array must be dense


* array.unique(Array arr): Array

  Create a new array removing duplicated values


* array.mapAsync (Array arr, Function callback(Mixed value, Number key, Function done), Function donecallback(Array results), Mixed thisArg)

  Executes a provided function (callback) once per array element.

  callback will receive a done callback to notify when it finished.

  the **done** callback receive the result.

  And when all is done, donecallback will be called.

  example:

```js
array.mapAsync(["file.txt", "file2.txt"], function(val, key, done) {
	fs.readFile(val, function(err, data) {
		done(data);
	});
}, function(contents) {
	// you have read all files, do your staff
});
  
```


* array.mapSerial (Array arr, Function callback(Mixed value, Number key, Function next, Function end), Function donecallback(Array results), Mixed thisArg)

  Executes a provided function (callback) once per array element, one by one.

  callback will receive a **next** callback to notify when it finished and **end** callback to notify do not continue.

  the next callback receive the result and and optional key.


```js
array.mapSerial(["file.txt", "file2.txt"], function(val, key, next, end) {
	fs.readFile(val, function(err, data) {
		next(data, val);
	});
}, function(contents) {
	// you have read all files, do your staff
	// constest is an object: {"file.txt": "???", "file2.txt": "???"}
});
  
```


Compatibility layer for old browsers @lib/arrays-compat.js (mostly from MDN)

* Array.prototype.reduce
* Array.prototype.filter
* Array.prototype.reduceRight
* Array.prototype.some
* Array.prototype.every
* Array.prototype.map
* Array.prototype.forEach

```

## Install

With [npm](http://npmjs.org) do:

```

npm install array-enhancements

```

## test (travis-ci ready!)

```

npm test
// or
cd /test
node test.js

```

## license

MIT.
