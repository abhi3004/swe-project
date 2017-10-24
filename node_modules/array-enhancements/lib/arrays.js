(function () {
    "use strict";

/**
* TODO
* - some mozilla functions use .call but thisp could be "undefined" so -> can be replaced by direct call ?!
*
*/

    var slice = Array.prototype.slice,
        hasOwnProperty = Object.hasOwnProperty,
        __clone,
        __rfilter;

    /**
     * Create an array given any type of argument
     *
     * @param {Mixed} item
     * @returns {Array}
     */
    module.exports.ize = function (item) {
        if (item === null || item === undefined) {
            return [];
        }

        if (item instanceof Array) {
            return item;
        }

        if (hasOwnProperty.call(item, "callee")) {
            return slice.call(item);
        }

        // TODO deal with Iterable objects like Collections!

        return [ item ];
    };

    module.exports.from = Array.ize;

    /**
     * Append any given number of arrays into a new one
     * @todo support any type of arguments
     *
     * @returns Array
    */
    module.exports.add = function () {
        var i,
            j,
            ret = [],
            ar;

        for (i = 0; i < arguments.length; ++i) {
            ar = arguments[i];
            for (j = 0; j < ar.length; ++j) {
                ret.push(ar[j]);
            }
        }

        return ret;
    };
    /**
     * Clone (could be recursive) a dense array
     * Note: only loop arrays not objects
     *
     * @param Array ar
     * @param Boolean deep
     * @returns Array
    */
    module.exports.clone = __clone = function (ar, deep) {
        var i = ar.length,
            clone = new Array(i);
        while (i--) {
            if (deep && ar[i] instanceof Array) {
                clone[i] = __clone(ar[i], true);
            } else {
                clone[i] = ar[i];
            }
        }
        return clone;
    };
    /**
     * Add an element at the specified index
     *
     * @param {Array} ar
     * @param {Mixed} o The object to add
     * @param {int} index The index position the element has to be inserted
     * @return {Boolean} true if o is successfully inserted
     */
    module.exports.insertAt = function (ar, o, index) {
        if (index > -1 && index <= ar.length) {
            ar.splice(index, 0, o);
            return true;
        }
        return false;
    };
    /**
     * Get a random value, the array must be dense
     *
     * @param {Array} arr
     * @returns {Mixed}
     */
    module.exports.random = function (arr) {
        var l = Math.floor(Math.random() * arr.length);
        return arr[l];
    };
    /**
     * Create a new array removing duplicated values
     *
     * @param {Array} arr
     * @returns {Array}
     */
    module.exports.unique = function (arr) {
        var ret = [],
            i;

        for (i = 0; i < arr.length; ++i) {
            if (ret.indexOf(arr[i]) === -1) {
                ret.push(arr[i]);
            }
        }

        return ret;
    };

    /**
     * sort an array (must be dense)
     *
     * @param {Array} arr
     * @returns {Array}
     */
    module.exports.sortObject = function (arr, key) {
        arr.sort(function (a, b) {
            if ("string" === (typeof a[key])) {
                return a.value.toLowerCase().localeCompare(b.value.toLowerCase());
            }
            return a[key] - b[key];
        });

        return arr;
    };
    /**
     * This function shuffles (randomizes the order of the elements in) an array.
     * credits -  http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
     * @note Given array is modified!
     * @param {Array} arr
     * @returns {Array}
     */
    module.exports.shuffle = function (arr) {
        var currentIndex = arr.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle..
        while (0 !== currentIndex) {

            // Pick a remaining element..
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr;
    };

    /**
     * Iterates over each value in the array passing them to the callback function.
     * Returns an array with all the callback results
     * @param {Array} arr
     * @param {Function} fun
     * @returns {Array}
     */
    module.exports.rfilter = __rfilter = function (arr, fun /*, thisp */) {
        if (arr === null) {
            throw new TypeError();
        }

        var t = Object(arr),
            len = t.length >>> 0,
            res,
            thisp,
            i,
            val,
            r;

        if ("function" !== typeof fun) {
            throw new TypeError();
        }

        res = [];
        thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t) {
                val = t[i]; // in case fun mutates this
                r = fun.call(thisp, val, i, t);
                if (r !== undefined) {
                    res.push(r);
                }
            }
        }

        return res;
    };

    module.exports.chunk = function (arr, size, preserve_keys) {
        preserve_keys = preserve_keys || false;

        var i = 0,
            j = 0,
            key,
            val,
            chunks = [[]];

        //while( @list( $key, $value ) = @each( arr ) ) {
        for (key = 0; key < arr.length; ++key) {
            val = arr[key];


            if (chunks[i].length < size) {
                if (preserve_keys) {
                    chunks[i][key] = val;
                    j++;
                } else {
                    chunks[i].push(val);
                }
            } else {
                i++;
                chunks.push([]);

                if (preserve_keys) {
                    chunks[i][key] = val;
                    j++;
                } else {
                    j = 0;
                    chunks[i][j] = val;
                }
            }
        }

        return chunks;
    };
    /**
     * returns the values from a single column of the array-of-objects/arrays, identified by the column_key.
     * Optionally, you may provide an index_key to index the values in the returned array by the values from the index_key column in the input array.
     */
    module.exports.column = function (arr, field) {
        return Array.rfilter(arr, function (x) { return x ? x[field] : undefined; });
    };
    /**
     * Append any number of arrays into the first one
     *
     * @param {Array} dst
     * @returns {Array}
     */
    module.exports.combine = function (dst) {
        var i,
            j,
            ar;

        for (j = 1; j < arguments.length; ++j) {
            ar = arguments[j];

            for (i = 0; i < ar.length; ++i) {
                dst.push(ar[i]);
            }
        }
    };
    /**
     * Counts all the values of an array
     */
    module.exports.countValues = function (arr, ci) {
        ci = ci || false;
        var i,
            counter = {},
            val;

        for (i = 0; i < arr.length; ++i) {
            val = arr[i];
            if (ci && "string" === typeof val) {
                val = val.toLowerCase();
            }

            if (counter[val]) {
                ++counter[val];
            } else {
                counter[val] = 1;
            }
        }

        return counter;
    };
    /**
     * Returns a copy of the array padded to size specified by size with value value. If size is positive then the array is padded on the right, if it"s negative then on the left. If the absolute value of size is less than or equal to the length of the array then no padding takes place
     */
    module.exports.pad = function (arr, size, value) {
        if (Math.abs(size) <= arr.length) {
            return arr;
        }
        var out = [],
            i,
            len;

        if (size > 0) {
            for (i = 0;  i < size; ++i) {
                out[i] = i < arr.length ? arr[i] : value;
            }
        } else {
            size = Math.abs(size);
            len = size - arr.length;
            for (i = 0;  i < size; ++i) {
                out[i] = i < len ? value : arr[i - len];
            }
        }

        return out;
    };
    /**
     * Calculate the product of values in an array
     */
    module.exports.product = function (arr) {
        var sum = 1,
            len = arr.length,
            i;

        for (i = 0; i < len; i++) {
            sum *= parseFloat(arr[i]); // be sure it"s a number..
        }

        return sum;
    };
    /**
     * Picks one or more random entries out of an array, and returns the key (or keys) of the random entries.
     */
    module.exports.rand = function (arr, len) {
        var out = [],
            i;
        len = len || 1;

        for (i = 0; i < len; ++i) {
            out.push(Math.floor(Math.random() * arr.length));
        }

        return out;
    };

    module.exports.dense = function (arr) {
        var out = [];

        arr.forEach(function (val) {
            out.push(val);
        });

        return out;
    };

    module.exports.sum = function (arr) {
        var sum = 0,
            len = arr.length,
            i;

        for (i = 0; i < len; i++) {
            sum += parseFloat(arr[i]); // be sure it"s a number..
        }

        return sum;
    };

    /**
     * Fill an array with values
     */
    module.exports.fill = function (start, count, value) {
        var arr = [],
            len = start + count,
            i;

        for (i = start; i < len; ++i) {
            arr[i] = value;
        }

        return arr;
    };
    /**
     * Return the values from a single column in the input array
     */
    module.exports.column = function (arr, field) {
        return __rfilter(arr, function (x) { return x[field]; });
    };

    /**
     * returns an object with the same values keys given a property of the object
     * @throws if the field is undefined!
     */
    module.exports.kmap = function (arr, field) {
        var ret = {};

        arr.forEach(function (v) {
            if (!v[field]) {
                console.log(v);
                throw new Error("field not found in v");
            }

            ret[v[field]] = v;
        });

        return ret;
    };


    module.exports.oFilter = function (arr, obj) {
        if (!arr) return [];

        var res = [],
            i,
            f,
            j,
            max = arr.length;

        for (i = 0; i < max; ++i) {
            if (arr[i]) {
                f = true;
                for (j in obj) {
                    if (arr[i][j] !== obj[j]) {
                        f = false;
                    }
                }
                if (f) {
                    res.push(arr[i]);
                }
            }
        }

        return res;
    };

    /**
     * Returns the key of the object contained in the array that has the same value in given key.
     * @throws if the field is undefined!
     */
    module.exports.search = function (arr, key, value) {
        if (!arr || !arr.length) {
            return -1;
        }

        var i,
            max = arr.length;

        for (i = 0; i < max; ++i) {
            if (arr[i] && arr[i][key] == value) {
                return i;
            }
        }

        return -1;
    };


    module.exports.mapAsync = function (arr, callback, donecallback, thisArg) {
        if (!arr || !arr.length) {
            return donecallback();
        }

        var i,
            max = arr.length,
            done_count = 0,
            ret = [],
            done = function(value, key) {
                if (ret.length === 0 && key) {
                    ret = {};
                }

                // no first
                key = key || done_count;
                ret[key] = value;


                if (++done_count === max) {
                    donecallback(ret);
                }
            };

        for (i = 0; i < max; ++i) {
            if (thisArg) {
                callback.call(thisArg, arr[i], i, done);
            } else {
                callback(arr[i], i, done);
            }

        }
    };

    module.exports.mapSerial = function (arr, callback, donecallback, thisArg) {
        if (!arr || !arr.length) {
            return donecallback();
        }

        var i = 0,
            max = arr.length,
            ret = [],
            next = function(value, key) {
                // change ret to object if first call has key
                if (i === 1 && key) {
                    ret = {};
                }


                // no first
                if (i !== 0) {
                    key = key || i;
                    ret[key] = value;
                }

                var ci = i,
                    ct = arr[i];

                if (++i > max) {
                    return donecallback(ret);
                }

                if (thisArg) {
                    callback.call(thisArg, ct, ci, next, end);
                } else {
                    callback(ct, ci, next, end);
                }

            },
            end = function(value, key) {
                key = key || i;
                ret[key] = value;

                donecallback(ret);
            };

        next();
    };
}());