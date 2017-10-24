(function () {
    "use strict";

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable("toString"),
        dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
        ],
        dontEnumsLength = dontEnums.length,
        ArrayPush = Array.prototype.push,
        ObjectConstructor = Object.prototype.constructor,
        __typeof,
        __merge,
        __depth,
        __rfilter,
        __debug = true;

    module.exports["typeof"] = __typeof = function (val) {
        if (val === null || val === undefined) {
            return "null";
        }
        // dont deal with undefine...
        if (val === true || val === false) {
            return "boolean";
        }

        var type = typeof val;

        if (type === "object") {
            // for performance, we check if it"s a plain object first
            if (type.constructor === ObjectConstructor) {
                return type;
            }

            if (val.push === ArrayPush && val.length != null) { // != null is ok!
                return "array";
            }
            // for performance, I will keep this insecure
            // if (hasOwnProperty.call(val, "callee")) {
            if (val.hasOwnProperty && val.hasOwnProperty("callee")) {
                return "arguments";
            }
            if (val instanceof Date) {
                return "date";
            }
            if (val instanceof RegExp) {
                return "regexp";
            }

            // this is an instance of something?
        } else if (type === "number" && isNaN(val)) {
            return "null";
        }

        return type;
    };

    //
    // Object
    //

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = function (obj) {
            if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
                throw new TypeError("Object.keys called on non-object");
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }

    // define Object.defineProperty if not found, no functionality just a replacement so your code not throw!
    if (!Object.defineProperty) {
        Object.defineProperty = function (obj, name, prop) {
            if (prop.get || prop.set) {
                throw new Error("this is not supported in your js.engine");
            }
            obj[name] = prop.value;
        };
    }


    // define Object.seal if not found, no functionality just a replacement so your code not throw!
    if (!Object.seal) {
        Object.seal = function (obj) {
            return obj;
        };
    }

    module.exports.values = function (obj) {
        if (__debug) {
            if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
                throw new TypeError("Object.values called on non-object");
            }
        }

        var result = [],
            prop;

        for (prop in obj) {
            if (!__debug || hasOwnProperty.call(obj, prop)) {
                result.push(obj[prop]);
            }
        }

        return result;
    };


    /**
     * get the keys of an object (or anything iterable for...in) note: remove prototype key
     *
     * @param {Object} object
     * @param {Function} fn
     * @returns {Object} object
     */
    function __each(object, fn) {
        var key = null;

        for (key in object) {
            fn(object[key], key);
        }

        return object;
    }

    module.exports.each = __each;

    module.exports.forEach = __each;

    module.exports.clone = function (obj) {
        return __merge({}, obj, true, false);
    };

    /**
     * merge two object
     *
     *
     * @params {Object} to, this parameter is modified
     * @params {Object} from
     * @params {Boolean} clone
     * @params {Boolean} must_exists do not allow undefined in the objects
     */
    module.exports.merge = __merge = function (to, from, clone, must_exists) {
        //console.log("Object.merge", from);
        clone = clone || false;
        must_exists = must_exists || false;

        var ftype = __typeof(from),
            key,
            ret;

        switch (ftype) {
        case "string":
            return clone ? "" + from : from;
        case "number":
            return clone ? 0 + from : from;
        case "array": // maybe need more deep clone ?

            if (clone) {
                ret = [];
                for (key = 0; key < from.length; ++key) {
                    ret[key] = __merge(to[key] || {}, from[key], clone, must_exists);
                }

                return ret;
            }

            return from;
        case "boolean":
            return clone ? (from ? true : false) : from;
        case "null":
            return null;
        case "function":
            return from;
        case "object":
            // to it not an object, overwrite!
            ret = __typeof(to) !== "object" ? {} : to || {};
            // if has prototype just copy
            key = null;

            for (key in from) {
                if (key !== "prototype") {
                    if (ret[key] === undefined) {
                        if (must_exists) {
                            continue;
                        }
                        ret[key] = {};
                    }
                    ret[key] = __merge(ret[key] || {}, from[key], clone, must_exists);
                }
            }

            return ret;
        case "regexp":
            return new RegExp(from.source);
        case "date":
            return clone ? new Date(from) : from;
        }
        // unknown type... just return
        return from;
    };

    module.exports.combine = function (keys, values) {
        values = values || [];
        var i,
            ret = {};

        for (i = 0; i < keys.length; ++i) {
            ret[keys[i]] = values[i] === undefined ? null : values[i];
        }
        return ret;
    };

    module.exports.ksort = function (from) {
        var keys = Object.keys(from),
            i,
            ret = {};

        for (i = 0; i < keys.length; ++i) {
            ret[keys[i]] = from[keys[i]];
        }

        return ret;
    };

    module.exports.extend = function () {
        var target = arguments[0] || {},
            o,
            p,
            i,
            len;

        for (i = 1, len = arguments.length; i < len; i++) {
            o = arguments[i];

            if ("object" === typeof o && o !== null) {
                for (p in o) {
                    target[p] = o[p];
                }
            }
        }

        return target;
    };

    module.exports.extract = function (from, keys, default_value) {
        var i,
            ret = {};

        default_value = default_value === undefined ? null : default_value;

        for (i = 0; i < keys.length; ++i) {
            ret[keys[i]] = from[keys[i]] === undefined ? default_value : from[keys[i]];
        }

        return ret;
    };

    module.exports.empty = function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    };

    module.exports.depth = __depth = function (obj) {
        var i,
            max,
            props = false,
            d = 0;

        if (obj === null || obj === undefined) {
            return 0;
        }

        if (Array.isArray(obj)) {
            // array

            for (i = 0, max = obj.length; i < max; ++i) {
                d = Math.max(d, __depth(obj[i]));
            }
            props = max > 0;
        } else if ("object" === typeof obj) {
            // object

            for (i in obj) {
                props = true;
                d = Math.max(d, __depth(obj[i]));
            }
        }

        return (props ? 1 : 0) + d;
    };

    module.exports.rFilter = __rfilter = function (obj, callback, loop_arrays) {
        var i,
            max;
        loop_arrays = loop_arrays === true;

        if (Array.isArray(obj)) {
            // array
            if (!loop_arrays) {
                obj = callback(obj);
            } else {
                for (i = 0, max = obj.length; i < max; ++i) {
                    obj[i] = __rfilter(obj[i], callback, loop_arrays);
                }
            }

            return obj;
        }

        if ("object" === typeof obj) {
            // object
            if (!(obj instanceof Date || obj instanceof RegExp)) {

                for (i in obj) {
                    obj[i] = __rfilter(obj[i], callback, loop_arrays);
                }
                return obj;
            }
        }

        return callback(obj);
    };

    module.exports.prefixKeys = function (obj, prefix, ignore_keys) {
        ignore_keys = ignore_keys || [];
        var i,
            ret = {};

        if (ignore_keys.length) {
            for (i in obj) {
                if (ignore_keys.indexOf(i) === -1) {
                    ret[prefix + i] = obj[i];
                } else {
                    ret[i] = obj[i];
                }
            }
        } else {
            for (i in obj) {
                ret[prefix + i] = obj[i];
            }
        }

        return ret;
    };

    module.exports.remPrefixKeys = function (obj, prefix, ignore_keys) {
        ignore_keys = ignore_keys || [];
        var i,
            prefix_len = prefix.length,
            ret = {};

        if (ignore_keys.length) {
            for (i in obj) {
                if (ignore_keys.indexOf(i) === -1) {
                    if (i.indexOf(prefix) === 0) {
                        ret[i.substring(prefix_len)] = obj[i];
                    } else {
                        ret[i] = obj[i];
                    }
                } else {
                    ret[i] = obj[i];
                }
            }
        } else {
            for (i in obj) {
                if (i.indexOf(prefix) === 0) {
                    ret[i.substring(prefix_len)] = obj[i];
                } else {
                    ret[i] = obj[i];
                }
            }
        }

        return ret;
    };


    module.exports.diff = function (obj) {
        var ret = {},
            argl = arguments.length,
            k1,
            i,
            found;

        for (k1 in obj) {
            found = false;
            for (i = 1; i < argl && !found; ++i) {
                if (obj[k1] === arguments[i][k1]) {
                    found  = true;
                }
            }

            if (!found) {
                ret[k1] = obj[k1];
            }

        }

        return ret;

    };

}());