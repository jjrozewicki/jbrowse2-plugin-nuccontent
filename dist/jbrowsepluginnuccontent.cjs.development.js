'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var AdapterType = _interopDefault(require('@jbrowse/core/pluggableElementTypes/AdapterType'));
var TrackType = _interopDefault(require('@jbrowse/core/pluggableElementTypes/TrackType'));
var Plugin = _interopDefault(require('@jbrowse/core/Plugin'));
var models = require('@jbrowse/core/pluggableElementTypes/models');
var configuration = require('@jbrowse/core/configuration');
var mobxStateTree = require('mobx-state-tree');
var BaseAdapter = require('@jbrowse/core/data_adapters/BaseAdapter');
var rxjs = require('@jbrowse/core/util/rxjs');
var SimpleFeature = _interopDefault(require('@jbrowse/core/util/simpleFeature'));
var operators = require('rxjs/operators');
var React = require('react');
var React__default = _interopDefault(React);
var util = require('@jbrowse/core/util');
var CloseIcon = _interopDefault(require('@material-ui/icons/Close'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var defaultWindowSize = 1000;
var defaultWindowOverlap = 0;
var defaultCharactersA = "Gg";
var defaultCharactersB = "Cc";
var defaultCharactersAll = "AaTtGgCc";
var defaultCalculationMode = "average";
var configSchemaF = (function (pluginManager) {
  return configuration.ConfigurationSchema("NucContentAdapter", {
    sequenceAdapter: pluginManager.pluggableConfigSchemaType("adapter"),
    windowSize: {
      type: "integer",
      defaultValue: defaultWindowSize,
      description: "size of the region to calculate average over"
    },
    windowOverlap: {
      type: "integer",
      defaultValue: defaultWindowOverlap,
      description: "percent to overlap regions by"
    },
    charactersA: {
      type: "string",
      defaultValue: defaultCharactersA,
      description: "which characters to count for group A"
    },
    charactersB: {
      type: "string",
      defaultValue: defaultCharactersB,
      description: "which characters to count for group B"
    },
    charactersAll: {
      type: "string",
      defaultValue: defaultCharactersAll,
      description: "list of all valid characters"
    },
    calculationMode: {
      type: "stringEnum",
      defaultValue: defaultCalculationMode,
      model: mobxStateTree.types.enumeration("Calculation mode", ["average", "skew"]),
      description: "type of calculation to use for statistics"
    }
  }, {
    explicitlyTyped: true
  });
});
function sanitizeWindowSize(value) {
  value = parseInt(value);

  if (isNaN(value)) {
    return defaultWindowSize;
  }

  if (value < 0) {
    value = Math.abs(value);
  }

  if (value < 1) {
    value = 1;
  }

  return value;
}
function sanitizeWindowOverlap(value) {
  value = parseInt(value);

  if (isNaN(value)) {
    return defaultWindowOverlap;
  }

  if (value < 0) {
    value = Math.abs(value);
  }

  if (value >= 100) {
    value = 99;
  }

  return value;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

function count_regexp(target_string, regexp_string) {
  var regexp = new RegExp(regexp_string, "g");
  var matches = target_string.matchAll(regexp);
  var count = 0;

  while (matches.next().done == false) {
    count += 1;
  }

  return count;
} //Taken from:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

var default_1 = /*#__PURE__*/function (_BaseFeatureDataAdapt) {
  _inherits(default_1, _BaseFeatureDataAdapt);

  var _super = /*#__PURE__*/_createSuper(default_1);

  function default_1(config, getSubAdapter) {
    var _this;

    _classCallCheck(this, default_1);

    _this = _super.call(this, config);
    _this.config = config;
    _this.getSubAdapter = getSubAdapter;
    return _this;
  }

  _createClass(default_1, [{
    key: "configure",
    value: function () {
      var _configure = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var _this$getSubAdapter;

        var sequenceAdapter, dataAdapter;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // instantiate the sequence adapter
                sequenceAdapter = configuration.readConfObject(this.config, "sequenceAdapter");
                _context.next = 3;
                return (_this$getSubAdapter = this.getSubAdapter) === null || _this$getSubAdapter === void 0 ? void 0 : _this$getSubAdapter.call(this, sequenceAdapter);

              case 3:
                dataAdapter = _context.sent;

                if (dataAdapter) {
                  _context.next = 6;
                  break;
                }

                throw new Error("Error getting subadapter");

              case 6:
                return _context.abrupt("return", dataAdapter.dataAdapter);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function configure() {
        return _configure.apply(this, arguments);
      }

      return configure;
    }()
  }, {
    key: "getRefNames",
    value: function () {
      var _getRefNames = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
        var sequenceAdapter;
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.configure();

              case 2:
                sequenceAdapter = _context2.sent;
                return _context2.abrupt("return", sequenceAdapter.getRefNames());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRefNames() {
        return _getRefNames.apply(this, arguments);
      }

      return getRefNames;
    }()
  }, {
    key: "getRegions",
    value: function () {
      var _getRegions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
        var sequenceAdapter;
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.configure();

              case 2:
                sequenceAdapter = _context3.sent;
                return _context3.abrupt("return", sequenceAdapter.getRegions());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRegions() {
        return _getRegions.apply(this, arguments);
      }

      return getRegions;
    }()
    /**
     * Fetch features for a certain region
     * @param param -
     * @returns Observable of Feature objects in the region
     */

  }, {
    key: "getFeatures",
    value: function getFeatures(query, opts) {
      var _this2 = this;

      var windowSize = sanitizeWindowSize(configuration.readConfObject(this.config, ["windowSize"]));
      var windowOverlap = sanitizeWindowOverlap(configuration.readConfObject(this.config, ["windowOverlap"]));
      var windowDelta = windowSize * (windowOverlap / 100.0);

      if (windowDelta == 0) {
        windowDelta = windowSize;
      }

      var calcMode = configuration.readConfObject(this.config, ["calculationMode"]);
      var regExpA = "[" + escapeRegExp(configuration.readConfObject(this.config, ["charactersA"])) + "]";
      var regExpB = "[" + escapeRegExp(configuration.readConfObject(this.config, ["charactersB"])) + "]";
      var regExpAll = "[" + escapeRegExp(configuration.readConfObject(this.config, ["charactersAll"])) + "]";
      return rxjs.ObservableCreate( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(observer) {
          var sequenceAdapter, queryStart, queryEnd, ret, _yield$ret$pipe$toPro, _yield$ret$pipe$toPro2, feat, sequence, f, i, seq_chunk, n_regExpA, n_regExpB, len, score, new_simple_feat;

          return runtime_1.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _this2.configure();

                case 2:
                  sequenceAdapter = _context4.sent;
                  queryStart = query.start, queryEnd = query.end; //Set the start/end one chunk before/after the current view

                  queryStart = Math.max(0, queryStart - windowDelta);
                  queryEnd += windowDelta; //Quantize queryStart and queryEnd so the windowing behaves intuitively

                  queryStart = Math.floor(queryStart / windowDelta) * windowDelta;
                  queryEnd = Math.floor(queryEnd / windowDelta) * windowDelta;

                  if (!(queryEnd < 0 || queryStart > queryEnd)) {
                    _context4.next = 11;
                    break;
                  }

                  observer.complete();
                  return _context4.abrupt("return");

                case 11:
                  ret = sequenceAdapter.getFeatures(_objectSpread2(_objectSpread2({}, query), {}, {
                    start: queryStart,
                    end: queryEnd
                  }), opts);
                  _context4.next = 14;
                  return ret.pipe(operators.toArray()).toPromise();

                case 14:
                  _yield$ret$pipe$toPro = _context4.sent;
                  _yield$ret$pipe$toPro2 = _slicedToArray(_yield$ret$pipe$toPro, 1);
                  feat = _yield$ret$pipe$toPro2[0];
                  sequence = feat.get("seq");
                  f = windowSize === 1;

                  for (i = 0; i < sequence.length; i += windowDelta) {
                    seq_chunk = f ? sequence[i] : sequence.slice(i, i + windowSize);
                    n_regExpA = count_regexp(seq_chunk, regExpA);
                    n_regExpB = count_regexp(seq_chunk, regExpB);
                    len = count_regexp(seq_chunk, regExpAll);
                    score = 0;

                    if (calcMode === "average") {
                      score = (n_regExpA + n_regExpB) / (len || 1);
                    } else if (calcMode === "skew") {
                      score = (n_regExpA - n_regExpB) / (n_regExpA + n_regExpB || 1);
                    }

                    new_simple_feat = new SimpleFeature({
                      uniqueId: "".concat(_this2.id, "_").concat(queryStart + i),
                      start: queryStart + i,
                      end: queryStart + i + windowDelta,
                      score: score
                    });
                    observer.next(new_simple_feat);
                  }

                  observer.complete();

                case 21:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * called to provide a hint that data tied to a certain region
     * will not be needed for the forseeable future and can be purged
     * from caches, etc
     */

  }, {
    key: "freeResources",
    value: function
      /* { region } */
    freeResources() {}
  }]);

  return default_1;
}(BaseAdapter.BaseFeatureDataAdapter);
default_1.capabilities = ["hasLocalStats"];

var NucContentAdapter = (function (pluginManager) {
  return {
    configSchema: pluginManager.load(configSchemaF),
    AdapterClass: default_1
  };
});

function configSchemaFactory(pluginManager) {
  var LGVPlugin = pluginManager.getPlugin("LinearGenomeViewPlugin");
  var baseLinearDisplayConfigSchema = LGVPlugin.exports.baseLinearDisplayConfigSchema;
  return configuration.ConfigurationSchema("NucContentDisplay", {
    autoscale: {
      type: "stringEnum",
      defaultValue: "local",
      model: mobxStateTree.types.enumeration("Autoscale type", ["global", "local", "globalsd", "localsd", "zscore"]),
      description: "global/local using their min/max values or w/ standard deviations (globalsd/localsd)"
    },
    minScore: {
      type: "number",
      defaultValue: Number.MIN_VALUE,
      description: "minimum value for the y-scale"
    },
    maxScore: {
      type: "number",
      description: "maximum value for the y-scale",
      defaultValue: Number.MAX_VALUE
    },
    numStdDev: {
      type: "number",
      description: "number of standard deviations to use for autoscale types globalsd or localsd",
      defaultValue: 3
    },
    scaleType: {
      type: "stringEnum",
      model: mobxStateTree.types.enumeration("Scale type", ["linear", "log"]),
      description: "The type of scale to use",
      defaultValue: "linear"
    },
    inverted: {
      type: "boolean",
      description: "draw upside down",
      defaultValue: false
    },
    defaultRendering: {
      type: "stringEnum",
      model: mobxStateTree.types.enumeration("Rendering", ["density", "xyplot", "line"]),
      defaultValue: "xyplot"
    }
  }, {
    baseConfiguration: baseLinearDisplayConfigSchema,
    explicitlyTyped: true
  });
}
function stateModelFactory(pluginManager, configSchema) {
  var WigglePlugin = pluginManager.getPlugin("WigglePlugin");
  var linearWiggleDisplayModelFactory = WigglePlugin.exports.linearWiggleDisplayModelFactory;
  return mobxStateTree.types.compose("NucContentDisplay", linearWiggleDisplayModelFactory(pluginManager, configSchema), mobxStateTree.types.model({
    type: mobxStateTree.types.literal("NucContentDisplay")
  })).views(function (self) {
    var superTrackMenuItems = self.trackMenuItems;
    return {
      trackMenuItems: function trackMenuItems() {
        var new_menu_items = [{
          label: "NucContent settings",
          onClick: function onClick() {
            util.getSession(self).queueDialog(function (doneCallback) {
              return [SetWindowDlg, {
                model: self,
                handleClose: doneCallback
              }];
            });
          }
        }];
        return [].concat(_toConsumableArray(superTrackMenuItems()), new_menu_items);
      }
    };
  });

  function SetWindowDlg(props) {
    var _pluginManager$jbrequ = pluginManager.jbrequire("@material-ui/core/styles"),
        makeStyles = _pluginManager$jbrequ.makeStyles;

    var classes = makeStyles(function (theme) {
      return {
        root: {},
        closeButton: {
          position: "absolute",
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500]
        }
      };
    });
    var model = props.model,
        handleClose = props.handleClose;

    var _pluginManager$jbrequ2 = pluginManager.jbrequire("@material-ui/core"),
        Button = _pluginManager$jbrequ2.Button;

    var _pluginManager$jbrequ3 = pluginManager.jbrequire("@material-ui/core"),
        Dialog = _pluginManager$jbrequ3.Dialog;

    var _pluginManager$jbrequ4 = pluginManager.jbrequire("@material-ui/core"),
        DialogContent = _pluginManager$jbrequ4.DialogContent;

    var _pluginManager$jbrequ5 = pluginManager.jbrequire("@material-ui/core"),
        DialogTitle = _pluginManager$jbrequ5.DialogTitle;

    var _pluginManager$jbrequ6 = pluginManager.jbrequire("@material-ui/core"),
        Divider = _pluginManager$jbrequ6.Divider;

    var _pluginManager$jbrequ7 = pluginManager.jbrequire("@material-ui/core"),
        TextField = _pluginManager$jbrequ7.TextField;

    var _pluginManager$jbrequ8 = pluginManager.jbrequire("@material-ui/core"),
        Typography = _pluginManager$jbrequ8.Typography;

    var _pluginManager$jbrequ9 = pluginManager.jbrequire("@material-ui/core"),
        IconButton = _pluginManager$jbrequ9.IconButton;

    var _pluginManager$jbrequ10 = pluginManager.jbrequire("@material-ui/core"),
        MenuItem = _pluginManager$jbrequ10.MenuItem; //adapterConfig doesn't have default values due to getSnapshot so we have to guard against that


    model.adapterConfig.windowSize = model.adapterConfig.windowSize || defaultWindowSize;

    var _useState = React.useState(model.adapterConfig.windowSize.toString()),
        _useState2 = _slicedToArray(_useState, 2),
        window_size = _useState2[0],
        set_window_size = _useState2[1];

    model.adapterConfig.windowOverlap = model.adapterConfig.windowOverlap || defaultWindowOverlap;

    var _useState3 = React.useState(model.adapterConfig.windowOverlap.toString()),
        _useState4 = _slicedToArray(_useState3, 2),
        window_overlap = _useState4[0],
        set_window_overlap = _useState4[1];

    model.adapterConfig.calculationMode = model.adapterConfig.calculationMode || defaultCalculationMode;

    var _useState5 = React.useState(model.adapterConfig.calculationMode),
        _useState6 = _slicedToArray(_useState5, 2),
        calculation_mode = _useState6[0],
        set_calculation_mode = _useState6[1];

    return React__default.createElement(Dialog, {
      open: true,
      onClose: handleClose
    }, React__default.createElement(DialogTitle, null, "NucContent Settings", React__default.createElement(IconButton, {
      className: classes.closeButton,
      onClick: handleClose
    }, React__default.createElement(CloseIcon, null))), React__default.createElement(DialogContent, {
      style: {
        overflowX: "hidden"
      }
    }, React__default.createElement("form", {
      onSubmit: function onSubmit(event) {
        var config_changed = false;
        var new_window_overlap = sanitizeWindowOverlap(window_overlap);

        if (model.adapterConfig.windowOverlap != new_window_overlap) {
          model.adapterConfig.windowOverlap = new_window_overlap;
          config_changed = true;
        }
        var new_window_size = sanitizeWindowSize(window_size);

        if (model.adapterConfig.windowSize != new_window_size) {
          model.adapterConfig.windowSize = new_window_size;
          config_changed = true;
        }

        if (model.adapterConfig.calculationMode != calculation_mode) {
          model.adapterConfig.calculationMode = calculation_mode;
          config_changed = true;
        }

        if (config_changed) {
          model.parentTrack.configuration.setSubschema("adapter", model.adapterConfig);
        }

        event.preventDefault(); //Normal close handler

        handleClose(); //Fully prevent form submit and prevent refreshing page

        return false;
      }
    }, React__default.createElement("div", {
      className: classes.root
    }, React__default.createElement(Typography, null, "Window size: "), React__default.createElement(TextField, {
      autoFocus: true,
      value: window_size,
      onChange: function onChange(event) {
        var target = event.target;

        if (target.value == "") {
          set_window_size(target.value);
        } else {
          set_window_size(sanitizeWindowSize(target.value).toString());
        }
      },
      placeholder: "Enter window size"
    }), React__default.createElement(Typography, null, "Window overlap (in percent): "), React__default.createElement(TextField, {
      value: window_overlap,
      onChange: function onChange(event) {
        var target = event.target;

        if (target.value == "") {
          set_window_overlap(target.value);
        } else {
          set_window_overlap(sanitizeWindowOverlap(target.value).toString());
        }
      },
      placeholder: "Enter window overlap"
    }), React__default.createElement(Typography, null, "Calculation mode: "), React__default.createElement(TextField, {
      select: true,
      style: {
        marginRight: 20
      },
      value: calculation_mode,
      onChange: function onChange(event) {
        var target = event.target;
        set_calculation_mode(target.value);
      }
    }, React__default.createElement(MenuItem, {
      key: "average",
      value: "average"
    }, "Average"), React__default.createElement(MenuItem, {
      key: "skew",
      value: "skew"
    }, "Skew")), React__default.createElement(Divider, {
      style: {
        marginTop: 5,
        marginBottom: 5
      },
      light: true
    }), React__default.createElement(Button, {
      variant: "contained",
      color: "primary",
      type: "submit"
    }, "Submit")))));
  }
}

var NucContentPlugin = /*#__PURE__*/function (_Plugin) {
  _inherits(NucContentPlugin, _Plugin);

  var _super = /*#__PURE__*/_createSuper(NucContentPlugin);

  function NucContentPlugin() {
    var _this;

    _classCallCheck(this, NucContentPlugin);

    _this = _super.apply(this, arguments);
    _this.name = "NucContentPlugin";
    return _this;
  }

  _createClass(NucContentPlugin, [{
    key: "install",
    value: function install(pluginManager) {
      pluginManager.addTrackType(function () {
        var configSchema = configuration.ConfigurationSchema("NucContentTrack", {}, {
          baseConfiguration: models.createBaseTrackConfig(pluginManager)
        });
        return new TrackType({
          name: "NucContentTrack",
          configSchema: configSchema,
          stateModel: models.createBaseTrackModel(pluginManager, "NucContentTrack", configSchema)
        });
      });
      pluginManager.addAdapterType(function () {
        return new AdapterType(_objectSpread2({
          name: "NucContentAdapter"
        }, pluginManager.load(NucContentAdapter)));
      });
      var DisplayType = pluginManager.lib["@jbrowse/core/pluggableElementTypes/DisplayType"];
      var WigglePlugin = pluginManager.getPlugin("WigglePlugin");
      var LinearWiggleDisplayReactComponent = WigglePlugin.exports.LinearWiggleDisplayReactComponent;
      pluginManager.addDisplayType(function () {
        var configSchema = configSchemaFactory(pluginManager);
        return new DisplayType({
          name: "NucContentDisplay",
          configSchema: configSchema,
          stateModel: stateModelFactory(pluginManager, configSchema),
          trackType: "NucContentTrack",
          viewType: "LinearGenomeView",
          ReactComponent: LinearWiggleDisplayReactComponent
        });
      });
    }
  }]);

  return NucContentPlugin;
}(Plugin);

exports.default = NucContentPlugin;
//# sourceMappingURL=jbrowsepluginnuccontent.cjs.development.js.map
