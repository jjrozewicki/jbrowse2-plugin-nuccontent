(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@jbrowse/core/pluggableElementTypes/AdapterType'), require('@jbrowse/core/pluggableElementTypes/TrackType'), require('@jbrowse/core/Plugin'), require('@jbrowse/core/pluggableElementTypes/models'), require('@jbrowse/core/configuration'), require('mobx-state-tree'), require('@jbrowse/core/data_adapters/BaseAdapter'), require('@jbrowse/core/util/rxjs'), require('react'), require('@jbrowse/core/util'), require('@material-ui/core/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@jbrowse/core/pluggableElementTypes/AdapterType', '@jbrowse/core/pluggableElementTypes/TrackType', '@jbrowse/core/Plugin', '@jbrowse/core/pluggableElementTypes/models', '@jbrowse/core/configuration', 'mobx-state-tree', '@jbrowse/core/data_adapters/BaseAdapter', '@jbrowse/core/util/rxjs', 'react', '@jbrowse/core/util', '@material-ui/core/utils'], factory) :
  (global = global || self, factory(global.JBrowsePluginNucContent = {}, global.JBrowseExports['@jbrowse/core/pluggableElementTypes/AdapterType'], global.JBrowseExports['@jbrowse/core/pluggableElementTypes/TrackType'], global.JBrowseExports['@jbrowse/core/Plugin'], global.JBrowseExports['@jbrowse/core/pluggableElementTypes/models'], global.JBrowseExports['@jbrowse/core/configuration'], global.JBrowseExports['mobx-state-tree'], global.JBrowseExports['@jbrowse/core/data_adapters/BaseAdapter'], global.JBrowseExports['@jbrowse/core/util/rxjs'], global.JBrowseExports.react, global.JBrowseExports['@jbrowse/core/util'], global.JBrowseExports['@material-ui/core/utils']));
}(this, (function (exports, AdapterType, TrackType, Plugin, models, configuration, mobxStateTree, BaseAdapter, rxjs, React, util, utils) { 'use strict';

  AdapterType = AdapterType && Object.prototype.hasOwnProperty.call(AdapterType, 'default') ? AdapterType['default'] : AdapterType;
  TrackType = TrackType && Object.prototype.hasOwnProperty.call(TrackType, 'default') ? TrackType['default'] : TrackType;
  Plugin = Plugin && Object.prototype.hasOwnProperty.call(Plugin, 'default') ? Plugin['default'] : Plugin;
  var React__default = 'default' in React ? React['default'] : React;
  utils = utils && Object.prototype.hasOwnProperty.call(utils, 'default') ? utils['default'] : utils;

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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
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

  var interopRequireDefault = createCommonjsModule(function (module) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = _interopRequireDefault;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  unwrapExports(interopRequireDefault);

  var classCallCheck = createCommonjsModule(function (module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  module.exports = _classCallCheck;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  unwrapExports(classCallCheck);

  var createClass = createCommonjsModule(function (module) {
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
    return Constructor;
  }

  module.exports = _createClass;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  unwrapExports(createClass);

  var defineProperty = createCommonjsModule(function (module) {
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

  module.exports = _defineProperty;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  unwrapExports(defineProperty);

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  unwrapExports(_typeof_1);

  var simpleFeature = createCommonjsModule(function (module, exports) {



  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isFeature = isFeature;
  exports.default = void 0;

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _createClass2 = interopRequireDefault(createClass);

  var _defineProperty2 = interopRequireDefault(defineProperty);

  var _typeof2 = interopRequireDefault(_typeof_1);

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  /**
   * Abstract feature object
   */
  function isFeature(thing) {
    return (0, _typeof2.default)(thing) === 'object' && thing !== null && typeof thing.get === 'function' && typeof thing.id === 'function';
  }

  function isSimpleFeatureSerialized(args) {
    return 'uniqueId' in args && (0, _typeof2.default)(args.data) !== 'object';
  }
  /**
   * Simple implementation of a feature object.
   */


  var SimpleFeature = /*#__PURE__*/function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    /**
     * @param args - SimpleFeature args
     *
     * Note: args.data.subfeatures can be an array of these same args,
     * which will be inflated to more instances of this class.
     */
    function SimpleFeature(args) {
      var _this = this;

      (0, _classCallCheck2.default)(this, SimpleFeature);
      (0, _defineProperty2.default)(this, "data", void 0);
      (0, _defineProperty2.default)(this, "subfeatures", void 0);
      (0, _defineProperty2.default)(this, "parentHandle", void 0);
      (0, _defineProperty2.default)(this, "uniqueId", void 0);

      if (isSimpleFeatureSerialized(args)) {
        this.data = args;
      } else {
        this.data = args.data || {}; // load handle from args.parent (not args.data.parent)
        // this reason is because if args is an object, it likely isn't properly loaded with
        // parent as a Feature reference (probably a raw parent ID or something instead)

        this.parentHandle = args.parent;
      } // the feature id comes from
      // args.id, args.data.uniqueId, or args.uniqueId due to this initialization


      var id = isSimpleFeatureSerialized(args) ? args.uniqueId : args.id;

      if (id === undefined || id === null) {
        throw new Error('SimpleFeature requires a unique `id` or `data.uniqueId` attribute');
      }

      this.uniqueId = String(id);

      if (!(this.data.aliases || this.data.end - this.data.start >= 0)) {
        throw new Error("invalid feature data, end less than start. end: ".concat(this.data.end, " start: ").concat(this.data.start));
      }

      if (this.data.subfeatures) {
        var _this$data$subfeature;

        this.subfeatures = (_this$data$subfeature = this.data.subfeatures) === null || _this$data$subfeature === void 0 ? void 0 : _this$data$subfeature.map( // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (f, i) {
          return typeof f.get !== 'function' ? new SimpleFeature({
            id: f.uniqueId || "".concat(id, "-").concat(i),
            data: _objectSpread({
              strand: _this.data.strand
            }, f),
            parent: _this
          }) : f;
        });
      }
    }
    /**
     * Get a piece of data about the feature.  All features must have
     * 'start' and 'end', but everything else is optional.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any


    (0, _createClass2.default)(SimpleFeature, [{
      key: "get",
      value: function get(name) {
        return name === 'subfeatures' ? this.subfeatures : this.data[name];
      }
      /**
       * Set an item of data.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

    }, {
      key: "set",
      value: function set(name, val) {
        this.data[name] = val;
      }
      /**
       * Get an array listing which data keys are present in this feature.
       */

    }, {
      key: "tags",
      value: function tags() {
        return Object.keys(this.data);
      }
      /**
       * Get the unique ID of this feature.
       */

    }, {
      key: "id",
      value: function id() {
        return this.uniqueId;
      }
      /**
       * Get this feature's parent feature, or undefined if none.
       */

    }, {
      key: "parent",
      value: function parent() {
        return this.parentHandle;
      }
      /**
       * Get an array of child features, or undefined if none.
       */

    }, {
      key: "children",
      value: function children() {
        return this.get('subfeatures');
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var d = _objectSpread(_objectSpread({}, this.data), {}, {
          uniqueId: this.id()
        });

        var p = this.parent();

        if (p) {
          d.parentId = p.id();
        }

        var c = this.children();

        if (c) {
          d.subfeatures = c.map(function (child) {
            return child.toJSON();
          });
        }

        return d;
      }
    }], [{
      key: "fromJSON",
      value: function fromJSON(json) {
        return new SimpleFeature(_objectSpread({}, json));
      }
    }]);
    return SimpleFeature;
  }();

  exports.default = SimpleFeature;
  });

  var SimpleFeature = unwrapExports(simpleFeature);

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isFunction(x) {
      return typeof x === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var _enable_super_gross_mode_that_will_cause_bad_things = false;
  var config = {
      Promise: undefined,
      set useDeprecatedSynchronousErrorHandling(value) {
          _enable_super_gross_mode_that_will_cause_bad_things = value;
      },
      get useDeprecatedSynchronousErrorHandling() {
          return _enable_super_gross_mode_that_will_cause_bad_things;
      },
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function hostReportError(err) {
      setTimeout(function () { throw err; }, 0);
  }

  /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
  var empty = {
      closed: true,
      next: function (value) { },
      error: function (err) {
          if (config.useDeprecatedSynchronousErrorHandling) {
              throw err;
          }
          else {
              hostReportError(err);
          }
      },
      complete: function () { }
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArray = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isObject(x) {
      return x !== null && typeof x === 'object';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
      function UnsubscriptionErrorImpl(errors) {
          Error.call(this);
          this.message = errors ?
              errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
          this.name = 'UnsubscriptionError';
          this.errors = errors;
          return this;
      }
      UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
      return UnsubscriptionErrorImpl;
  })();
  var UnsubscriptionError = UnsubscriptionErrorImpl;

  /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
  var Subscription = /*@__PURE__*/ (function () {
      function Subscription(unsubscribe) {
          this.closed = false;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (unsubscribe) {
              this._ctorUnsubscribe = true;
              this._unsubscribe = unsubscribe;
          }
      }
      Subscription.prototype.unsubscribe = function () {
          var errors;
          if (this.closed) {
              return;
          }
          var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
          this.closed = true;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (_parentOrParents instanceof Subscription) {
              _parentOrParents.remove(this);
          }
          else if (_parentOrParents !== null) {
              for (var index = 0; index < _parentOrParents.length; ++index) {
                  var parent_1 = _parentOrParents[index];
                  parent_1.remove(this);
              }
          }
          if (isFunction(_unsubscribe)) {
              if (_ctorUnsubscribe) {
                  this._unsubscribe = undefined;
              }
              try {
                  _unsubscribe.call(this);
              }
              catch (e) {
                  errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
              }
          }
          if (isArray(_subscriptions)) {
              var index = -1;
              var len = _subscriptions.length;
              while (++index < len) {
                  var sub = _subscriptions[index];
                  if (isObject(sub)) {
                      try {
                          sub.unsubscribe();
                      }
                      catch (e) {
                          errors = errors || [];
                          if (e instanceof UnsubscriptionError) {
                              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                          }
                          else {
                              errors.push(e);
                          }
                      }
                  }
              }
          }
          if (errors) {
              throw new UnsubscriptionError(errors);
          }
      };
      Subscription.prototype.add = function (teardown) {
          var subscription = teardown;
          if (!teardown) {
              return Subscription.EMPTY;
          }
          switch (typeof teardown) {
              case 'function':
                  subscription = new Subscription(teardown);
              case 'object':
                  if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                      return subscription;
                  }
                  else if (this.closed) {
                      subscription.unsubscribe();
                      return subscription;
                  }
                  else if (!(subscription instanceof Subscription)) {
                      var tmp = subscription;
                      subscription = new Subscription();
                      subscription._subscriptions = [tmp];
                  }
                  break;
              default: {
                  throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
              }
          }
          var _parentOrParents = subscription._parentOrParents;
          if (_parentOrParents === null) {
              subscription._parentOrParents = this;
          }
          else if (_parentOrParents instanceof Subscription) {
              if (_parentOrParents === this) {
                  return subscription;
              }
              subscription._parentOrParents = [_parentOrParents, this];
          }
          else if (_parentOrParents.indexOf(this) === -1) {
              _parentOrParents.push(this);
          }
          else {
              return subscription;
          }
          var subscriptions = this._subscriptions;
          if (subscriptions === null) {
              this._subscriptions = [subscription];
          }
          else {
              subscriptions.push(subscription);
          }
          return subscription;
      };
      Subscription.prototype.remove = function (subscription) {
          var subscriptions = this._subscriptions;
          if (subscriptions) {
              var subscriptionIndex = subscriptions.indexOf(subscription);
              if (subscriptionIndex !== -1) {
                  subscriptions.splice(subscriptionIndex, 1);
              }
          }
      };
      Subscription.EMPTY = (function (empty) {
          empty.closed = true;
          return empty;
      }(new Subscription()));
      return Subscription;
  }());
  function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var rxSubscriber = /*@__PURE__*/ (function () {
      return typeof Symbol === 'function'
          ? /*@__PURE__*/ Symbol('rxSubscriber')
          : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
  })();

  /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
  var Subscriber = /*@__PURE__*/ (function (_super) {
      __extends(Subscriber, _super);
      function Subscriber(destinationOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this.syncErrorValue = null;
          _this.syncErrorThrown = false;
          _this.syncErrorThrowable = false;
          _this.isStopped = false;
          switch (arguments.length) {
              case 0:
                  _this.destination = empty;
                  break;
              case 1:
                  if (!destinationOrNext) {
                      _this.destination = empty;
                      break;
                  }
                  if (typeof destinationOrNext === 'object') {
                      if (destinationOrNext instanceof Subscriber) {
                          _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                          _this.destination = destinationOrNext;
                          destinationOrNext.add(_this);
                      }
                      else {
                          _this.syncErrorThrowable = true;
                          _this.destination = new SafeSubscriber(_this, destinationOrNext);
                      }
                      break;
                  }
              default:
                  _this.syncErrorThrowable = true;
                  _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                  break;
          }
          return _this;
      }
      Subscriber.prototype[rxSubscriber] = function () { return this; };
      Subscriber.create = function (next, error, complete) {
          var subscriber = new Subscriber(next, error, complete);
          subscriber.syncErrorThrowable = false;
          return subscriber;
      };
      Subscriber.prototype.next = function (value) {
          if (!this.isStopped) {
              this._next(value);
          }
      };
      Subscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              this.isStopped = true;
              this._error(err);
          }
      };
      Subscriber.prototype.complete = function () {
          if (!this.isStopped) {
              this.isStopped = true;
              this._complete();
          }
      };
      Subscriber.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
      };
      Subscriber.prototype._next = function (value) {
          this.destination.next(value);
      };
      Subscriber.prototype._error = function (err) {
          this.destination.error(err);
          this.unsubscribe();
      };
      Subscriber.prototype._complete = function () {
          this.destination.complete();
          this.unsubscribe();
      };
      Subscriber.prototype._unsubscribeAndRecycle = function () {
          var _parentOrParents = this._parentOrParents;
          this._parentOrParents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parentOrParents = _parentOrParents;
          return this;
      };
      return Subscriber;
  }(Subscription));
  var SafeSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this._parentSubscriber = _parentSubscriber;
          var next;
          var context = _this;
          if (isFunction(observerOrNext)) {
              next = observerOrNext;
          }
          else if (observerOrNext) {
              next = observerOrNext.next;
              error = observerOrNext.error;
              complete = observerOrNext.complete;
              if (observerOrNext !== empty) {
                  context = Object.create(observerOrNext);
                  if (isFunction(context.unsubscribe)) {
                      _this.add(context.unsubscribe.bind(context));
                  }
                  context.unsubscribe = _this.unsubscribe.bind(_this);
              }
          }
          _this._context = context;
          _this._next = next;
          _this._error = error;
          _this._complete = complete;
          return _this;
      }
      SafeSubscriber.prototype.next = function (value) {
          if (!this.isStopped && this._next) {
              var _parentSubscriber = this._parentSubscriber;
              if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                  this.__tryOrUnsub(this._next, value);
              }
              else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              var _parentSubscriber = this._parentSubscriber;
              var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
              if (this._error) {
                  if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                      this.__tryOrUnsub(this._error, err);
                      this.unsubscribe();
                  }
                  else {
                      this.__tryOrSetError(_parentSubscriber, this._error, err);
                      this.unsubscribe();
                  }
              }
              else if (!_parentSubscriber.syncErrorThrowable) {
                  this.unsubscribe();
                  if (useDeprecatedSynchronousErrorHandling) {
                      throw err;
                  }
                  hostReportError(err);
              }
              else {
                  if (useDeprecatedSynchronousErrorHandling) {
                      _parentSubscriber.syncErrorValue = err;
                      _parentSubscriber.syncErrorThrown = true;
                  }
                  else {
                      hostReportError(err);
                  }
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.complete = function () {
          var _this = this;
          if (!this.isStopped) {
              var _parentSubscriber = this._parentSubscriber;
              if (this._complete) {
                  var wrappedComplete = function () { return _this._complete.call(_this._context); };
                  if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                      this.__tryOrUnsub(wrappedComplete);
                      this.unsubscribe();
                  }
                  else {
                      this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                      this.unsubscribe();
                  }
              }
              else {
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
          try {
              fn.call(this._context, value);
          }
          catch (err) {
              this.unsubscribe();
              if (config.useDeprecatedSynchronousErrorHandling) {
                  throw err;
              }
              else {
                  hostReportError(err);
              }
          }
      };
      SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
          if (!config.useDeprecatedSynchronousErrorHandling) {
              throw new Error('bad call');
          }
          try {
              fn.call(this._context, value);
          }
          catch (err) {
              if (config.useDeprecatedSynchronousErrorHandling) {
                  parent.syncErrorValue = err;
                  parent.syncErrorThrown = true;
                  return true;
              }
              else {
                  hostReportError(err);
                  return true;
              }
          }
          return false;
      };
      SafeSubscriber.prototype._unsubscribe = function () {
          var _parentSubscriber = this._parentSubscriber;
          this._context = null;
          this._parentSubscriber = null;
          _parentSubscriber.unsubscribe();
      };
      return SafeSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
  function canReportError(observer) {
      while (observer) {
          var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
          if (closed_1 || isStopped) {
              return false;
          }
          else if (destination && destination instanceof Subscriber) {
              observer = destination;
          }
          else {
              observer = null;
          }
      }
      return true;
  }

  /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
  function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
          if (nextOrObserver instanceof Subscriber) {
              return nextOrObserver;
          }
          if (nextOrObserver[rxSubscriber]) {
              return nextOrObserver[rxSubscriber]();
          }
      }
      if (!nextOrObserver && !error && !complete) {
          return new Subscriber(empty);
      }
      return new Subscriber(nextOrObserver, error, complete);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function identity(x) {
      return x;
  }

  /** PURE_IMPORTS_START _identity PURE_IMPORTS_END */
  function pipe() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i] = arguments[_i];
      }
      return pipeFromArray(fns);
  }
  function pipeFromArray(fns) {
      if (fns.length === 0) {
          return identity;
      }
      if (fns.length === 1) {
          return fns[0];
      }
      return function piped(input) {
          return fns.reduce(function (prev, fn) { return fn(prev); }, input);
      };
  }

  /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
  var Observable = /*@__PURE__*/ (function () {
      function Observable(subscribe) {
          this._isScalar = false;
          if (subscribe) {
              this._subscribe = subscribe;
          }
      }
      Observable.prototype.lift = function (operator) {
          var observable = new Observable();
          observable.source = this;
          observable.operator = operator;
          return observable;
      };
      Observable.prototype.subscribe = function (observerOrNext, error, complete) {
          var operator = this.operator;
          var sink = toSubscriber(observerOrNext, error, complete);
          if (operator) {
              sink.add(operator.call(sink, this.source));
          }
          else {
              sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                  this._subscribe(sink) :
                  this._trySubscribe(sink));
          }
          if (config.useDeprecatedSynchronousErrorHandling) {
              if (sink.syncErrorThrowable) {
                  sink.syncErrorThrowable = false;
                  if (sink.syncErrorThrown) {
                      throw sink.syncErrorValue;
                  }
              }
          }
          return sink;
      };
      Observable.prototype._trySubscribe = function (sink) {
          try {
              return this._subscribe(sink);
          }
          catch (err) {
              if (config.useDeprecatedSynchronousErrorHandling) {
                  sink.syncErrorThrown = true;
                  sink.syncErrorValue = err;
              }
              if (canReportError(sink)) {
                  sink.error(err);
              }
              else {
                  console.warn(err);
              }
          }
      };
      Observable.prototype.forEach = function (next, promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var subscription;
              subscription = _this.subscribe(function (value) {
                  try {
                      next(value);
                  }
                  catch (err) {
                      reject(err);
                      if (subscription) {
                          subscription.unsubscribe();
                      }
                  }
              }, reject, resolve);
          });
      };
      Observable.prototype._subscribe = function (subscriber) {
          var source = this.source;
          return source && source.subscribe(subscriber);
      };
      Observable.prototype[observable] = function () {
          return this;
      };
      Observable.prototype.pipe = function () {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
          }
          if (operations.length === 0) {
              return this;
          }
          return pipeFromArray(operations)(this);
      };
      Observable.prototype.toPromise = function (promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
          });
      };
      Observable.create = function (subscribe) {
          return new Observable(subscribe);
      };
      return Observable;
  }());
  function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
          promiseCtor =  Promise;
      }
      if (!promiseCtor) {
          throw new Error('no Promise impl found');
      }
      return promiseCtor;
  }

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function defaultIfEmpty(defaultValue) {
      if (defaultValue === void 0) {
          defaultValue = null;
      }
      return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
  }
  var DefaultIfEmptyOperator = /*@__PURE__*/ (function () {
      function DefaultIfEmptyOperator(defaultValue) {
          this.defaultValue = defaultValue;
      }
      DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
      };
      return DefaultIfEmptyOperator;
  }());
  var DefaultIfEmptySubscriber = /*@__PURE__*/ (function (_super) {
      __extends(DefaultIfEmptySubscriber, _super);
      function DefaultIfEmptySubscriber(destination, defaultValue) {
          var _this = _super.call(this, destination) || this;
          _this.defaultValue = defaultValue;
          _this.isEmpty = true;
          return _this;
      }
      DefaultIfEmptySubscriber.prototype._next = function (value) {
          this.isEmpty = false;
          this.destination.next(value);
      };
      DefaultIfEmptySubscriber.prototype._complete = function () {
          if (this.isEmpty) {
              this.destination.next(this.defaultValue);
          }
          this.destination.complete();
      };
      return DefaultIfEmptySubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
  var EMPTY = /*@__PURE__*/ new Observable(function (subscriber) { return subscriber.complete(); });
  function empty$1(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : EMPTY;
  }
  function emptyScheduled(scheduler) {
      return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var ArgumentOutOfRangeErrorImpl = /*@__PURE__*/ (function () {
      function ArgumentOutOfRangeErrorImpl() {
          Error.call(this);
          this.message = 'argument out of range';
          this.name = 'ArgumentOutOfRangeError';
          return this;
      }
      ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
      return ArgumentOutOfRangeErrorImpl;
  })();
  var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

  /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */
  function takeLast(count) {
      return function takeLastOperatorFunction(source) {
          if (count === 0) {
              return empty$1();
          }
          else {
              return source.lift(new TakeLastOperator(count));
          }
      };
  }
  var TakeLastOperator = /*@__PURE__*/ (function () {
      function TakeLastOperator(total) {
          this.total = total;
          if (this.total < 0) {
              throw new ArgumentOutOfRangeError;
          }
      }
      TakeLastOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
      };
      return TakeLastOperator;
  }());
  var TakeLastSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(TakeLastSubscriber, _super);
      function TakeLastSubscriber(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.ring = new Array();
          _this.count = 0;
          return _this;
      }
      TakeLastSubscriber.prototype._next = function (value) {
          var ring = this.ring;
          var total = this.total;
          var count = this.count++;
          if (ring.length < total) {
              ring.push(value);
          }
          else {
              var index = count % total;
              ring[index] = value;
          }
      };
      TakeLastSubscriber.prototype._complete = function () {
          var destination = this.destination;
          var count = this.count;
          if (count > 0) {
              var total = this.count >= this.total ? this.total : this.count;
              var ring = this.ring;
              for (var i = 0; i < total; i++) {
                  var idx = (count++) % total;
                  destination.next(ring[idx]);
              }
          }
          destination.complete();
      };
      return TakeLastSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function scan(accumulator, seed) {
      var hasSeed = false;
      if (arguments.length >= 2) {
          hasSeed = true;
      }
      return function scanOperatorFunction(source) {
          return source.lift(new ScanOperator(accumulator, seed, hasSeed));
      };
  }
  var ScanOperator = /*@__PURE__*/ (function () {
      function ScanOperator(accumulator, seed, hasSeed) {
          if (hasSeed === void 0) {
              hasSeed = false;
          }
          this.accumulator = accumulator;
          this.seed = seed;
          this.hasSeed = hasSeed;
      }
      ScanOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
      };
      return ScanOperator;
  }());
  var ScanSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(ScanSubscriber, _super);
      function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
          var _this = _super.call(this, destination) || this;
          _this.accumulator = accumulator;
          _this._seed = _seed;
          _this.hasSeed = hasSeed;
          _this.index = 0;
          return _this;
      }
      Object.defineProperty(ScanSubscriber.prototype, "seed", {
          get: function () {
              return this._seed;
          },
          set: function (value) {
              this.hasSeed = true;
              this._seed = value;
          },
          enumerable: true,
          configurable: true
      });
      ScanSubscriber.prototype._next = function (value) {
          if (!this.hasSeed) {
              this.seed = value;
              this.destination.next(value);
          }
          else {
              return this._tryNext(value);
          }
      };
      ScanSubscriber.prototype._tryNext = function (value) {
          var index = this.index++;
          var result;
          try {
              result = this.accumulator(this.seed, value, index);
          }
          catch (err) {
              this.destination.error(err);
          }
          this.seed = result;
          this.destination.next(result);
      };
      return ScanSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */
  function reduce(accumulator, seed) {
      if (arguments.length >= 2) {
          return function reduceOperatorFunctionWithSeed(source) {
              return pipe(scan(accumulator, seed), takeLast(1), defaultIfEmpty(seed))(source);
          };
      }
      return function reduceOperatorFunction(source) {
          return pipe(scan(function (acc, value, index) { return accumulator(acc, value, index + 1); }), takeLast(1))(source);
      };
  }

  /** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */
  function toArrayReducer(arr, item, index) {
      if (index === 0) {
          return [item];
      }
      arr.push(item);
      return arr;
  }
  function toArray() {
      return reduce(toArrayReducer, []);
  }

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
    _inheritsLoose(default_1, _BaseFeatureDataAdapt);

    function default_1(config, getSubAdapter) {
      var _this;

      _this = _BaseFeatureDataAdapt.call(this, config) || this;
      _this.config = config;
      _this.getSubAdapter = getSubAdapter;
      return _this;
    }

    var _proto = default_1.prototype;

    _proto.configure = /*#__PURE__*/function () {
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
                return (_this$getSubAdapter = this.getSubAdapter) == null ? void 0 : _this$getSubAdapter.call(this, sequenceAdapter);

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
    }();

    _proto.getRefNames = /*#__PURE__*/function () {
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
    }();

    _proto.getRegions = /*#__PURE__*/function () {
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
    ;

    _proto.getFeatures = function getFeatures(query, opts) {
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
          var sequenceAdapter, queryStart, queryEnd, ret, _yield$ret$pipe$toPro, feat, sequence, f, i, seq_chunk, n_regExpA, n_regExpB, len, score, new_simple_feat;

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
                  ret = sequenceAdapter.getFeatures(_extends({}, query, {
                    start: queryStart,
                    end: queryEnd
                  }), opts);
                  _context4.next = 14;
                  return ret.pipe(toArray()).toPromise();

                case 14:
                  _yield$ret$pipe$toPro = _context4.sent;
                  feat = _yield$ret$pipe$toPro[0];
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
                      uniqueId: _this2.id + "_" + (queryStart + i),
                      start: queryStart + i,
                      end: queryStart + i + windowDelta,
                      score: score
                    });
                    observer.next(new_simple_feat);
                  }

                  observer.complete();

                case 20:
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
    ;

    _proto.freeResources = function freeResources() {};

    return default_1;
  }(BaseAdapter.BaseFeatureDataAdapter);
  default_1.capabilities = ["hasLocalStats"];

  var NucContentAdapter = (function (pluginManager) {
    return {
      configSchema: pluginManager.load(configSchemaF),
      AdapterClass: default_1
    };
  });

  var interopRequireWildcard = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];

  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj["default"] = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  module.exports = _interopRequireWildcard;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  unwrapExports(interopRequireWildcard);

  var createSvgIcon = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return utils.createSvgIcon;
    }
  });
  });

  unwrapExports(createSvgIcon);

  var Close = createCommonjsModule(function (module, exports) {





  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var React = interopRequireWildcard(React__default);

  var _createSvgIcon = interopRequireDefault(createSvgIcon);

  var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  }), 'Close');

  exports.default = _default;
  });

  var CloseIcon = unwrapExports(Close);

  //Extends from LinearGenomeView so we can add menu items
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
              //@ts-ignore
              util.getSession(self).setDialogComponent(SetWindowDlg, {
                model: self
              });
            }
          }];
          return [].concat(superTrackMenuItems, new_menu_items);
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
          window_size = _useState[0],
          set_window_size = _useState[1];

      model.adapterConfig.windowOverlap = model.adapterConfig.windowOverlap || defaultWindowOverlap;

      var _useState2 = React.useState(model.adapterConfig.windowOverlap.toString()),
          window_overlap = _useState2[0],
          set_window_overlap = _useState2[1];

      model.adapterConfig.calculationMode = model.adapterConfig.calculationMode || defaultCalculationMode;

      var _useState3 = React.useState(model.adapterConfig.calculationMode),
          calculation_mode = _useState3[0],
          set_calculation_mode = _useState3[1];

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
    _inheritsLoose(NucContentPlugin, _Plugin);

    function NucContentPlugin() {
      var _this;

      _this = _Plugin.apply(this, arguments) || this;
      _this.name = "NucContentPlugin";
      return _this;
    }

    var _proto = NucContentPlugin.prototype;

    _proto.install = function install(pluginManager) {
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
        return new AdapterType(_extends({
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
          trackType: "FeatureTrack",
          viewType: "LinearGenomeView",
          ReactComponent: LinearWiggleDisplayReactComponent
        });
      });
    };

    return NucContentPlugin;
  }(Plugin);

  exports.default = NucContentPlugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jbrowsepluginnuccontent.umd.development.js.map
