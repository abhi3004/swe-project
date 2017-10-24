(function () {
    "use strict";
    // from mozilla
    if (!Array.prototype.reduce) {
        /**
         * Applies iteratively the callback function to the elements of the array, so as to reduce the array to a single value.
         */
        Array.prototype.reduce = function reduce(accumulator) {
            var i, l = this.length, curr;

            if (typeof accumulator !== "function") { // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
                throw new TypeError("First argument is not callable");
            }

            if ((l === 0 || l === null) && (arguments.length <= 1)) {// == on purpose to test 0 and false.
                throw new TypeError("Array length is 0 and no second argument");
            }

            if (arguments.length <= 1) {
                curr = this[0]; // Increase i to start searching the secondly defined element in the array
                i = 1; // start accumulating at the second element
            } else {
                curr = arguments[1];
            }

            for (i = i || 0; i < l; ++i) {
                if (i in this) {
                    curr = accumulator.call(undefined, curr, this[i], i, this);
                }
            }

            return curr;
        };
    }

    // from mozilla
    if (!Array.prototype.filter) {
        /**
        * Iterates over each value in the array passing them to the callback function. If the callback function returns true, the current value from array is returned into the result array.
        */
        Array.prototype.filter = function (fun /*, thisp */) {
            if (this === null) {
                throw new TypeError();
            }

            var t = Object(this),
                len = t.length >>> 0,
                res,
                thisp,
                i,
                val;

            if ('function' !== typeof fun) {
                throw new TypeError();
            }

            res = [];
            thisp = arguments[1];
            for (i = 0; i < len; i++) {
                if (i in t) {
                    val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }

    // from mozilla
    if ('function' !== typeof Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function (callback, opt_initialValue) {
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduceRight. For instance,
                // IE8 does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduceRight called on null or undefined');
            }

            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var length = this.length >>> 0,
                index,
                value,
                isValueSet = false;

            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }
            for (index = length - 1; -1 < index; --index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }
            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            return value;
        };
    }

    // from mozilla
    if (!Array.prototype.some) {
        Array.prototype.some = function (fun /*, thisp */) {
            if (this === null) {
                throw new TypeError();
            }
            if (typeof fun !== "function") {
                throw new TypeError();
            }

            var t = Object(this),
                len = t.length >>> 0,
                thisp = arguments[1],
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(thisp, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    // from mozilla
    if (!Array.prototype.every) {
        Array.prototype.every = function (fun /*, thisp */) {
            var t,
                len,
                i,
                thisp;

            if (this === null) {
                throw new TypeError();
            }

            t = Object(this);
            len = t.length >>> 0;
            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            thisp = arguments[1];
            for (i = 0; i < len; i++) {
                if (i in t && !fun.call(thisp, t[i], i, t)) {
                    return false;
                }
            }

            return true;
        };
    }

    // from mozilla
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            var i,
                len;

            for (i = 0, len = this.length; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    // from mozilla
    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.com/#x15.4.4.19
    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {
            var T,
                A,
                k,
                O,
                len,
                kValue,
                mappedValue;

            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
                T = thisArg;
            }

            // 6. Let A be a new array created as if by the expression new Array(len) where Array is
            // the standard built-in constructor with that name and len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Let mappedValue be the result of calling the Call internal method of callback
                    // with T as the this value and argument list containing kValue, k, and O.
                    mappedValue = callback.call(T, kValue, k, O);

                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                    // and false.

                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }

            // 9. return A
            return A;
        };
    }

    // from mozilla
    if(!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }
}());