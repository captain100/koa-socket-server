function add() {
  console.log(11111, arguments);
  var _args = [].slice.call(arguments);
  var adder = function() {
    var _adder = function() {
      console.log(222222, arguments);
      [].push.apply(_args, [].slice.call(arguments));
      console.log("this is args", _args);
      return _adder;
    };

    _adder.toString = function() {
      console.log(3333333, _args);
      return _args.reduce(function(a, b) {
        return a + b;
      });
    };
    return _adder;
  };
  console.log(4444, arguments);
  return adder.apply(null, [].slice.call(arguments));
}

// add(1, 2, 3, 4, 5).toString();
// add(1, 2, 3, 4)(5);
// add(1)(2)(3)(4)(5);

function fn(m) {
  return m;
}
fn.toString = function() {
  return 20;
};

// console.log(fn(3) + 10);

// Array.prototype._map = function(fn, context) {
//   var arr = [];
//   if (typeof fn == "function") {
//     var k = 0;
//     var len = this.length;
//     for (; k < len; k++) {
//       arr.push(fn.call(context, this[k], k, this));
//     }
//   } else {
//     return new Error("typeError : fn is not function");
//   }
//   return arr;
// };

Array.prototype._map = function(fn, context) {
  var temp = [];
  if (typeof fn === "function") {
    for (var i = 0; i < this.length; i++) {
      temp.push(fn.call(context, this[i], i, this));
    }
  } else {
    return new Error("this fn is not function");
  }
  return temp;
};
var arr = [1, 2, 3, 4]
  .map(function(item, index) {
    return item + index;
  })
  .join("-");

var _arr = [1, 2, 3, 4]
  ._map(function(item, index) {
    return item + index;
  })
  .join("-");

// console.log(arr);

// console.log(_arr);

// add(1, 2, 3);
// add(1)(2)(3);
// add(3, 2)(1);

function currying(fn) {
  var slice = Array.prototype.slice;
  var _args = slice.call(arguments, 1);
  console.log(_args);
  return function() {
    var _inargs = slice.call(arguments);
    var arr = _args.concat(_inargs);
    console.log(arr);
    return fn.apply(null, arr);
  };
}

function square(i) {
  return i * i;
}

function dubble(i) {
  return 2 * i;
}

function map(handle, list) {
  return list.map(handle);
}

var mapSQ = currying(map, square);

console.log(mapSQ([1, 2, 3, 4, 5]));
