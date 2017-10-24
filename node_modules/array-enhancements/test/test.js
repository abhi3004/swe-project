(function () {
    "use strict";
    require("ass");

    var array = require("../index.js"),
        tap = require("tap"),
        test = tap.test;


    test("array.chunk", function (t) {
        t.deepEqual(array.chunk(['a', 'b', 'c', 'd', 'e'], 2), [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e' ] ], "array.chunk 2");
        t.deepEqual(array.chunk(['a', 'b', 'c', 'd', 'e'], 2, true), [ [ 'a', 'b' ], [ , , 'c' ], [ , , , 'd' ], [ , , , , 'e' ] ], "array.chunk 2 preserve keys");
        t.end();
    });

    test("array.column", function (t) {
        var ar = [{x: 1, y: 2}, {x: 2}, {y: "b"}, {z: {x:1}}];

        t.deepEqual(array.column(ar, "x"), [1, 2], "array.column x");
        t.deepEqual(array.column(ar, "y"), [2, "b"], "array.column y");
        t.deepEqual(array.column(ar, "z"), [{x:1}], "array.column z");

        t.end();
    });

    test("array.combine", function (t) {
        var ar = [1,2,3],
            ar2 = [4,5,6],
            ar3 = [7,8,9],
            ar4 = [10];

        array.combine(ar, ar2);
        t.deepEqual(ar, [1, 2, 3, 4, 5, 6], "combine two args");

        array.combine(ar, ar3, ar4);
        t.deepEqual(ar, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "combine three args");


        t.end();
    });



    test("array.countValues", function (t) {
        var ar = ['J. Karjalainen', 'J. Karjalainen', 60, '60', 'J. Karjalainen', 'j. karjalainen', 'Fastway', 'FASTWAY', 'Fastway', 'fastway', 'YUP'],
            r1 = array.countValues(ar, false),
            r2 = array.countValues(ar, true);

        t.deepEqual(r1, { '60': 2,
            'J. Karjalainen': 3,
            'j. karjalainen': 1,
            Fastway: 2,
            FASTWAY: 1,
            fastway: 1,
            YUP: 1 }, "countValues case");


        t.deepEqual(r2, { '60': 2, 'j. karjalainen': 4, fastway: 4, yup: 1 }, "countValues icase");


        t.end();
    });


    test("array.product", function (t) {
        var ar = [2, 4, 6, 8],
            r1 = array.product(ar);

        t.deepEqual(r1, 384, "array.product");

        t.end();
    });

    test("array.dense", function (t) {
        var ar = [];

        ar[10] = 2;
        ar[20] = 4;

        t.deepEqual(array.dense(ar), [2,4], "array.dense");

        t.end();
    });


    test("array.ize", function (t) {
        t.deepEqual(array.ize(arguments), [ t ], "from args error");
        var obj = {x: 1};
        t.deepEqual(array.ize(obj), [ obj ], "ize object error");
        var num = 1000;
        t.deepEqual(array.ize(num), [ num ], "ize number error");
        var bool = true;
        t.deepEqual(array.ize(bool), [ bool ], "ize boolean error");
        var string = "test";
        t.deepEqual(array.ize(string), [ string ], "ize string error");
        var fn = function () {};
        t.deepEqual(array.ize(fn), [ fn ], "ize string error");

        t.end();
    });


    test("array.add", function (t) {
        var ar = [1,2,3],
            ar2 = [4,5,6],
            ar3 = [7,8,9];

        t.deepEqual(array.add(ar, ar2), [1, 2, 3, 4, 5, 6], "add two arrays");
        t.deepEqual(array.add(ar, ar2, ar3), [1, 2, 3, 4, 5, 6, 7, 8, 9], "add   three arrays");

        t.end();
    });




    test("array.clone", function (t) {
        var ar = [1,2,3],
            ar2 = [4,{},6],
            ar3 = ["xxx", true, 1.0];

        t.deepEqual(array.clone(ar), ar, "clone an array");
        t.deepEqual(array.clone(ar2), ar2, "clone an array");
        t.deepEqual(array.clone(ar3), ar3, "clone an array");
        t.equal(array.clone(ar3) !== ar3, true, "clone is not the same as the orignal");



        t.end();
    });



    test("array.insertAt", function (t) {
        var ar = [1,2,3];

        array.insertAt(ar, 4, 3);
        console.log(ar);
        t.deepEqual(ar, [1, 2, 3, 4], "4 insertAt 3");

        array.insertAt(ar, 0, 0);
        t.deepEqual(ar, [0, 1, 2, 3, 4], "4 insertAt 3");

        array.insertAt(ar, 9, 2);
        t.deepEqual(ar, [0, 1, 9, 2, 3, 4], "4 insertAt 3");

        array.insertAt(ar, 9, 50);
        t.deepEqual(ar, [0, 1, 9, 2, 3, 4], "out of bounds! no insert");

        array.insertAt(ar, 9, -1);
        t.deepEqual(ar, [0, 1, 9, 2, 3, 4], "out of bounds! no insert");

        t.end();
    });



    test("array.random", function (t) {
        var ar = [1,2,3];

        t.equal(ar.indexOf(array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(array.random(ar)) !== -1, true, "value is in the array");

        t.end();
    });

    test("array.unique", function (t) {
        var ar = [1, 1, 2, 3, 4, 5, 6, 2, 1, 3, 5, 7, 78, 2, 1, "xxx", "yyy", "xxx"];

        t.deepEqual(array.unique(ar), [1, 2, 3, 4, 5, 6, 7, 78, "xxx", "yyy"], "uniqueness");

        t.end();
    });



    test("array.kmap", function (t) {
        var ar = [
            {key: "a", value: 1},
            {key: "b", value: 2},
            {key: "c", value: 3},
        ];

        t.deepEqual(array.kmap(ar, "key"), {a: {key: "a", value: 1}, b: {key: "b", value: 2}, c: {key: "c", value: 3}}, "array.kmap");

        t.end();
    });

    test("array.sum", function (t) {
        t.deepEqual(array.sum([1, 2, 3]), 6, "array.sum");
        t.deepEqual(array.sum([1, 2, 3, 4]), 10, "array.sum");
        t.deepEqual(isNaN(array.sum([1, 2, 3, 4, "x"])), true, "array.sum NaN");

        t.end();
    });


    test("array.fill", function (t) {
        t.deepEqual(array.fill(0, 5, 9), [9,9,9,9,9], "array.fill");
        t.deepEqual(array.fill(1, 5, 9), [,9,9,9,9,9], "array.fill");

        t.end();
    });

    test("array.sortObject", function (t) {

        t.deepEqual(array.sortObject([
            {value: 1},
            {value: 7},
            {value: 5},
            {value: 2}
        ], "value"), [
            {value: 1},
            {value: 2},
            {value: 5},
            {value: 7}
        ], "array.sortObject");

        t.deepEqual(array.sortObject([
            {value: "a"},
            {value: "z"},
            {value: "h"},
            {value: "b"}
        ], "value"), [
            {value: "a"},
            {value: "b"},
            {value: "h"},
            {value: "z"}
        ], "array.sortObject");

        t.end();
    });

    test("array.shuffle", function (t) {

        var shu = array.shuffle([1, 2, 3]);

        t.deepEqual(shu.length, 3, "array.shuffle");

        t.deepEqual(shu.sort(), [1, 2, 3], "array.shuffle");

        t.end();
    });


    test("array.pad", function (t) {

        var input = [12, 10, 9];

        t.deepEqual(array.pad(input, 5, 0), [12, 10, 9, 0, 0], "array.pad");
        t.deepEqual(array.pad(input, -7, -1), [-1, -1, -1, -1, 12, 10, 9], "array.pad");
        t.deepEqual(array.pad(input, 2, "noop"), [12, 10, 9], "array.pad");

        t.end();
    });

    test("array.mapAsync", function (t) {

        var input = [500,250,1500],
            sum = 0,
            keys = [];

        array.mapAsync(input, function(v, k, done) {
            sum += v;
            keys.push(k);
            setTimeout(done, k * 250);
        }, function() {
            t.deepEqual(keys, [0, 1, 2], "loop all keys");
            t.deepEqual(sum, 2250, "sum is correct");

            t.end();
        });
    });

    test("array.oFilter", function (t) {

        var input = [{a: 0, b: 1, c: 2}, {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, {a: 0, b: 0, c: 2}],
            sum = 0,
            keys = [];

        t.deepEqual(array.oFilter(input, {a:0}), [{a: 0, b: 1, c: 2}, {a: 0, b: 0, c: 2}]);
        t.deepEqual(array.oFilter(input, {a:0, c:2}), [{a: 0, b: 1, c: 2}, {a: 0, b: 0, c: 2}]);
        t.deepEqual(array.oFilter(input, {b:1}), [{a: 0, b: 1, c: 2}, {a: 1, b: 1, c: 1}]);
        t.deepEqual(array.oFilter(input, {b:2}), [{a: 2, b: 2, c: 2}]);
        t.end();
    });


    test("array.mapSerial", function (t) {
        var input = [500,250,1500],
            sum = 0,
            keys = [];

        array.mapSerial(input, function(v, k, next, end) {
            sum += v;
            keys.push(k);
            setTimeout(next, k * 250);
        }, function() {
            t.deepEqual(keys, [0, 1, 2], "loop all keys");
            t.deepEqual(sum, 2250, "sum is correct");

            t.end();
        });
    });

    test("array.mapSerial end", function (t) {
        var input = [500,250,1500],
            sum = 0,
            keys = [];

        array.mapSerial(input, function(v, k, next, end) {
            sum += v;
            keys.push(k);
            if (k == 1) {
                end();
            } else {
                setTimeout(next, k * 250);
            }
        }, function() {
            t.deepEqual(keys, [0, 1], "loop all keys");
            t.deepEqual(sum, 750, "sum is correct");

            t.end();
        });
    });


    test("array.mapSerial keyed result", function (t) {
        var input = [500,250,1500],
            sum = 0,
            keys = ["x", "y", "z"];

        array.mapSerial(input, function(v, k, next, end) {
            next(input[k], keys[k]);
        }, function(result) {
            t.deepEqual(result, {
                x: 500,
                y: 250,
                z: 1500
            }, "correct result object");

            t.end();
        });
    });



    



}());