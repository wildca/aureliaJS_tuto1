var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-logging', 'aurelia-pal', 'aurelia-task-queue', 'aurelia-metadata'], function (exports, _aureliaLogging, _aureliaPal, _aureliaTaskQueue, _aureliaMetadata) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSetObserver = exports.BindingEngine = exports.NameExpression = exports.Listener = exports.ListenerExpression = exports.BindingBehaviorResource = exports.ValueConverterResource = exports.Call = exports.CallExpression = exports.Binding = exports.BindingExpression = exports.ObjectObservationAdapter = exports.ObserverLocator = exports.SVGAnalyzer = exports.presentationAttributes = exports.presentationElements = exports.elements = exports.ComputedExpression = exports.ClassObserver = exports.SelectValueObserver = exports.CheckedObserver = exports.ValueAttributeObserver = exports.StyleObserver = exports.DataAttributeObserver = exports.dataAttributeAccessor = exports.XLinkAttributeObserver = exports.SetterObserver = exports.PrimitiveObserver = exports.propertyAccessor = exports.DirtyCheckProperty = exports.DirtyChecker = exports.EventSubscriber = exports.EventManager = exports.delegationStrategy = exports.getMapObserver = exports.ParserImplementation = exports.Parser = exports.bindingMode = exports.ExpressionCloner = exports.Unparser = exports.LiteralObject = exports.LiteralArray = exports.LiteralTemplate = exports.LiteralString = exports.LiteralPrimitive = exports.Unary = exports.Binary = exports.CallFunction = exports.CallMember = exports.CallScope = exports.AccessKeyed = exports.AccessMember = exports.AccessScope = exports.AccessThis = exports.Conditional = exports.Assign = exports.ValueConverter = exports.BindingBehavior = exports.Expression = exports.getArrayObserver = exports.CollectionLengthObserver = exports.ModifyCollectionObserver = exports.ExpressionObserver = exports.sourceContext = exports.targetContext = undefined;
    exports.camelCase = camelCase;
    exports.createOverrideContext = createOverrideContext;
    exports.getContextFor = getContextFor;
    exports.createScopeForTest = createScopeForTest;
    exports.connectable = connectable;
    exports.enqueueBindingConnect = enqueueBindingConnect;
    exports.setConnectQueueThreshold = setConnectQueueThreshold;
    exports.enableConnectQueue = enableConnectQueue;
    exports.disableConnectQueue = disableConnectQueue;
    exports.getConnectQueueSize = getConnectQueueSize;
    exports.subscriberCollection = subscriberCollection;
    exports.calcSplices = calcSplices;
    exports.mergeSplice = mergeSplice;
    exports.projectArraySplices = projectArraySplices;
    exports.getChangeRecords = getChangeRecords;
    exports.cloneExpression = cloneExpression;
    exports.hasDeclaredDependencies = hasDeclaredDependencies;
    exports.declarePropertyDependencies = declarePropertyDependencies;
    exports.computedFrom = computedFrom;
    exports.createComputedObserver = createComputedObserver;
    exports.valueConverter = valueConverter;
    exports.bindingBehavior = bindingBehavior;
    exports.observable = observable;
    exports.connectBindingToSignal = connectBindingToSignal;
    exports.signalBindings = signalBindings;

    var LogManager = _interopRequireWildcard(_aureliaLogging);

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _dec2, _class, _dec3, _class2, _dec4, _class3, _dec5, _class5, _dec6, _class7, _dec7, _class8, _dec8, _class9, _dec9, _class10, _class12, _temp, _dec10, _class13, _class14, _temp2;

    var targetContext = exports.targetContext = 'Binding:target';
    var sourceContext = exports.sourceContext = 'Binding:source';
    var map = Object.create(null);

    function camelCase(name) {
      if (name in map) {
        return map[name];
      }

      var result = name.charAt(0).toLowerCase() + name.slice(1).replace(/[_.-](\w|$)/g, function (_, x) {
        return x.toUpperCase();
      });
      map[name] = result;
      return result;
    }

    function createOverrideContext(bindingContext, parentOverrideContext) {
      return {
        bindingContext: bindingContext,
        parentOverrideContext: parentOverrideContext || null
      };
    }

    function getContextFor(name, scope, ancestor) {
      var oc = scope.overrideContext;

      if (ancestor) {
        while (ancestor && oc) {
          ancestor--;
          oc = oc.parentOverrideContext;
        }

        if (ancestor || !oc) {
          return undefined;
        }

        return name in oc ? oc : oc.bindingContext;
      }

      while (oc && !(name in oc) && !(oc.bindingContext && name in oc.bindingContext)) {
        oc = oc.parentOverrideContext;
      }

      if (oc) {
        return name in oc ? oc : oc.bindingContext;
      }

      return scope.bindingContext || scope.overrideContext;
    }

    function createScopeForTest(bindingContext, parentBindingContext) {
      if (parentBindingContext) {
        return {
          bindingContext: bindingContext,
          overrideContext: createOverrideContext(bindingContext, createOverrideContext(parentBindingContext))
        };
      }

      return {
        bindingContext: bindingContext,
        overrideContext: createOverrideContext(bindingContext)
      };
    }

    var slotNames = [];
    var versionSlotNames = [];
    var lastSlot = -1;

    function ensureEnoughSlotNames(currentSlot) {
      if (currentSlot === lastSlot) {
        lastSlot += 5;
        var ii = slotNames.length = versionSlotNames.length = lastSlot + 1;

        for (var i = currentSlot + 1; i < ii; ++i) {
          slotNames[i] = '_observer' + i;
          versionSlotNames[i] = '_observerVersion' + i;
        }
      }
    }

    ensureEnoughSlotNames(-1);

    function addObserver(observer) {
      var observerSlots = (this || _global)._observerSlots === undefined ? 0 : (this || _global)._observerSlots;
      var i = observerSlots;

      while (i-- && (this || _global)[slotNames[i]] !== observer) {}

      if (i === -1) {
        i = 0;

        while ((this || _global)[slotNames[i]]) {
          i++;
        }

        (this || _global)[slotNames[i]] = observer;
        observer.subscribe(sourceContext, this || _global);

        if (i === observerSlots) {
          (this || _global)._observerSlots = i + 1;
        }
      }

      if ((this || _global)._version === undefined) {
        (this || _global)._version = 0;
      }

      (this || _global)[versionSlotNames[i]] = (this || _global)._version;
      ensureEnoughSlotNames(i);
    }

    function observeProperty(obj, propertyName) {
      var observer = (this || _global).observerLocator.getObserver(obj, propertyName);

      addObserver.call(this || _global, observer);
    }

    function observeArray(array) {
      var observer = (this || _global).observerLocator.getArrayObserver(array);

      addObserver.call(this || _global, observer);
    }

    function unobserve(all) {
      var i = (this || _global)._observerSlots;

      while (i--) {
        if (all || (this || _global)[versionSlotNames[i]] !== (this || _global)._version) {
          var observer = (this || _global)[slotNames[i]];
          (this || _global)[slotNames[i]] = null;

          if (observer) {
            observer.unsubscribe(sourceContext, this || _global);
          }
        }
      }
    }

    function connectable() {
      return function (target) {
        target.prototype.observeProperty = observeProperty;
        target.prototype.observeArray = observeArray;
        target.prototype.unobserve = unobserve;
        target.prototype.addObserver = addObserver;
      };
    }

    var queue = [];
    var queued = {};
    var nextId = 0;
    var minimumImmediate = 100;
    var frameBudget = 15;
    var isFlushRequested = false;
    var immediate = 0;

    function flush(animationFrameStart) {
      var length = queue.length;
      var i = 0;

      while (i < length) {
        var binding = queue[i];
        queued[binding.__connectQueueId] = false;
        binding.connect(true);
        i++;

        if (i % 100 === 0 && _aureliaPal.PLATFORM.performance.now() - animationFrameStart > frameBudget) {
          break;
        }
      }

      queue.splice(0, i);

      if (queue.length) {
        _aureliaPal.PLATFORM.requestAnimationFrame(flush);
      } else {
        isFlushRequested = false;
        immediate = 0;
      }
    }

    function enqueueBindingConnect(binding) {
      if (immediate < minimumImmediate) {
        immediate++;
        binding.connect(false);
      } else {
        var id = binding.__connectQueueId;

        if (id === undefined) {
          id = nextId;
          nextId++;
          binding.__connectQueueId = id;
        }

        if (!queued[id]) {
          queue.push(binding);
          queued[id] = true;
        }
      }

      if (!isFlushRequested) {
        isFlushRequested = true;

        _aureliaPal.PLATFORM.requestAnimationFrame(flush);
      }
    }

    function setConnectQueueThreshold(value) {
      minimumImmediate = value;
    }

    function enableConnectQueue() {
      setConnectQueueThreshold(100);
    }

    function disableConnectQueue() {
      setConnectQueueThreshold(Number.MAX_SAFE_INTEGER);
    }

    function getConnectQueueSize() {
      return queue.length;
    }

    function addSubscriber(context, callable) {
      if (this.hasSubscriber(context, callable)) {
        return false;
      }

      if (!(this || _global)._context0) {
        (this || _global)._context0 = context;
        (this || _global)._callable0 = callable;
        return true;
      }

      if (!(this || _global)._context1) {
        (this || _global)._context1 = context;
        (this || _global)._callable1 = callable;
        return true;
      }

      if (!(this || _global)._context2) {
        (this || _global)._context2 = context;
        (this || _global)._callable2 = callable;
        return true;
      }

      if (!(this || _global)._contextsRest) {
        (this || _global)._contextsRest = [context];
        (this || _global)._callablesRest = [callable];
        return true;
      }

      (this || _global)._contextsRest.push(context);

      (this || _global)._callablesRest.push(callable);

      return true;
    }

    function removeSubscriber(context, callable) {
      if ((this || _global)._context0 === context && (this || _global)._callable0 === callable) {
        (this || _global)._context0 = null;
        (this || _global)._callable0 = null;
        return true;
      }

      if ((this || _global)._context1 === context && (this || _global)._callable1 === callable) {
        (this || _global)._context1 = null;
        (this || _global)._callable1 = null;
        return true;
      }

      if ((this || _global)._context2 === context && (this || _global)._callable2 === callable) {
        (this || _global)._context2 = null;
        (this || _global)._callable2 = null;
        return true;
      }

      var callables = (this || _global)._callablesRest;

      if (callables === undefined || callables.length === 0) {
        return false;
      }

      var contexts = (this || _global)._contextsRest;
      var i = 0;

      while (!(callables[i] === callable && contexts[i] === context) && callables.length > i) {
        i++;
      }

      if (i >= callables.length) {
        return false;
      }

      contexts.splice(i, 1);
      callables.splice(i, 1);
      return true;
    }

    var arrayPool1 = [];
    var arrayPool2 = [];
    var poolUtilization = [];

    function callSubscribers(newValue, oldValue) {
      var context0 = (this || _global)._context0;
      var callable0 = (this || _global)._callable0;
      var context1 = (this || _global)._context1;
      var callable1 = (this || _global)._callable1;
      var context2 = (this || _global)._context2;
      var callable2 = (this || _global)._callable2;
      var length = (this || _global)._contextsRest ? (this || _global)._contextsRest.length : 0;
      var contextsRest = void 0;
      var callablesRest = void 0;
      var poolIndex = void 0;
      var i = void 0;

      if (length) {
        poolIndex = poolUtilization.length;

        while (poolIndex-- && poolUtilization[poolIndex]) {}

        if (poolIndex < 0) {
          poolIndex = poolUtilization.length;
          contextsRest = [];
          callablesRest = [];
          poolUtilization.push(true);
          arrayPool1.push(contextsRest);
          arrayPool2.push(callablesRest);
        } else {
          poolUtilization[poolIndex] = true;
          contextsRest = arrayPool1[poolIndex];
          callablesRest = arrayPool2[poolIndex];
        }

        i = length;

        while (i--) {
          contextsRest[i] = (this || _global)._contextsRest[i];
          callablesRest[i] = (this || _global)._callablesRest[i];
        }
      }

      if (context0) {
        if (callable0) {
          callable0.call(context0, newValue, oldValue);
        } else {
          context0(newValue, oldValue);
        }
      }

      if (context1) {
        if (callable1) {
          callable1.call(context1, newValue, oldValue);
        } else {
          context1(newValue, oldValue);
        }
      }

      if (context2) {
        if (callable2) {
          callable2.call(context2, newValue, oldValue);
        } else {
          context2(newValue, oldValue);
        }
      }

      if (length) {
        for (i = 0; i < length; i++) {
          var callable = callablesRest[i];
          var context = contextsRest[i];

          if (callable) {
            callable.call(context, newValue, oldValue);
          } else {
            context(newValue, oldValue);
          }

          contextsRest[i] = null;
          callablesRest[i] = null;
        }

        poolUtilization[poolIndex] = false;
      }
    }

    function hasSubscribers() {
      return !!((this || _global)._context0 || (this || _global)._context1 || (this || _global)._context2 || (this || _global)._contextsRest && (this || _global)._contextsRest.length);
    }

    function hasSubscriber(context, callable) {
      var has = (this || _global)._context0 === context && (this || _global)._callable0 === callable || (this || _global)._context1 === context && (this || _global)._callable1 === callable || (this || _global)._context2 === context && (this || _global)._callable2 === callable;

      if (has) {
        return true;
      }

      var index = void 0;
      var contexts = (this || _global)._contextsRest;

      if (!contexts || (index = contexts.length) === 0) {
        return false;
      }

      var callables = (this || _global)._callablesRest;

      while (index--) {
        if (contexts[index] === context && callables[index] === callable) {
          return true;
        }
      }

      return false;
    }

    function subscriberCollection() {
      return function (target) {
        target.prototype.addSubscriber = addSubscriber;
        target.prototype.removeSubscriber = removeSubscriber;
        target.prototype.callSubscribers = callSubscribers;
        target.prototype.hasSubscribers = hasSubscribers;
        target.prototype.hasSubscriber = hasSubscriber;
      };
    }

    var ExpressionObserver = exports.ExpressionObserver = (_dec = connectable(), _dec2 = subscriberCollection(), _dec(_class = _dec2(_class = function () {
      function ExpressionObserver(scope, expression, observerLocator, lookupFunctions) {
        (this || _global).scope = scope;
        (this || _global).expression = expression;
        (this || _global).observerLocator = observerLocator;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      ExpressionObserver.prototype.getValue = function getValue() {
        return (this || _global).expression.evaluate((this || _global).scope, (this || _global).lookupFunctions);
      };

      ExpressionObserver.prototype.setValue = function setValue(newValue) {
        (this || _global).expression.assign((this || _global).scope, newValue);
      };

      ExpressionObserver.prototype.subscribe = function subscribe(context, callable) {
        var _this = this || _global;

        if (!this.hasSubscribers()) {
          (this || _global).oldValue = (this || _global).expression.evaluate((this || _global).scope, (this || _global).lookupFunctions);

          (this || _global).expression.connect(this || _global, (this || _global).scope);
        }

        this.addSubscriber(context, callable);

        if (arguments.length === 1 && context instanceof Function) {
          return {
            dispose: function dispose() {
              _this.unsubscribe(context, callable);
            }
          };
        }
      };

      ExpressionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.unobserve(true);
          (this || _global).oldValue = undefined;
        }
      };

      ExpressionObserver.prototype.call = function call() {
        var newValue = (this || _global).expression.evaluate((this || _global).scope, (this || _global).lookupFunctions);

        var oldValue = (this || _global).oldValue;

        if (newValue !== oldValue) {
          (this || _global).oldValue = newValue;
          this.callSubscribers(newValue, oldValue);
        }

        (this || _global)._version++;

        (this || _global).expression.connect(this || _global, (this || _global).scope);

        this.unobserve(false);
      };

      return ExpressionObserver;
    }()) || _class) || _class);

    function isIndex(s) {
      return +s === s >>> 0;
    }

    function toNumber(s) {
      return +s;
    }

    function newSplice(index, removed, addedCount) {
      return {
        index: index,
        removed: removed,
        addedCount: addedCount
      };
    }

    var EDIT_LEAVE = 0;
    var EDIT_UPDATE = 1;
    var EDIT_ADD = 2;
    var EDIT_DELETE = 3;

    function ArraySplice() {}

    ArraySplice.prototype = {
      calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
        var rowCount = oldEnd - oldStart + 1;
        var columnCount = currentEnd - currentStart + 1;
        var distances = new Array(rowCount);
        var north = void 0;
        var west = void 0;

        for (var i = 0; i < rowCount; ++i) {
          distances[i] = new Array(columnCount);
          distances[i][0] = i;
        }

        for (var j = 0; j < columnCount; ++j) {
          distances[0][j] = j;
        }

        for (var _i = 1; _i < rowCount; ++_i) {
          for (var _j = 1; _j < columnCount; ++_j) {
            if (this.equals(current[currentStart + _j - 1], old[oldStart + _i - 1])) {
              distances[_i][_j] = distances[_i - 1][_j - 1];
            } else {
              north = distances[_i - 1][_j] + 1;
              west = distances[_i][_j - 1] + 1;
              distances[_i][_j] = north < west ? north : west;
            }
          }
        }

        return distances;
      },
      spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
        var i = distances.length - 1;
        var j = distances[0].length - 1;
        var current = distances[i][j];
        var edits = [];

        while (i > 0 || j > 0) {
          if (i === 0) {
            edits.push(EDIT_ADD);
            j--;
            continue;
          }

          if (j === 0) {
            edits.push(EDIT_DELETE);
            i--;
            continue;
          }

          var northWest = distances[i - 1][j - 1];
          var west = distances[i - 1][j];
          var north = distances[i][j - 1];
          var min = void 0;

          if (west < north) {
            min = west < northWest ? west : northWest;
          } else {
            min = north < northWest ? north : northWest;
          }

          if (min === northWest) {
            if (northWest === current) {
              edits.push(EDIT_LEAVE);
            } else {
              edits.push(EDIT_UPDATE);
              current = northWest;
            }

            i--;
            j--;
          } else if (min === west) {
            edits.push(EDIT_DELETE);
            i--;
            current = west;
          } else {
            edits.push(EDIT_ADD);
            j--;
            current = north;
          }
        }

        edits.reverse();
        return edits;
      },
      calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
        var prefixCount = 0;
        var suffixCount = 0;
        var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);

        if (currentStart === 0 && oldStart === 0) {
          prefixCount = this.sharedPrefix(current, old, minLength);
        }

        if (currentEnd === current.length && oldEnd === old.length) {
          suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
        }

        currentStart += prefixCount;
        oldStart += prefixCount;
        currentEnd -= suffixCount;
        oldEnd -= suffixCount;

        if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
          return [];
        }

        if (currentStart === currentEnd) {
          var _splice = newSplice(currentStart, [], 0);

          while (oldStart < oldEnd) {
            _splice.removed.push(old[oldStart++]);
          }

          return [_splice];
        } else if (oldStart === oldEnd) {
          return [newSplice(currentStart, [], currentEnd - currentStart)];
        }

        var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
        var splice = undefined;
        var splices = [];
        var index = currentStart;
        var oldIndex = oldStart;

        for (var i = 0; i < ops.length; ++i) {
          switch (ops[i]) {
            case EDIT_LEAVE:
              if (splice) {
                splices.push(splice);
                splice = undefined;
              }

              index++;
              oldIndex++;
              break;

            case EDIT_UPDATE:
              if (!splice) {
                splice = newSplice(index, [], 0);
              }

              splice.addedCount++;
              index++;
              splice.removed.push(old[oldIndex]);
              oldIndex++;
              break;

            case EDIT_ADD:
              if (!splice) {
                splice = newSplice(index, [], 0);
              }

              splice.addedCount++;
              index++;
              break;

            case EDIT_DELETE:
              if (!splice) {
                splice = newSplice(index, [], 0);
              }

              splice.removed.push(old[oldIndex]);
              oldIndex++;
              break;
          }
        }

        if (splice) {
          splices.push(splice);
        }

        return splices;
      },
      sharedPrefix: function sharedPrefix(current, old, searchLength) {
        for (var i = 0; i < searchLength; ++i) {
          if (!this.equals(current[i], old[i])) {
            return i;
          }
        }

        return searchLength;
      },
      sharedSuffix: function sharedSuffix(current, old, searchLength) {
        var index1 = current.length;
        var index2 = old.length;
        var count = 0;

        while (count < searchLength && this.equals(current[--index1], old[--index2])) {
          count++;
        }

        return count;
      },
      calculateSplices: function calculateSplices(current, previous) {
        return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
      },
      equals: function equals(currentValue, previousValue) {
        return currentValue === previousValue;
      }
    };
    var arraySplice = new ArraySplice();

    function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
    }

    function intersect(start1, end1, start2, end2) {
      if (end1 < start2 || end2 < start1) {
        return -1;
      }

      if (end1 === start2 || end2 === start1) {
        return 0;
      }

      if (start1 < start2) {
        if (end1 < end2) {
          return end1 - start2;
        }

        return end2 - start2;
      }

      if (end2 < end1) {
        return end2 - start1;
      }

      return end1 - start1;
    }

    function mergeSplice(splices, index, removed, addedCount) {
      var splice = newSplice(index, removed, addedCount);
      var inserted = false;
      var insertionOffset = 0;

      for (var i = 0; i < splices.length; i++) {
        var current = splices[i];
        current.index += insertionOffset;

        if (inserted) {
          continue;
        }

        var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);

        if (intersectCount >= 0) {
          splices.splice(i, 1);
          i--;
          insertionOffset -= current.addedCount - current.removed.length;
          splice.addedCount += current.addedCount - intersectCount;
          var deleteCount = splice.removed.length + current.removed.length - intersectCount;

          if (!splice.addedCount && !deleteCount) {
            inserted = true;
          } else {
            var currentRemoved = current.removed;

            if (splice.index < current.index) {
              var prepend = splice.removed.slice(0, current.index - splice.index);
              Array.prototype.push.apply(prepend, currentRemoved);
              currentRemoved = prepend;
            }

            if (splice.index + splice.removed.length > current.index + current.addedCount) {
              var append = splice.removed.slice(current.index + current.addedCount - splice.index);
              Array.prototype.push.apply(currentRemoved, append);
            }

            splice.removed = currentRemoved;

            if (current.index < splice.index) {
              splice.index = current.index;
            }
          }
        } else if (splice.index < current.index) {
          inserted = true;
          splices.splice(i, 0, splice);
          i++;
          var offset = splice.addedCount - splice.removed.length;
          current.index += offset;
          insertionOffset += offset;
        }
      }

      if (!inserted) {
        splices.push(splice);
      }
    }

    function createInitialSplices(array, changeRecords) {
      var splices = [];

      for (var i = 0; i < changeRecords.length; i++) {
        var record = changeRecords[i];

        switch (record.type) {
          case 'splice':
            mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
            break;

          case 'add':
          case 'update':
          case 'delete':
            if (!isIndex(record.name)) {
              continue;
            }

            var index = toNumber(record.name);

            if (index < 0) {
              continue;
            }

            mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
            break;

          default:
            console.error('Unexpected record type: ' + JSON.stringify(record));
            break;
        }
      }

      return splices;
    }

    function projectArraySplices(array, changeRecords) {
      var splices = [];
      createInitialSplices(array, changeRecords).forEach(function (splice) {
        if (splice.addedCount === 1 && splice.removed.length === 1) {
          if (splice.removed[0] !== array[splice.index]) {
            splices.push(splice);
          }

          return;
        }

        splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
      });
      return splices;
    }

    function newRecord(type, object, key, oldValue) {
      return {
        type: type,
        object: object,
        key: key,
        oldValue: oldValue
      };
    }

    function getChangeRecords(map) {
      var entries = new Array(map.size);
      var keys = map.keys();
      var i = 0;
      var item = void 0;

      while (item = keys.next()) {
        if (item.done) {
          break;
        }

        entries[i] = newRecord('added', map, item.value);
        i++;
      }

      return entries;
    }

    var ModifyCollectionObserver = exports.ModifyCollectionObserver = (_dec3 = subscriberCollection(), _dec3(_class2 = function () {
      function ModifyCollectionObserver(taskQueue, collection) {
        (this || _global).taskQueue = taskQueue;
        (this || _global).queued = false;
        (this || _global).changeRecords = null;
        (this || _global).oldCollection = null;
        (this || _global).collection = collection;
        (this || _global).lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
      }

      ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };

      ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
        if (!this.hasSubscribers() && !(this || _global).lengthObserver) {
          return;
        }

        if (changeRecord.type === 'splice') {
          var index = changeRecord.index;
          var arrayLength = changeRecord.object.length;

          if (index > arrayLength) {
            index = arrayLength - changeRecord.addedCount;
          } else if (index < 0) {
            index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
          }

          if (index < 0) {
            index = 0;
          }

          changeRecord.index = index;
        }

        if ((this || _global).changeRecords === null) {
          (this || _global).changeRecords = [changeRecord];
        } else {
          (this || _global).changeRecords.push(changeRecord);
        }

        if (!(this || _global).queued) {
          (this || _global).queued = true;

          (this || _global).taskQueue.queueMicroTask(this || _global);
        }
      };

      ModifyCollectionObserver.prototype.flushChangeRecords = function flushChangeRecords() {
        if ((this || _global).changeRecords && (this || _global).changeRecords.length || (this || _global).oldCollection) {
          this.call();
        }
      };

      ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
        (this || _global).oldCollection = oldCollection;

        if (this.hasSubscribers() && !(this || _global).queued) {
          (this || _global).queued = true;

          (this || _global).taskQueue.queueMicroTask(this || _global);
        }
      };

      ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
        return (this || _global).lengthObserver || ((this || _global).lengthObserver = new CollectionLengthObserver((this || _global).collection));
      };

      ModifyCollectionObserver.prototype.call = function call() {
        var changeRecords = (this || _global).changeRecords;
        var oldCollection = (this || _global).oldCollection;
        var records = void 0;
        (this || _global).queued = false;
        (this || _global).changeRecords = [];
        (this || _global).oldCollection = null;

        if (this.hasSubscribers()) {
          if (oldCollection) {
            if ((this || _global).collection instanceof Map || (this || _global).collection instanceof Set) {
              records = getChangeRecords(oldCollection);
            } else {
              records = calcSplices((this || _global).collection, 0, (this || _global).collection.length, oldCollection, 0, oldCollection.length);
            }
          } else {
            if ((this || _global).collection instanceof Map || (this || _global).collection instanceof Set) {
              records = changeRecords;
            } else {
              records = projectArraySplices((this || _global).collection, changeRecords);
            }
          }

          this.callSubscribers(records);
        }

        if ((this || _global).lengthObserver) {
          (this || _global).lengthObserver.call((this || _global).collection[(this || _global).lengthPropertyName]);
        }
      };

      return ModifyCollectionObserver;
    }()) || _class2);
    var CollectionLengthObserver = exports.CollectionLengthObserver = (_dec4 = subscriberCollection(), _dec4(_class3 = function () {
      function CollectionLengthObserver(collection) {
        (this || _global).collection = collection;
        (this || _global).lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
        (this || _global).currentValue = collection[(this || _global).lengthPropertyName];
      }

      CollectionLengthObserver.prototype.getValue = function getValue() {
        return (this || _global).collection[(this || _global).lengthPropertyName];
      };

      CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
        (this || _global).collection[(this || _global).lengthPropertyName] = newValue;
      };

      CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };

      CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      CollectionLengthObserver.prototype.call = function call(newValue) {
        var oldValue = (this || _global).currentValue;
        this.callSubscribers(newValue, oldValue);
        (this || _global).currentValue = newValue;
      };

      return CollectionLengthObserver;
    }()) || _class3);
    var arrayProto = Array.prototype;
    var pop = arrayProto.pop;
    var push = arrayProto.push;
    var reverse = arrayProto.reverse;
    var shift = arrayProto.shift;
    var sort = arrayProto.sort;
    var splice = arrayProto.splice;
    var unshift = arrayProto.unshift;

    if (arrayProto.__au_patched__) {
      LogManager.getLogger('array-observation').warn('Detected 2nd attempt of patching array from Aurelia binding.' + ' This is probably caused by dependency mismatch between core modules and a 3rd party plugin.' + ' Please see https://github.com/aurelia/cli/pull/906 if you are using webpack.');
    } else {
      Reflect.defineProperty(arrayProto, '__au_patched__', {
        value: 1
      });

      arrayProto.pop = function () {
        var notEmpty = (this || _global).length > 0;
        var methodCallResult = pop.apply(this || _global, arguments);

        if (notEmpty && (this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.addChangeRecord({
            type: 'delete',
            object: this || _global,
            name: (this || _global).length,
            oldValue: methodCallResult
          });
        }

        return methodCallResult;
      };

      arrayProto.push = function () {
        var methodCallResult = push.apply(this || _global, arguments);

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.addChangeRecord({
            type: 'splice',
            object: this || _global,
            index: (this || _global).length - arguments.length,
            removed: [],
            addedCount: arguments.length
          });
        }

        return methodCallResult;
      };

      arrayProto.reverse = function () {
        var oldArray = void 0;

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.flushChangeRecords();

          oldArray = this.slice();
        }

        var methodCallResult = reverse.apply(this || _global, arguments);

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.reset(oldArray);
        }

        return methodCallResult;
      };

      arrayProto.shift = function () {
        var notEmpty = (this || _global).length > 0;
        var methodCallResult = shift.apply(this || _global, arguments);

        if (notEmpty && (this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.addChangeRecord({
            type: 'delete',
            object: this || _global,
            name: 0,
            oldValue: methodCallResult
          });
        }

        return methodCallResult;
      };

      arrayProto.sort = function () {
        var oldArray = void 0;

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.flushChangeRecords();

          oldArray = this.slice();
        }

        var methodCallResult = sort.apply(this || _global, arguments);

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.reset(oldArray);
        }

        return methodCallResult;
      };

      arrayProto.splice = function () {
        var methodCallResult = splice.apply(this || _global, arguments);

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.addChangeRecord({
            type: 'splice',
            object: this || _global,
            index: +arguments[0],
            removed: methodCallResult,
            addedCount: arguments.length > 2 ? arguments.length - 2 : 0
          });
        }

        return methodCallResult;
      };

      arrayProto.unshift = function () {
        var methodCallResult = unshift.apply(this || _global, arguments);

        if ((this || _global).__array_observer__ !== undefined) {
          (this || _global).__array_observer__.addChangeRecord({
            type: 'splice',
            object: this || _global,
            index: 0,
            removed: [],
            addedCount: arguments.length
          });
        }

        return methodCallResult;
      };
    }

    function _getArrayObserver(taskQueue, array) {
      return ModifyArrayObserver.for(taskQueue, array);
    }

    exports.getArrayObserver = _getArrayObserver;

    var ModifyArrayObserver = function (_ModifyCollectionObse) {
      _inherits(ModifyArrayObserver, _ModifyCollectionObse);

      function ModifyArrayObserver(taskQueue, array) {
        return _possibleConstructorReturn(this || _global, _ModifyCollectionObse.call(this || _global, taskQueue, array));
      }

      ModifyArrayObserver.for = function _for(taskQueue, array) {
        if (!('__array_observer__' in array)) {
          Reflect.defineProperty(array, '__array_observer__', {
            value: ModifyArrayObserver.create(taskQueue, array),
            enumerable: false,
            configurable: false
          });
        }

        return array.__array_observer__;
      };

      ModifyArrayObserver.create = function create(taskQueue, array) {
        return new ModifyArrayObserver(taskQueue, array);
      };

      return ModifyArrayObserver;
    }(ModifyCollectionObserver);

    var Expression = exports.Expression = function () {
      function Expression() {
        (this || _global).isAssignable = false;
      }

      Expression.prototype.evaluate = function evaluate(scope, lookupFunctions, args) {
        throw new Error('Binding expression "' + (this || _global) + '" cannot be evaluated.');
      };

      Expression.prototype.assign = function assign(scope, value, lookupFunctions) {
        throw new Error('Binding expression "' + (this || _global) + '" cannot be assigned to.');
      };

      Expression.prototype.toString = function toString() {
        return typeof FEATURE_NO_UNPARSER === 'undefined' ? _Unparser.unparse(this || _global) : Function.prototype.toString.call(this || _global);
      };

      return Expression;
    }();

    var BindingBehavior = exports.BindingBehavior = function (_Expression) {
      _inherits(BindingBehavior, _Expression);

      function BindingBehavior(expression, name, args) {
        var _this3 = _possibleConstructorReturn(this || _global, _Expression.call(this || _global));

        _this3.expression = expression;
        _this3.name = name;
        _this3.args = args;
        return _this3;
      }

      BindingBehavior.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return (this || _global).expression.evaluate(scope, lookupFunctions);
      };

      BindingBehavior.prototype.assign = function assign(scope, value, lookupFunctions) {
        return (this || _global).expression.assign(scope, value, lookupFunctions);
      };

      BindingBehavior.prototype.accept = function accept(visitor) {
        return visitor.visitBindingBehavior(this || _global);
      };

      BindingBehavior.prototype.connect = function connect(binding, scope) {
        (this || _global).expression.connect(binding, scope);
      };

      BindingBehavior.prototype.bind = function bind(binding, scope, lookupFunctions) {
        if ((this || _global).expression.expression && (this || _global).expression.bind) {
          (this || _global).expression.bind(binding, scope, lookupFunctions);
        }

        var behavior = lookupFunctions.bindingBehaviors((this || _global).name);

        if (!behavior) {
          throw new Error('No BindingBehavior named "' + (this || _global).name + '" was found!');
        }

        var behaviorKey = 'behavior-' + (this || _global).name;

        if (binding[behaviorKey]) {
          throw new Error('A binding behavior named "' + (this || _global).name + '" has already been applied to "' + (this || _global).expression + '"');
        }

        binding[behaviorKey] = behavior;
        behavior.bind.apply(behavior, [binding, scope].concat(evalList(scope, (this || _global).args, binding.lookupFunctions)));
      };

      BindingBehavior.prototype.unbind = function unbind(binding, scope) {
        var behaviorKey = 'behavior-' + (this || _global).name;
        binding[behaviorKey].unbind(binding, scope);
        binding[behaviorKey] = null;

        if ((this || _global).expression.expression && (this || _global).expression.unbind) {
          (this || _global).expression.unbind(binding, scope);
        }
      };

      return BindingBehavior;
    }(Expression);

    var ValueConverter = exports.ValueConverter = function (_Expression2) {
      _inherits(ValueConverter, _Expression2);

      function ValueConverter(expression, name, args) {
        var _this4 = _possibleConstructorReturn(this || _global, _Expression2.call(this || _global));

        _this4.expression = expression;
        _this4.name = name;
        _this4.args = args;
        _this4.allArgs = [expression].concat(args);
        return _this4;
      }

      ValueConverter.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var converter = lookupFunctions.valueConverters((this || _global).name);

        if (!converter) {
          throw new Error('No ValueConverter named "' + (this || _global).name + '" was found!');
        }

        if ('toView' in converter) {
          return converter.toView.apply(converter, evalList(scope, (this || _global).allArgs, lookupFunctions));
        }

        return (this || _global).allArgs[0].evaluate(scope, lookupFunctions);
      };

      ValueConverter.prototype.assign = function assign(scope, value, lookupFunctions) {
        var converter = lookupFunctions.valueConverters((this || _global).name);

        if (!converter) {
          throw new Error('No ValueConverter named "' + (this || _global).name + '" was found!');
        }

        if ('fromView' in converter) {
          value = converter.fromView.apply(converter, [value].concat(evalList(scope, (this || _global).args, lookupFunctions)));
        }

        return (this || _global).allArgs[0].assign(scope, value, lookupFunctions);
      };

      ValueConverter.prototype.accept = function accept(visitor) {
        return visitor.visitValueConverter(this || _global);
      };

      ValueConverter.prototype.connect = function connect(binding, scope) {
        var expressions = (this || _global).allArgs;
        var i = expressions.length;

        while (i--) {
          expressions[i].connect(binding, scope);
        }

        var converter = binding.lookupFunctions.valueConverters((this || _global).name);

        if (!converter) {
          throw new Error('No ValueConverter named "' + (this || _global).name + '" was found!');
        }

        var signals = converter.signals;

        if (signals === undefined) {
          return;
        }

        i = signals.length;

        while (i--) {
          connectBindingToSignal(binding, signals[i]);
        }
      };

      return ValueConverter;
    }(Expression);

    var Assign = exports.Assign = function (_Expression3) {
      _inherits(Assign, _Expression3);

      function Assign(target, value) {
        var _this5 = _possibleConstructorReturn(this || _global, _Expression3.call(this || _global));

        _this5.target = target;
        _this5.value = value;
        _this5.isAssignable = true;
        return _this5;
      }

      Assign.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return (this || _global).target.assign(scope, (this || _global).value.evaluate(scope, lookupFunctions));
      };

      Assign.prototype.accept = function accept(vistor) {
        vistor.visitAssign(this || _global);
      };

      Assign.prototype.connect = function connect(binding, scope) {};

      Assign.prototype.assign = function assign(scope, value) {
        (this || _global).value.assign(scope, value);

        (this || _global).target.assign(scope, value);
      };

      return Assign;
    }(Expression);

    var Conditional = exports.Conditional = function (_Expression4) {
      _inherits(Conditional, _Expression4);

      function Conditional(condition, yes, no) {
        var _this6 = _possibleConstructorReturn(this || _global, _Expression4.call(this || _global));

        _this6.condition = condition;
        _this6.yes = yes;
        _this6.no = no;
        return _this6;
      }

      Conditional.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return !!(this || _global).condition.evaluate(scope, lookupFunctions) ? (this || _global).yes.evaluate(scope, lookupFunctions) : (this || _global).no.evaluate(scope, lookupFunctions);
      };

      Conditional.prototype.accept = function accept(visitor) {
        return visitor.visitConditional(this || _global);
      };

      Conditional.prototype.connect = function connect(binding, scope) {
        (this || _global).condition.connect(binding, scope);

        if ((this || _global).condition.evaluate(scope)) {
          (this || _global).yes.connect(binding, scope);
        } else {
          (this || _global).no.connect(binding, scope);
        }
      };

      return Conditional;
    }(Expression);

    var AccessThis = exports.AccessThis = function (_Expression5) {
      _inherits(AccessThis, _Expression5);

      function AccessThis(ancestor) {
        var _this7 = _possibleConstructorReturn(this || _global, _Expression5.call(this || _global));

        _this7.ancestor = ancestor;
        return _this7;
      }

      AccessThis.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var oc = scope.overrideContext;
        var i = (this || _global).ancestor;

        while (i-- && oc) {
          oc = oc.parentOverrideContext;
        }

        return i < 1 && oc ? oc.bindingContext : undefined;
      };

      AccessThis.prototype.accept = function accept(visitor) {
        return visitor.visitAccessThis(this || _global);
      };

      AccessThis.prototype.connect = function connect(binding, scope) {};

      return AccessThis;
    }(Expression);

    var AccessScope = exports.AccessScope = function (_Expression6) {
      _inherits(AccessScope, _Expression6);

      function AccessScope(name, ancestor) {
        var _this8 = _possibleConstructorReturn(this || _global, _Expression6.call(this || _global));

        _this8.name = name;
        _this8.ancestor = ancestor;
        _this8.isAssignable = true;
        return _this8;
      }

      AccessScope.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var context = getContextFor((this || _global).name, scope, (this || _global).ancestor);
        return context[(this || _global).name];
      };

      AccessScope.prototype.assign = function assign(scope, value) {
        var context = getContextFor((this || _global).name, scope, (this || _global).ancestor);
        return context ? context[(this || _global).name] = value : undefined;
      };

      AccessScope.prototype.accept = function accept(visitor) {
        return visitor.visitAccessScope(this || _global);
      };

      AccessScope.prototype.connect = function connect(binding, scope) {
        var context = getContextFor((this || _global).name, scope, (this || _global).ancestor);
        binding.observeProperty(context, (this || _global).name);
      };

      return AccessScope;
    }(Expression);

    var AccessMember = exports.AccessMember = function (_Expression7) {
      _inherits(AccessMember, _Expression7);

      function AccessMember(object, name) {
        var _this9 = _possibleConstructorReturn(this || _global, _Expression7.call(this || _global));

        _this9.object = object;
        _this9.name = name;
        _this9.isAssignable = true;
        return _this9;
      }

      AccessMember.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var instance = (this || _global).object.evaluate(scope, lookupFunctions);

        return instance === null || instance === undefined ? instance : instance[(this || _global).name];
      };

      AccessMember.prototype.assign = function assign(scope, value) {
        var instance = (this || _global).object.evaluate(scope);

        if (instance === null || instance === undefined) {
          instance = {};

          (this || _global).object.assign(scope, instance);
        }

        instance[(this || _global).name] = value;
        return value;
      };

      AccessMember.prototype.accept = function accept(visitor) {
        return visitor.visitAccessMember(this || _global);
      };

      AccessMember.prototype.connect = function connect(binding, scope) {
        (this || _global).object.connect(binding, scope);

        var obj = (this || _global).object.evaluate(scope);

        if (obj) {
          binding.observeProperty(obj, (this || _global).name);
        }
      };

      return AccessMember;
    }(Expression);

    var AccessKeyed = exports.AccessKeyed = function (_Expression8) {
      _inherits(AccessKeyed, _Expression8);

      function AccessKeyed(object, key) {
        var _this10 = _possibleConstructorReturn(this || _global, _Expression8.call(this || _global));

        _this10.object = object;
        _this10.key = key;
        _this10.isAssignable = true;
        return _this10;
      }

      AccessKeyed.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var instance = (this || _global).object.evaluate(scope, lookupFunctions);

        var lookup = (this || _global).key.evaluate(scope, lookupFunctions);

        return getKeyed(instance, lookup);
      };

      AccessKeyed.prototype.assign = function assign(scope, value) {
        var instance = (this || _global).object.evaluate(scope);

        var lookup = (this || _global).key.evaluate(scope);

        return setKeyed(instance, lookup, value);
      };

      AccessKeyed.prototype.accept = function accept(visitor) {
        return visitor.visitAccessKeyed(this || _global);
      };

      AccessKeyed.prototype.connect = function connect(binding, scope) {
        (this || _global).object.connect(binding, scope);

        var obj = (this || _global).object.evaluate(scope);

        if (obj instanceof Object) {
          (this || _global).key.connect(binding, scope);

          var key = (this || _global).key.evaluate(scope);

          if (key !== null && key !== undefined && !(Array.isArray(obj) && typeof key === 'number')) {
            binding.observeProperty(obj, key);
          }
        }
      };

      return AccessKeyed;
    }(Expression);

    var CallScope = exports.CallScope = function (_Expression9) {
      _inherits(CallScope, _Expression9);

      function CallScope(name, args, ancestor) {
        var _this11 = _possibleConstructorReturn(this || _global, _Expression9.call(this || _global));

        _this11.name = name;
        _this11.args = args;
        _this11.ancestor = ancestor;
        return _this11;
      }

      CallScope.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var args = evalList(scope, (this || _global).args, lookupFunctions);
        var context = getContextFor((this || _global).name, scope, (this || _global).ancestor);
        var func = getFunction(context, (this || _global).name, mustEvaluate);

        if (func) {
          return func.apply(context, args);
        }

        return undefined;
      };

      CallScope.prototype.accept = function accept(visitor) {
        return visitor.visitCallScope(this || _global);
      };

      CallScope.prototype.connect = function connect(binding, scope) {
        var args = (this || _global).args;
        var i = args.length;

        while (i--) {
          args[i].connect(binding, scope);
        }
      };

      return CallScope;
    }(Expression);

    var CallMember = exports.CallMember = function (_Expression10) {
      _inherits(CallMember, _Expression10);

      function CallMember(object, name, args) {
        var _this12 = _possibleConstructorReturn(this || _global, _Expression10.call(this || _global));

        _this12.object = object;
        _this12.name = name;
        _this12.args = args;
        return _this12;
      }

      CallMember.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var instance = (this || _global).object.evaluate(scope, lookupFunctions);

        var args = evalList(scope, (this || _global).args, lookupFunctions);
        var func = getFunction(instance, (this || _global).name, mustEvaluate);

        if (func) {
          return func.apply(instance, args);
        }

        return undefined;
      };

      CallMember.prototype.accept = function accept(visitor) {
        return visitor.visitCallMember(this || _global);
      };

      CallMember.prototype.connect = function connect(binding, scope) {
        (this || _global).object.connect(binding, scope);

        var obj = (this || _global).object.evaluate(scope);

        if (getFunction(obj, (this || _global).name, false)) {
          var args = (this || _global).args;
          var i = args.length;

          while (i--) {
            args[i].connect(binding, scope);
          }
        }
      };

      return CallMember;
    }(Expression);

    var CallFunction = exports.CallFunction = function (_Expression11) {
      _inherits(CallFunction, _Expression11);

      function CallFunction(func, args) {
        var _this13 = _possibleConstructorReturn(this || _global, _Expression11.call(this || _global));

        _this13.func = func;
        _this13.args = args;
        return _this13;
      }

      CallFunction.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var func = (this || _global).func.evaluate(scope, lookupFunctions);

        if (typeof func === 'function') {
          return func.apply(null, evalList(scope, (this || _global).args, lookupFunctions));
        }

        if (!mustEvaluate && (func === null || func === undefined)) {
          return undefined;
        }

        throw new Error((this || _global).func + ' is not a function');
      };

      CallFunction.prototype.accept = function accept(visitor) {
        return visitor.visitCallFunction(this || _global);
      };

      CallFunction.prototype.connect = function connect(binding, scope) {
        (this || _global).func.connect(binding, scope);

        var func = (this || _global).func.evaluate(scope);

        if (typeof func === 'function') {
          var args = (this || _global).args;
          var i = args.length;

          while (i--) {
            args[i].connect(binding, scope);
          }
        }
      };

      return CallFunction;
    }(Expression);

    var Binary = exports.Binary = function (_Expression12) {
      _inherits(Binary, _Expression12);

      function Binary(operation, left, right) {
        var _this14 = _possibleConstructorReturn(this || _global, _Expression12.call(this || _global));

        _this14.operation = operation;
        _this14.left = left;
        _this14.right = right;
        return _this14;
      }

      Binary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var left = (this || _global).left.evaluate(scope, lookupFunctions);

        switch ((this || _global).operation) {
          case '&&':
            return left && (this || _global).right.evaluate(scope, lookupFunctions);

          case '||':
            return left || (this || _global).right.evaluate(scope, lookupFunctions);
        }

        var right = (this || _global).right.evaluate(scope, lookupFunctions);

        switch ((this || _global).operation) {
          case '==':
            return left == right;

          case '===':
            return left === right;

          case '!=':
            return left != right;

          case '!==':
            return left !== right;

          case 'instanceof':
            return typeof right === 'function' && left instanceof right;

          case 'in':
            return (typeof right === 'undefined' ? 'undefined' : _typeof(right)) === 'object' && right !== null && left in right;
        }

        if (left === null || right === null || left === undefined || right === undefined) {
          switch ((this || _global).operation) {
            case '+':
              if (left !== null && left !== undefined) return left;
              if (right !== null && right !== undefined) return right;
              return 0;

            case '-':
              if (left !== null && left !== undefined) return left;
              if (right !== null && right !== undefined) return 0 - right;
              return 0;
          }

          return null;
        }

        switch ((this || _global).operation) {
          case '+':
            return autoConvertAdd(left, right);

          case '-':
            return left - right;

          case '*':
            return left * right;

          case '/':
            return left / right;

          case '%':
            return left % right;

          case '<':
            return left < right;

          case '>':
            return left > right;

          case '<=':
            return left <= right;

          case '>=':
            return left >= right;

          case '^':
            return left ^ right;
        }

        throw new Error('Internal error [' + (this || _global).operation + '] not handled');
      };

      Binary.prototype.accept = function accept(visitor) {
        return visitor.visitBinary(this || _global);
      };

      Binary.prototype.connect = function connect(binding, scope) {
        (this || _global).left.connect(binding, scope);

        var left = (this || _global).left.evaluate(scope);

        if ((this || _global).operation === '&&' && !left || (this || _global).operation === '||' && left) {
          return;
        }

        (this || _global).right.connect(binding, scope);
      };

      return Binary;
    }(Expression);

    var Unary = exports.Unary = function (_Expression13) {
      _inherits(Unary, _Expression13);

      function Unary(operation, expression) {
        var _this15 = _possibleConstructorReturn(this || _global, _Expression13.call(this || _global));

        _this15.operation = operation;
        _this15.expression = expression;
        return _this15;
      }

      Unary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        switch ((this || _global).operation) {
          case '!':
            return !(this || _global).expression.evaluate(scope, lookupFunctions);

          case 'typeof':
            return _typeof((this || _global).expression.evaluate(scope, lookupFunctions));

          case 'void':
            return void (this || _global).expression.evaluate(scope, lookupFunctions);
        }

        throw new Error('Internal error [' + (this || _global).operation + '] not handled');
      };

      Unary.prototype.accept = function accept(visitor) {
        return visitor.visitPrefix(this || _global);
      };

      Unary.prototype.connect = function connect(binding, scope) {
        (this || _global).expression.connect(binding, scope);
      };

      return Unary;
    }(Expression);

    var LiteralPrimitive = exports.LiteralPrimitive = function (_Expression14) {
      _inherits(LiteralPrimitive, _Expression14);

      function LiteralPrimitive(value) {
        var _this16 = _possibleConstructorReturn(this || _global, _Expression14.call(this || _global));

        _this16.value = value;
        return _this16;
      }

      LiteralPrimitive.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return (this || _global).value;
      };

      LiteralPrimitive.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralPrimitive(this || _global);
      };

      LiteralPrimitive.prototype.connect = function connect(binding, scope) {};

      return LiteralPrimitive;
    }(Expression);

    var LiteralString = exports.LiteralString = function (_Expression15) {
      _inherits(LiteralString, _Expression15);

      function LiteralString(value) {
        var _this17 = _possibleConstructorReturn(this || _global, _Expression15.call(this || _global));

        _this17.value = value;
        return _this17;
      }

      LiteralString.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return (this || _global).value;
      };

      LiteralString.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralString(this || _global);
      };

      LiteralString.prototype.connect = function connect(binding, scope) {};

      return LiteralString;
    }(Expression);

    var LiteralTemplate = exports.LiteralTemplate = function (_Expression16) {
      _inherits(LiteralTemplate, _Expression16);

      function LiteralTemplate(cooked, expressions, raw, tag) {
        var _this18 = _possibleConstructorReturn(this || _global, _Expression16.call(this || _global));

        _this18.cooked = cooked;
        _this18.expressions = expressions || [];
        _this18.length = _this18.expressions.length;
        _this18.tagged = tag !== undefined;

        if (_this18.tagged) {
          _this18.cooked.raw = raw;
          _this18.tag = tag;

          if (tag instanceof AccessScope) {
            _this18.contextType = 'Scope';
          } else if (tag instanceof AccessMember || tag instanceof AccessKeyed) {
            _this18.contextType = 'Object';
          } else {
            throw new Error(_this18.tag + ' is not a valid template tag');
          }
        }

        return _this18;
      }

      LiteralTemplate.prototype.getScopeContext = function getScopeContext(scope, lookupFunctions) {
        return getContextFor((this || _global).tag.name, scope, (this || _global).tag.ancestor);
      };

      LiteralTemplate.prototype.getObjectContext = function getObjectContext(scope, lookupFunctions) {
        return (this || _global).tag.object.evaluate(scope, lookupFunctions);
      };

      LiteralTemplate.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
        var results = new Array((this || _global).length);

        for (var i = 0; i < (this || _global).length; i++) {
          results[i] = (this || _global).expressions[i].evaluate(scope, lookupFunctions);
        }

        if ((this || _global).tagged) {
          var func = (this || _global).tag.evaluate(scope, lookupFunctions);

          if (typeof func === 'function') {
            var context = this['get' + (this || _global).contextType + 'Context'](scope, lookupFunctions);
            return func.call.apply(func, [context, (this || _global).cooked].concat(results));
          }

          if (!mustEvaluate) {
            return null;
          }

          throw new Error((this || _global).tag + ' is not a function');
        }

        var result = (this || _global).cooked[0];

        for (var _i2 = 0; _i2 < (this || _global).length; _i2++) {
          result = String.prototype.concat(result, results[_i2], (this || _global).cooked[_i2 + 1]);
        }

        return result;
      };

      LiteralTemplate.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralTemplate(this || _global);
      };

      LiteralTemplate.prototype.connect = function connect(binding, scope) {
        for (var i = 0; i < (this || _global).length; i++) {
          (this || _global).expressions[i].connect(binding, scope);
        }

        if ((this || _global).tagged) {
          (this || _global).tag.connect(binding, scope);
        }
      };

      return LiteralTemplate;
    }(Expression);

    var LiteralArray = exports.LiteralArray = function (_Expression17) {
      _inherits(LiteralArray, _Expression17);

      function LiteralArray(elements) {
        var _this19 = _possibleConstructorReturn(this || _global, _Expression17.call(this || _global));

        _this19.elements = elements;
        return _this19;
      }

      LiteralArray.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var elements = (this || _global).elements;
        var result = [];

        for (var i = 0, length = elements.length; i < length; ++i) {
          result[i] = elements[i].evaluate(scope, lookupFunctions);
        }

        return result;
      };

      LiteralArray.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralArray(this || _global);
      };

      LiteralArray.prototype.connect = function connect(binding, scope) {
        var length = (this || _global).elements.length;

        for (var i = 0; i < length; i++) {
          (this || _global).elements[i].connect(binding, scope);
        }
      };

      return LiteralArray;
    }(Expression);

    var LiteralObject = exports.LiteralObject = function (_Expression18) {
      _inherits(LiteralObject, _Expression18);

      function LiteralObject(keys, values) {
        var _this20 = _possibleConstructorReturn(this || _global, _Expression18.call(this || _global));

        _this20.keys = keys;
        _this20.values = values;
        return _this20;
      }

      LiteralObject.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        var instance = {};
        var keys = (this || _global).keys;
        var values = (this || _global).values;

        for (var i = 0, length = keys.length; i < length; ++i) {
          instance[keys[i]] = values[i].evaluate(scope, lookupFunctions);
        }

        return instance;
      };

      LiteralObject.prototype.accept = function accept(visitor) {
        return visitor.visitLiteralObject(this || _global);
      };

      LiteralObject.prototype.connect = function connect(binding, scope) {
        var length = (this || _global).keys.length;

        for (var i = 0; i < length; i++) {
          (this || _global).values[i].connect(binding, scope);
        }
      };

      return LiteralObject;
    }(Expression);

    function evalList(scope, list, lookupFunctions) {
      var length = list.length;
      var result = [];

      for (var i = 0; i < length; i++) {
        result[i] = list[i].evaluate(scope, lookupFunctions);
      }

      return result;
    }

    function autoConvertAdd(a, b) {
      if (a !== null && b !== null) {
        if (typeof a === 'string' && typeof b !== 'string') {
          return a + b.toString();
        }

        if (typeof a !== 'string' && typeof b === 'string') {
          return a.toString() + b;
        }

        return a + b;
      }

      if (a !== null) {
        return a;
      }

      if (b !== null) {
        return b;
      }

      return 0;
    }

    function getFunction(obj, name, mustExist) {
      var func = obj === null || obj === undefined ? null : obj[name];

      if (typeof func === 'function') {
        return func;
      }

      if (!mustExist && (func === null || func === undefined)) {
        return null;
      }

      throw new Error(name + ' is not a function');
    }

    function getKeyed(obj, key) {
      if (Array.isArray(obj)) {
        return obj[parseInt(key, 10)];
      } else if (obj) {
        return obj[key];
      } else if (obj === null || obj === undefined) {
        return undefined;
      }

      return obj[key];
    }

    function setKeyed(obj, key, value) {
      if (Array.isArray(obj)) {
        var index = parseInt(key, 10);

        if (obj.length <= index) {
          obj.length = index + 1;
        }

        obj[index] = value;
      } else {
        obj[key] = value;
      }

      return value;
    }

    var _Unparser = null;
    exports.Unparser = _Unparser;

    if (typeof FEATURE_NO_UNPARSER === 'undefined') {
      exports.Unparser = _Unparser = function () {
        function Unparser(buffer) {
          (this || _global).buffer = buffer;
        }

        Unparser.unparse = function unparse(expression) {
          var buffer = [];
          var visitor = new _Unparser(buffer);
          expression.accept(visitor);
          return buffer.join('');
        };

        Unparser.prototype.write = function write(text) {
          (this || _global).buffer.push(text);
        };

        Unparser.prototype.writeArgs = function writeArgs(args) {
          this.write('(');

          for (var i = 0, length = args.length; i < length; ++i) {
            if (i !== 0) {
              this.write(',');
            }

            args[i].accept(this || _global);
          }

          this.write(')');
        };

        Unparser.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
          var args = behavior.args;
          behavior.expression.accept(this || _global);
          this.write('&' + behavior.name);

          for (var i = 0, length = args.length; i < length; ++i) {
            this.write(':');
            args[i].accept(this || _global);
          }
        };

        Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
          var args = converter.args;
          converter.expression.accept(this || _global);
          this.write('|' + converter.name);

          for (var i = 0, length = args.length; i < length; ++i) {
            this.write(':');
            args[i].accept(this || _global);
          }
        };

        Unparser.prototype.visitAssign = function visitAssign(assign) {
          assign.target.accept(this || _global);
          this.write('=');
          assign.value.accept(this || _global);
        };

        Unparser.prototype.visitConditional = function visitConditional(conditional) {
          conditional.condition.accept(this || _global);
          this.write('?');
          conditional.yes.accept(this || _global);
          this.write(':');
          conditional.no.accept(this || _global);
        };

        Unparser.prototype.visitAccessThis = function visitAccessThis(access) {
          if (access.ancestor === 0) {
            this.write('$this');
            return;
          }

          this.write('$parent');
          var i = access.ancestor - 1;

          while (i--) {
            this.write('.$parent');
          }
        };

        Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
          var i = access.ancestor;

          while (i--) {
            this.write('$parent.');
          }

          this.write(access.name);
        };

        Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
          access.object.accept(this || _global);
          this.write('.' + access.name);
        };

        Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
          access.object.accept(this || _global);
          this.write('[');
          access.key.accept(this || _global);
          this.write(']');
        };

        Unparser.prototype.visitCallScope = function visitCallScope(call) {
          var i = call.ancestor;

          while (i--) {
            this.write('$parent.');
          }

          this.write(call.name);
          this.writeArgs(call.args);
        };

        Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
          call.func.accept(this || _global);
          this.writeArgs(call.args);
        };

        Unparser.prototype.visitCallMember = function visitCallMember(call) {
          call.object.accept(this || _global);
          this.write('.' + call.name);
          this.writeArgs(call.args);
        };

        Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
          this.write('(' + prefix.operation);

          if (prefix.operation.charCodeAt(0) >= 97) {
            this.write(' ');
          }

          prefix.expression.accept(this || _global);
          this.write(')');
        };

        Unparser.prototype.visitBinary = function visitBinary(binary) {
          binary.left.accept(this || _global);

          if (binary.operation.charCodeAt(0) === 105) {
            this.write(' ' + binary.operation + ' ');
          } else {
            this.write(binary.operation);
          }

          binary.right.accept(this || _global);
        };

        Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
          this.write('' + literal.value);
        };

        Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
          var elements = literal.elements;
          this.write('[');

          for (var i = 0, length = elements.length; i < length; ++i) {
            if (i !== 0) {
              this.write(',');
            }

            elements[i].accept(this || _global);
          }

          this.write(']');
        };

        Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
          var keys = literal.keys;
          var values = literal.values;
          this.write('{');

          for (var i = 0, length = keys.length; i < length; ++i) {
            if (i !== 0) {
              this.write(',');
            }

            this.write('\'' + keys[i] + '\':');
            values[i].accept(this || _global);
          }

          this.write('}');
        };

        Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
          var escaped = literal.value.replace(/'/g, "\'");
          this.write('\'' + escaped + '\'');
        };

        Unparser.prototype.visitLiteralTemplate = function visitLiteralTemplate(literal) {
          var cooked = literal.cooked,
              expressions = literal.expressions;
          var length = expressions.length;
          this.write('`');
          this.write(cooked[0]);

          for (var i = 0; i < length; i++) {
            expressions[i].accept(this || _global);
            this.write(cooked[i + 1]);
          }

          this.write('`');
        };

        return Unparser;
      }();
    }

    var ExpressionCloner = exports.ExpressionCloner = function () {
      function ExpressionCloner() {}

      ExpressionCloner.prototype.cloneExpressionArray = function cloneExpressionArray(array) {
        var clonedArray = [];
        var i = array.length;

        while (i--) {
          clonedArray[i] = array[i].accept(this || _global);
        }

        return clonedArray;
      };

      ExpressionCloner.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
        return new BindingBehavior(behavior.expression.accept(this || _global), behavior.name, this.cloneExpressionArray(behavior.args));
      };

      ExpressionCloner.prototype.visitValueConverter = function visitValueConverter(converter) {
        return new ValueConverter(converter.expression.accept(this || _global), converter.name, this.cloneExpressionArray(converter.args));
      };

      ExpressionCloner.prototype.visitAssign = function visitAssign(assign) {
        return new Assign(assign.target.accept(this || _global), assign.value.accept(this || _global));
      };

      ExpressionCloner.prototype.visitConditional = function visitConditional(conditional) {
        return new Conditional(conditional.condition.accept(this || _global), conditional.yes.accept(this || _global), conditional.no.accept(this || _global));
      };

      ExpressionCloner.prototype.visitAccessThis = function visitAccessThis(access) {
        return new AccessThis(access.ancestor);
      };

      ExpressionCloner.prototype.visitAccessScope = function visitAccessScope(access) {
        return new AccessScope(access.name, access.ancestor);
      };

      ExpressionCloner.prototype.visitAccessMember = function visitAccessMember(access) {
        return new AccessMember(access.object.accept(this || _global), access.name);
      };

      ExpressionCloner.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
        return new AccessKeyed(access.object.accept(this || _global), access.key.accept(this || _global));
      };

      ExpressionCloner.prototype.visitCallScope = function visitCallScope(call) {
        return new CallScope(call.name, this.cloneExpressionArray(call.args), call.ancestor);
      };

      ExpressionCloner.prototype.visitCallFunction = function visitCallFunction(call) {
        return new CallFunction(call.func.accept(this || _global), this.cloneExpressionArray(call.args));
      };

      ExpressionCloner.prototype.visitCallMember = function visitCallMember(call) {
        return new CallMember(call.object.accept(this || _global), call.name, this.cloneExpressionArray(call.args));
      };

      ExpressionCloner.prototype.visitUnary = function visitUnary(unary) {
        return new Unary(prefix.operation, prefix.expression.accept(this || _global));
      };

      ExpressionCloner.prototype.visitBinary = function visitBinary(binary) {
        return new Binary(binary.operation, binary.left.accept(this || _global), binary.right.accept(this || _global));
      };

      ExpressionCloner.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
        return new LiteralPrimitive(literal);
      };

      ExpressionCloner.prototype.visitLiteralArray = function visitLiteralArray(literal) {
        return new LiteralArray(this.cloneExpressionArray(literal.elements));
      };

      ExpressionCloner.prototype.visitLiteralObject = function visitLiteralObject(literal) {
        return new LiteralObject(literal.keys, this.cloneExpressionArray(literal.values));
      };

      ExpressionCloner.prototype.visitLiteralString = function visitLiteralString(literal) {
        return new LiteralString(literal.value);
      };

      ExpressionCloner.prototype.visitLiteralTemplate = function visitLiteralTemplate(literal) {
        return new LiteralTemplate(literal.cooked, this.cloneExpressionArray(literal.expressions), literal.raw, literal.tag && literal.tag.accept(this || _global));
      };

      return ExpressionCloner;
    }();

    function cloneExpression(expression) {
      var visitor = new ExpressionCloner();
      return expression.accept(visitor);
    }

    var bindingMode = exports.bindingMode = {
      oneTime: 0,
      toView: 1,
      oneWay: 1,
      twoWay: 2,
      fromView: 3
    };

    var Parser = exports.Parser = function () {
      function Parser() {
        (this || _global).cache = Object.create(null);
      }

      Parser.prototype.parse = function parse(src) {
        src = src || '';
        return (this || _global).cache[src] || ((this || _global).cache[src] = new ParserImplementation(src).parseBindingBehavior());
      };

      return Parser;
    }();

    var fromCharCode = String.fromCharCode;

    var ParserImplementation = exports.ParserImplementation = function () {
      _createClass(ParserImplementation, [{
        key: 'raw',
        get: function get() {
          return (this || _global).src.slice((this || _global).start, (this || _global).idx);
        }
      }]);

      function ParserImplementation(src) {
        (this || _global).idx = 0;
        (this || _global).start = 0;
        (this || _global).src = src;
        (this || _global).len = src.length;
        (this || _global).tkn = T$EOF;
        (this || _global).val = undefined;
        (this || _global).ch = src.charCodeAt(0);
      }

      ParserImplementation.prototype.parseBindingBehavior = function parseBindingBehavior() {
        this.nextToken();

        if ((this || _global).tkn & T$ExpressionTerminal) {
          this.err('Invalid start of expression');
        }

        var result = this.parseValueConverter();

        while (this.opt(T$Ampersand)) {
          result = new BindingBehavior(result, (this || _global).val, this.parseVariadicArgs());
        }

        if ((this || _global).tkn !== T$EOF) {
          this.err('Unconsumed token ' + (this || _global).raw);
        }

        return result;
      };

      ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
        var result = this.parseExpression();

        while (this.opt(T$Bar)) {
          result = new ValueConverter(result, (this || _global).val, this.parseVariadicArgs());
        }

        return result;
      };

      ParserImplementation.prototype.parseVariadicArgs = function parseVariadicArgs() {
        this.nextToken();
        var result = [];

        while (this.opt(T$Colon)) {
          result.push(this.parseExpression());
        }

        return result;
      };

      ParserImplementation.prototype.parseExpression = function parseExpression() {
        var exprStart = (this || _global).idx;
        var result = this.parseConditional();

        while ((this || _global).tkn === T$Eq) {
          if (!result.isAssignable) {
            this.err('Expression ' + (this || _global).src.slice(exprStart, (this || _global).start) + ' is not assignable');
          }

          this.nextToken();
          exprStart = (this || _global).idx;
          result = new Assign(result, this.parseConditional());
        }

        return result;
      };

      ParserImplementation.prototype.parseConditional = function parseConditional() {
        var result = this.parseBinary(0);

        if (this.opt(T$Question)) {
          var yes = this.parseExpression();
          this.expect(T$Colon);
          result = new Conditional(result, yes, this.parseExpression());
        }

        return result;
      };

      ParserImplementation.prototype.parseBinary = function parseBinary(minPrecedence) {
        var left = this.parseLeftHandSide(0);

        while ((this || _global).tkn & T$BinaryOp) {
          var opToken = (this || _global).tkn;

          if ((opToken & T$Precedence) <= minPrecedence) {
            break;
          }

          this.nextToken();
          left = new Binary(TokenValues[opToken & T$TokenMask], left, this.parseBinary(opToken & T$Precedence));
        }

        return left;
      };

      ParserImplementation.prototype.parseLeftHandSide = function parseLeftHandSide(context) {
        var result = void 0;

        primary: switch ((this || _global).tkn) {
          case T$Plus:
            this.nextToken();
            return this.parseLeftHandSide(0);

          case T$Minus:
            this.nextToken();
            return new Binary('-', new LiteralPrimitive(0), this.parseLeftHandSide(0));

          case T$Bang:
          case T$TypeofKeyword:
          case T$VoidKeyword:
            var op = TokenValues[(this || _global).tkn & T$TokenMask];
            this.nextToken();
            return new Unary(op, this.parseLeftHandSide(0));

          case T$ParentScope:
            {
              do {
                this.nextToken();
                context++;

                if (this.opt(T$Period)) {
                  if ((this || _global).tkn === T$Period) {
                    this.err();
                  }

                  continue;
                } else if ((this || _global).tkn & T$AccessScopeTerminal) {
                  result = new AccessThis(context & C$Ancestor);
                  context = context & C$ShorthandProp | C$This;
                  break primary;
                } else {
                  this.err();
                }
              } while ((this || _global).tkn === T$ParentScope);
            }

          case T$Identifier:
            {
              result = new AccessScope((this || _global).val, context & C$Ancestor);
              this.nextToken();
              context = context & C$ShorthandProp | C$Scope;
              break;
            }

          case T$ThisScope:
            this.nextToken();
            result = new AccessThis(0);
            context = context & C$ShorthandProp | C$This;
            break;

          case T$LParen:
            this.nextToken();
            result = this.parseExpression();
            this.expect(T$RParen);
            context = C$Primary;
            break;

          case T$LBracket:
            {
              this.nextToken();
              var _elements = [];

              if ((this || _global).tkn !== T$RBracket) {
                do {
                  _elements.push(this.parseExpression());
                } while (this.opt(T$Comma));
              }

              this.expect(T$RBracket);
              result = new LiteralArray(_elements);
              context = C$Primary;
              break;
            }

          case T$LBrace:
            {
              var keys = [];
              var values = [];
              this.nextToken();

              while ((this || _global).tkn !== T$RBrace) {
                if ((this || _global).tkn & T$IdentifierOrKeyword) {
                  var ch = (this || _global).ch,
                      tkn = (this || _global).tkn,
                      idx = (this || _global).idx;
                  keys.push((this || _global).val);
                  this.nextToken();

                  if (this.opt(T$Colon)) {
                    values.push(this.parseExpression());
                  } else {
                    (this || _global).ch = ch;
                    (this || _global).tkn = tkn;
                    (this || _global).idx = idx;
                    values.push(this.parseLeftHandSide(C$ShorthandProp));
                  }
                } else if ((this || _global).tkn & T$Literal) {
                  keys.push((this || _global).val);
                  this.nextToken();
                  this.expect(T$Colon);
                  values.push(this.parseExpression());
                } else {
                  this.err();
                }

                if ((this || _global).tkn !== T$RBrace) {
                  this.expect(T$Comma);
                }
              }

              this.expect(T$RBrace);
              result = new LiteralObject(keys, values);
              context = C$Primary;
              break;
            }

          case T$StringLiteral:
            result = new LiteralString((this || _global).val);
            this.nextToken();
            context = C$Primary;
            break;

          case T$TemplateTail:
            result = new LiteralTemplate([(this || _global).val]);
            this.nextToken();
            context = C$Primary;
            break;

          case T$TemplateContinuation:
            result = this.parseTemplate(0);
            context = C$Primary;
            break;

          case T$NumericLiteral:
            {
              result = new LiteralPrimitive((this || _global).val);
              this.nextToken();
              break;
            }

          case T$NullKeyword:
          case T$UndefinedKeyword:
          case T$TrueKeyword:
          case T$FalseKeyword:
            result = new LiteralPrimitive(TokenValues[(this || _global).tkn & T$TokenMask]);
            this.nextToken();
            context = C$Primary;
            break;

          default:
            if ((this || _global).idx >= (this || _global).len) {
              this.err('Unexpected end of expression');
            } else {
              this.err();
            }

        }

        if (context & C$ShorthandProp) {
          return result;
        }

        var name = (this || _global).val;

        while ((this || _global).tkn & T$MemberOrCallExpression) {
          switch ((this || _global).tkn) {
            case T$Period:
              this.nextToken();

              if (!((this || _global).tkn & T$IdentifierOrKeyword)) {
                this.err();
              }

              name = (this || _global).val;
              this.nextToken();
              context = context & C$Primary | (context & (C$This | C$Scope)) << 1 | context & C$Member | (context & C$Keyed) >> 1 | (context & C$Call) >> 2;

              if ((this || _global).tkn === T$LParen) {
                continue;
              }

              if (context & C$Scope) {
                result = new AccessScope(name, result.ancestor);
              } else {
                result = new AccessMember(result, name);
              }

              continue;

            case T$LBracket:
              this.nextToken();
              context = C$Keyed;
              result = new AccessKeyed(result, this.parseExpression());
              this.expect(T$RBracket);
              break;

            case T$LParen:
              this.nextToken();
              var args = [];

              while ((this || _global).tkn !== T$RParen) {
                args.push(this.parseExpression());

                if (!this.opt(T$Comma)) {
                  break;
                }
              }

              this.expect(T$RParen);

              if (context & C$Scope) {
                result = new CallScope(name, args, result.ancestor);
              } else if (context & (C$Member | C$Primary)) {
                result = new CallMember(result, name, args);
              } else {
                result = new CallFunction(result, args);
              }

              context = C$Call;
              break;

            case T$TemplateTail:
              result = new LiteralTemplate([(this || _global).val], [], [(this || _global).raw], result);
              this.nextToken();
              break;

            case T$TemplateContinuation:
              result = this.parseTemplate(context | C$Tagged, result);
          }
        }

        return result;
      };

      ParserImplementation.prototype.parseTemplate = function parseTemplate(context, func) {
        var cooked = [(this || _global).val];
        var raw = context & C$Tagged ? [(this || _global).raw] : undefined;
        this.expect(T$TemplateContinuation);
        var expressions = [this.parseExpression()];

        while (((this || _global).tkn = this.scanTemplateTail()) !== T$TemplateTail) {
          cooked.push((this || _global).val);

          if (context & C$Tagged) {
            raw.push((this || _global).raw);
          }

          this.expect(T$TemplateContinuation);
          expressions.push(this.parseExpression());
        }

        cooked.push((this || _global).val);

        if (context & C$Tagged) {
          raw.push((this || _global).raw);
        }

        this.nextToken();
        return new LiteralTemplate(cooked, expressions, raw, func);
      };

      ParserImplementation.prototype.nextToken = function nextToken() {
        while ((this || _global).idx < (this || _global).len) {
          if ((this || _global).ch <= 0x20) {
            this.next();
            continue;
          }

          (this || _global).start = (this || _global).idx;

          if ((this || _global).ch === 0x24 || (this || _global).ch >= 0x61 && (this || _global).ch <= 0x7A) {
            (this || _global).tkn = this.scanIdentifier();
            return;
          }

          if (((this || _global).tkn = CharScanners[(this || _global).ch](this || _global)) !== null) {
            return;
          }
        }

        (this || _global).tkn = T$EOF;
      };

      ParserImplementation.prototype.next = function next() {
        return (this || _global).ch = (this || _global).src.charCodeAt(++(this || _global).idx);
      };

      ParserImplementation.prototype.scanIdentifier = function scanIdentifier() {
        while (AsciiIdParts.has(this.next()) || (this || _global).ch > 0x7F && IdParts[(this || _global).ch]) {}

        return KeywordLookup[(this || _global).val = (this || _global).raw] || T$Identifier;
      };

      ParserImplementation.prototype.scanNumber = function scanNumber(isFloat) {
        if (isFloat) {
          (this || _global).val = 0;
        } else {
          (this || _global).val = (this || _global).ch - 0x30;

          while (this.next() <= 0x39 && (this || _global).ch >= 0x30) {
            (this || _global).val = (this || _global).val * 10 + (this || _global).ch - 0x30;
          }
        }

        if (isFloat || (this || _global).ch === 0x2E) {
          if (!isFloat) {
            this.next();
          }

          var start = (this || _global).idx;
          var value = (this || _global).ch - 0x30;

          while (this.next() <= 0x39 && (this || _global).ch >= 0x30) {
            value = value * 10 + (this || _global).ch - 0x30;
          }

          (this || _global).val = (this || _global).val + value / Math.pow(10, (this || _global).idx - start);
        }

        if ((this || _global).ch === 0x65 || (this || _global).ch === 0x45) {
          var _start = (this || _global).idx;
          this.next();

          if ((this || _global).ch === 0x2D || (this || _global).ch === 0x2B) {
            this.next();
          }

          if (!((this || _global).ch >= 0x30 && (this || _global).ch <= 0x39)) {
            (this || _global).idx = _start;
            this.err('Invalid exponent');
          }

          while (this.next() <= 0x39 && (this || _global).ch >= 0x30) {}

          (this || _global).val = parseFloat((this || _global).src.slice((this || _global).start, (this || _global).idx));
        }

        return T$NumericLiteral;
      };

      ParserImplementation.prototype.scanString = function scanString() {
        var quote = (this || _global).ch;
        this.next();
        var buffer = void 0;
        var marker = (this || _global).idx;

        while ((this || _global).ch !== quote) {
          if ((this || _global).ch === 0x5C) {
            if (!buffer) {
              buffer = [];
            }

            buffer.push((this || _global).src.slice(marker, (this || _global).idx));
            this.next();

            var _unescaped = void 0;

            if ((this || _global).ch === 0x75) {
              this.next();

              if ((this || _global).idx + 4 < (this || _global).len) {
                var hex = (this || _global).src.slice((this || _global).idx, (this || _global).idx + 4);

                if (!/[A-Z0-9]{4}/i.test(hex)) {
                  this.err('Invalid unicode escape [\\u' + hex + ']');
                }

                _unescaped = parseInt(hex, 16);
                (this || _global).idx += 4;
                (this || _global).ch = (this || _global).src.charCodeAt((this || _global).idx);
              } else {
                this.err();
              }
            } else {
              _unescaped = unescape((this || _global).ch);
              this.next();
            }

            buffer.push(fromCharCode(_unescaped));
            marker = (this || _global).idx;
          } else if ((this || _global).ch === 0 || (this || _global).idx >= (this || _global).len) {
            this.err('Unterminated quote');
          } else {
            this.next();
          }
        }

        var last = (this || _global).src.slice(marker, (this || _global).idx);

        this.next();
        var unescaped = last;

        if (buffer !== null && buffer !== undefined) {
          buffer.push(last);
          unescaped = buffer.join('');
        }

        (this || _global).val = unescaped;
        return T$StringLiteral;
      };

      ParserImplementation.prototype.scanTemplate = function scanTemplate() {
        var tail = true;
        var result = '';

        while (this.next() !== 0x60) {
          if ((this || _global).ch === 0x24) {
            if ((this || _global).idx + 1 < (this || _global).len && (this || _global).src.charCodeAt((this || _global).idx + 1) === 0x7B) {
              (this || _global).idx++;
              tail = false;
              break;
            } else {
              result += '$';
            }
          } else if ((this || _global).ch === 0x5C) {
            result += fromCharCode(unescape(this.next()));
          } else if ((this || _global).ch === 0 || (this || _global).idx >= (this || _global).len) {
            this.err('Unterminated template literal');
          } else {
            result += fromCharCode((this || _global).ch);
          }
        }

        this.next();
        (this || _global).val = result;

        if (tail) {
          return T$TemplateTail;
        }

        return T$TemplateContinuation;
      };

      ParserImplementation.prototype.scanTemplateTail = function scanTemplateTail() {
        if ((this || _global).idx >= (this || _global).len) {
          this.err('Unterminated template');
        }

        (this || _global).idx--;
        return this.scanTemplate();
      };

      ParserImplementation.prototype.err = function err() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unexpected token ' + (this || _global).raw;
        var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (this || _global).start;
        throw new Error('Parser Error: ' + message + ' at column ' + column + ' in expression [' + (this || _global).src + ']');
      };

      ParserImplementation.prototype.opt = function opt(token) {
        if ((this || _global).tkn === token) {
          this.nextToken();
          return true;
        }

        return false;
      };

      ParserImplementation.prototype.expect = function expect(token) {
        if ((this || _global).tkn === token) {
          this.nextToken();
        } else {
          this.err('Missing expected token ' + TokenValues[token & T$TokenMask], (this || _global).idx);
        }
      };

      return ParserImplementation;
    }();

    function unescape(code) {
      switch (code) {
        case 0x66:
          return 0xC;

        case 0x6E:
          return 0xA;

        case 0x72:
          return 0xD;

        case 0x74:
          return 0x9;

        case 0x76:
          return 0xB;

        default:
          return code;
      }
    }

    var C$This = 1 << 10;
    var C$Scope = 1 << 11;
    var C$Member = 1 << 12;
    var C$Keyed = 1 << 13;
    var C$Call = 1 << 14;
    var C$Primary = 1 << 15;
    var C$ShorthandProp = 1 << 16;
    var C$Tagged = 1 << 17;
    var C$Ancestor = (1 << 9) - 1;
    var T$TokenMask = (1 << 6) - 1;
    var T$PrecShift = 6;
    var T$Precedence = 7 << T$PrecShift;
    var T$ExpressionTerminal = 1 << 11;
    var T$ClosingToken = 1 << 12;
    var T$OpeningToken = 1 << 13;
    var T$AccessScopeTerminal = 1 << 14;
    var T$Keyword = 1 << 15;
    var T$EOF = 1 << 16 | T$AccessScopeTerminal | T$ExpressionTerminal;
    var T$Identifier = 1 << 17;
    var T$IdentifierOrKeyword = T$Identifier | T$Keyword;
    var T$Literal = 1 << 18;
    var T$NumericLiteral = 1 << 19 | T$Literal;
    var T$StringLiteral = 1 << 20 | T$Literal;
    var T$BinaryOp = 1 << 21;
    var T$UnaryOp = 1 << 22;
    var T$MemberExpression = 1 << 23;
    var T$MemberOrCallExpression = 1 << 24;
    var T$TemplateTail = 1 << 25 | T$MemberOrCallExpression;
    var T$TemplateContinuation = 1 << 26 | T$MemberOrCallExpression;
    var T$FalseKeyword = 0 | T$Keyword | T$Literal;
    var T$TrueKeyword = 1 | T$Keyword | T$Literal;
    var T$NullKeyword = 2 | T$Keyword | T$Literal;
    var T$UndefinedKeyword = 3 | T$Keyword | T$Literal;
    var T$ThisScope = 4 | T$IdentifierOrKeyword;
    var T$ParentScope = 5 | T$IdentifierOrKeyword;
    var T$LParen = 6 | T$OpeningToken | T$AccessScopeTerminal | T$MemberOrCallExpression;
    var T$LBrace = 7 | T$OpeningToken;
    var T$Period = 8 | T$MemberExpression | T$MemberOrCallExpression;
    var T$RBrace = 9 | T$AccessScopeTerminal | T$ClosingToken | T$ExpressionTerminal;
    var T$RParen = 10 | T$AccessScopeTerminal | T$ClosingToken | T$ExpressionTerminal;
    var T$Comma = 11 | T$AccessScopeTerminal;
    var T$LBracket = 12 | T$OpeningToken | T$AccessScopeTerminal | T$MemberExpression | T$MemberOrCallExpression;
    var T$RBracket = 13 | T$ClosingToken | T$ExpressionTerminal;
    var T$Colon = 14 | T$AccessScopeTerminal;
    var T$Question = 15;
    var T$Ampersand = 18 | T$AccessScopeTerminal;
    var T$Bar = 19 | T$AccessScopeTerminal;
    var T$BarBar = 20 | 1 << T$PrecShift | T$BinaryOp;
    var T$AmpersandAmpersand = 21 | 2 << T$PrecShift | T$BinaryOp;
    var T$Caret = 22 | 3 << T$PrecShift | T$BinaryOp;
    var T$EqEq = 23 | 4 << T$PrecShift | T$BinaryOp;
    var T$BangEq = 24 | 4 << T$PrecShift | T$BinaryOp;
    var T$EqEqEq = 25 | 4 << T$PrecShift | T$BinaryOp;
    var T$BangEqEq = 26 | 4 << T$PrecShift | T$BinaryOp;
    var T$Lt = 27 | 5 << T$PrecShift | T$BinaryOp;
    var T$Gt = 28 | 5 << T$PrecShift | T$BinaryOp;
    var T$LtEq = 29 | 5 << T$PrecShift | T$BinaryOp;
    var T$GtEq = 30 | 5 << T$PrecShift | T$BinaryOp;
    var T$InKeyword = 31 | 5 << T$PrecShift | T$BinaryOp | T$Keyword;
    var T$InstanceOfKeyword = 32 | 5 << T$PrecShift | T$BinaryOp | T$Keyword;
    var T$Plus = 33 | 6 << T$PrecShift | T$BinaryOp | T$UnaryOp;
    var T$Minus = 34 | 6 << T$PrecShift | T$BinaryOp | T$UnaryOp;
    var T$TypeofKeyword = 35 | T$UnaryOp | T$Keyword;
    var T$VoidKeyword = 36 | T$UnaryOp | T$Keyword;
    var T$Star = 37 | 7 << T$PrecShift | T$BinaryOp;
    var T$Percent = 38 | 7 << T$PrecShift | T$BinaryOp;
    var T$Slash = 39 | 7 << T$PrecShift | T$BinaryOp;
    var T$Eq = 40;
    var T$Bang = 41 | T$UnaryOp;
    var KeywordLookup = Object.create(null);
    KeywordLookup.true = T$TrueKeyword;
    KeywordLookup.null = T$NullKeyword;
    KeywordLookup.false = T$FalseKeyword;
    KeywordLookup.undefined = T$UndefinedKeyword;
    KeywordLookup.$this = T$ThisScope;
    KeywordLookup.$parent = T$ParentScope;
    KeywordLookup.in = T$InKeyword;
    KeywordLookup.instanceof = T$InstanceOfKeyword;
    KeywordLookup.typeof = T$TypeofKeyword;
    KeywordLookup.void = T$VoidKeyword;
    var TokenValues = [false, true, null, undefined, '$this', '$parent', '(', '{', '.', '}', ')', ',', '[', ']', ':', '?', '\'', '"', '&', '|', '||', '&&', '^', '==', '!=', '===', '!==', '<', '>', '<=', '>=', 'in', 'instanceof', '+', '-', 'typeof', 'void', '*', '%', '/', '=', '!'];
    var codes = {
      AsciiIdPart: [0x24, 0, 0x30, 0x3A, 0x41, 0x5B, 0x5F, 0, 0x61, 0x7B],
      IdStart: [0x24, 0, 0x41, 0x5B, 0x5F, 0, 0x61, 0x7B, 0xAA, 0, 0xBA, 0, 0xC0, 0xD7, 0xD8, 0xF7, 0xF8, 0x2B9, 0x2E0, 0x2E5, 0x1D00, 0x1D26, 0x1D2C, 0x1D5D, 0x1D62, 0x1D66, 0x1D6B, 0x1D78, 0x1D79, 0x1DBF, 0x1E00, 0x1F00, 0x2071, 0, 0x207F, 0, 0x2090, 0x209D, 0x212A, 0x212C, 0x2132, 0, 0x214E, 0, 0x2160, 0x2189, 0x2C60, 0x2C80, 0xA722, 0xA788, 0xA78B, 0xA7AF, 0xA7B0, 0xA7B8, 0xA7F7, 0xA800, 0xAB30, 0xAB5B, 0xAB5C, 0xAB65, 0xFB00, 0xFB07, 0xFF21, 0xFF3B, 0xFF41, 0xFF5B],
      Digit: [0x30, 0x3A],
      Skip: [0, 0x21, 0x7F, 0xA1]
    };

    function decompress(lookup, set, compressed, value) {
      var rangeCount = compressed.length;

      for (var i = 0; i < rangeCount; i += 2) {
        var start = compressed[i];
        var end = compressed[i + 1];
        end = end > 0 ? end : start + 1;

        if (lookup) {
          var j = start;

          while (j < end) {
            lookup[j] = value;
            j++;
          }
        }

        if (set) {
          for (var ch = start; ch < end; ch++) {
            set.add(ch);
          }
        }
      }
    }

    function returnToken(token) {
      return function (p) {
        p.next();
        return token;
      };
    }

    function unexpectedCharacter(p) {
      p.err('Unexpected character [' + fromCharCode(p.ch) + ']');
      return null;
    }

    var AsciiIdParts = new Set();
    decompress(null, AsciiIdParts, codes.AsciiIdPart, true);
    var IdParts = new Uint8Array(0xFFFF);
    decompress(IdParts, null, codes.IdStart, 1);
    decompress(IdParts, null, codes.Digit, 1);
    var CharScanners = new Array(0xFFFF);
    var ci = 0;

    while (ci < 0xFFFF) {
      CharScanners[ci] = unexpectedCharacter;
      ci++;
    }

    decompress(CharScanners, null, codes.Skip, function (p) {
      p.next();
      return null;
    });
    decompress(CharScanners, null, codes.IdStart, function (p) {
      return p.scanIdentifier();
    });
    decompress(CharScanners, null, codes.Digit, function (p) {
      return p.scanNumber(false);
    });

    CharScanners[0x22] = CharScanners[0x27] = function (p) {
      return p.scanString();
    };

    CharScanners[0x60] = function (p) {
      return p.scanTemplate();
    };

    CharScanners[0x21] = function (p) {
      if (p.next() !== 0x3D) {
        return T$Bang;
      }

      if (p.next() !== 0x3D) {
        return T$BangEq;
      }

      p.next();
      return T$BangEqEq;
    };

    CharScanners[0x3D] = function (p) {
      if (p.next() !== 0x3D) {
        return T$Eq;
      }

      if (p.next() !== 0x3D) {
        return T$EqEq;
      }

      p.next();
      return T$EqEqEq;
    };

    CharScanners[0x26] = function (p) {
      if (p.next() !== 0x26) {
        return T$Ampersand;
      }

      p.next();
      return T$AmpersandAmpersand;
    };

    CharScanners[0x7C] = function (p) {
      if (p.next() !== 0x7C) {
        return T$Bar;
      }

      p.next();
      return T$BarBar;
    };

    CharScanners[0x2E] = function (p) {
      if (p.next() <= 0x39 && p.ch >= 0x30) {
        return p.scanNumber(true);
      }

      return T$Period;
    };

    CharScanners[0x3C] = function (p) {
      if (p.next() !== 0x3D) {
        return T$Lt;
      }

      p.next();
      return T$LtEq;
    };

    CharScanners[0x3E] = function (p) {
      if (p.next() !== 0x3D) {
        return T$Gt;
      }

      p.next();
      return T$GtEq;
    };

    CharScanners[0x25] = returnToken(T$Percent);
    CharScanners[0x28] = returnToken(T$LParen);
    CharScanners[0x29] = returnToken(T$RParen);
    CharScanners[0x2A] = returnToken(T$Star);
    CharScanners[0x2B] = returnToken(T$Plus);
    CharScanners[0x2C] = returnToken(T$Comma);
    CharScanners[0x2D] = returnToken(T$Minus);
    CharScanners[0x2F] = returnToken(T$Slash);
    CharScanners[0x3A] = returnToken(T$Colon);
    CharScanners[0x3F] = returnToken(T$Question);
    CharScanners[0x5B] = returnToken(T$LBracket);
    CharScanners[0x5D] = returnToken(T$RBracket);
    CharScanners[0x5E] = returnToken(T$Caret);
    CharScanners[0x7B] = returnToken(T$LBrace);
    CharScanners[0x7D] = returnToken(T$RBrace);
    var mapProto = Map.prototype;

    function _getMapObserver(taskQueue, map) {
      return ModifyMapObserver.for(taskQueue, map);
    }

    exports.getMapObserver = _getMapObserver;

    var ModifyMapObserver = function (_ModifyCollectionObse2) {
      _inherits(ModifyMapObserver, _ModifyCollectionObse2);

      function ModifyMapObserver(taskQueue, map) {
        return _possibleConstructorReturn(this || _global, _ModifyCollectionObse2.call(this || _global, taskQueue, map));
      }

      ModifyMapObserver.for = function _for(taskQueue, map) {
        if (!('__map_observer__' in map)) {
          Reflect.defineProperty(map, '__map_observer__', {
            value: ModifyMapObserver.create(taskQueue, map),
            enumerable: false,
            configurable: false
          });
        }

        return map.__map_observer__;
      };

      ModifyMapObserver.create = function create(taskQueue, map) {
        var observer = new ModifyMapObserver(taskQueue, map);
        var proto = mapProto;

        if (proto.set !== map.set || proto.delete !== map.delete || proto.clear !== map.clear) {
          proto = {
            set: map.set,
            delete: map.delete,
            clear: map.clear
          };
        }

        map.set = function () {
          var hasValue = map.has(arguments[0]);
          var type = hasValue ? 'update' : 'add';
          var oldValue = map.get(arguments[0]);
          var methodCallResult = proto.set.apply(map, arguments);

          if (!hasValue || oldValue !== map.get(arguments[0])) {
            observer.addChangeRecord({
              type: type,
              object: map,
              key: arguments[0],
              oldValue: oldValue
            });
          }

          return methodCallResult;
        };

        map.delete = function () {
          var hasValue = map.has(arguments[0]);
          var oldValue = map.get(arguments[0]);
          var methodCallResult = proto.delete.apply(map, arguments);

          if (hasValue) {
            observer.addChangeRecord({
              type: 'delete',
              object: map,
              key: arguments[0],
              oldValue: oldValue
            });
          }

          return methodCallResult;
        };

        map.clear = function () {
          var methodCallResult = proto.clear.apply(map, arguments);
          observer.addChangeRecord({
            type: 'clear',
            object: map
          });
          return methodCallResult;
        };

        return observer;
      };

      return ModifyMapObserver;
    }(ModifyCollectionObserver);

    var emLogger = LogManager.getLogger('event-manager');

    function findOriginalEventTarget(event) {
      return event.composedPath && event.composedPath()[0] || event.deepPath && event.deepPath()[0] || event.path && event.path[0] || event.target;
    }

    function stopPropagation() {
      this.standardStopPropagation();
      (this || _global).propagationStopped = true;
    }

    function handleCapturedEvent(event) {
      event.propagationStopped = false;
      var target = findOriginalEventTarget(event);
      var orderedCallbacks = [];

      while (target) {
        if (target.capturedCallbacks) {
          var callback = target.capturedCallbacks[event.type];

          if (callback) {
            if (event.stopPropagation !== stopPropagation) {
              event.standardStopPropagation = event.stopPropagation;
              event.stopPropagation = stopPropagation;
            }

            orderedCallbacks.push(callback);
          }
        }

        target = target.parentNode;
      }

      for (var i = orderedCallbacks.length - 1; i >= 0 && !event.propagationStopped; i--) {
        var orderedCallback = orderedCallbacks[i];

        if ('handleEvent' in orderedCallback) {
          orderedCallback.handleEvent(event);
        } else {
          orderedCallback(event);
        }
      }
    }

    var CapturedHandlerEntry = function () {
      function CapturedHandlerEntry(eventName) {
        (this || _global).eventName = eventName;
        (this || _global).count = 0;
      }

      CapturedHandlerEntry.prototype.increment = function increment() {
        (this || _global).count++;

        if ((this || _global).count === 1) {
          _aureliaPal.DOM.addEventListener((this || _global).eventName, handleCapturedEvent, true);
        }
      };

      CapturedHandlerEntry.prototype.decrement = function decrement() {
        if ((this || _global).count === 0) {
          emLogger.warn('The same EventListener was disposed multiple times.');
        } else if (--(this || _global).count === 0) {
          _aureliaPal.DOM.removeEventListener((this || _global).eventName, handleCapturedEvent, true);
        }
      };

      return CapturedHandlerEntry;
    }();

    var DelegateHandlerEntry = function () {
      function DelegateHandlerEntry(eventName, eventManager) {
        (this || _global).eventName = eventName;
        (this || _global).count = 0;
        (this || _global).eventManager = eventManager;
      }

      DelegateHandlerEntry.prototype.handleEvent = function handleEvent(event) {
        event.propagationStopped = false;
        var target = findOriginalEventTarget(event);

        while (target && !event.propagationStopped) {
          if (target.delegatedCallbacks) {
            var callback = target.delegatedCallbacks[event.type];

            if (callback) {
              if (event.stopPropagation !== stopPropagation) {
                event.standardStopPropagation = event.stopPropagation;
                event.stopPropagation = stopPropagation;
              }

              if ('handleEvent' in callback) {
                callback.handleEvent(event);
              } else {
                callback(event);
              }
            }
          }

          var parent = target.parentNode;
          var shouldEscapeShadowRoot = (this || _global).eventManager.escapeShadowRoot && parent instanceof ShadowRoot;
          target = shouldEscapeShadowRoot ? parent.host : parent;
        }
      };

      DelegateHandlerEntry.prototype.increment = function increment() {
        (this || _global).count++;

        if ((this || _global).count === 1) {
          _aureliaPal.DOM.addEventListener((this || _global).eventName, this || _global, false);
        }
      };

      DelegateHandlerEntry.prototype.decrement = function decrement() {
        if ((this || _global).count === 0) {
          emLogger.warn('The same EventListener was disposed multiple times.');
        } else if (--(this || _global).count === 0) {
          _aureliaPal.DOM.removeEventListener((this || _global).eventName, this || _global, false);
        }
      };

      return DelegateHandlerEntry;
    }();

    var DelegationEntryHandler = function () {
      function DelegationEntryHandler(entry, lookup, targetEvent) {
        (this || _global).entry = entry;
        (this || _global).lookup = lookup;
        (this || _global).targetEvent = targetEvent;
      }

      DelegationEntryHandler.prototype.dispose = function dispose() {
        if ((this || _global).lookup[(this || _global).targetEvent]) {
          (this || _global).entry.decrement();

          (this || _global).lookup[(this || _global).targetEvent] = null;
        } else {
          emLogger.warn('Calling .dispose() on already disposed eventListener');
        }
      };

      return DelegationEntryHandler;
    }();

    var EventHandler = function () {
      function EventHandler(target, targetEvent, callback) {
        (this || _global).target = target;
        (this || _global).targetEvent = targetEvent;
        (this || _global).callback = callback;
      }

      EventHandler.prototype.dispose = function dispose() {
        (this || _global).target.removeEventListener((this || _global).targetEvent, (this || _global).callback);
      };

      return EventHandler;
    }();

    var DefaultEventStrategy = function () {
      function DefaultEventStrategy(eventManager) {
        (this || _global).delegatedHandlers = {};
        (this || _global).capturedHandlers = {};
        (this || _global).eventManager = eventManager;
      }

      DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, strategy, disposable) {
        var delegatedHandlers = void 0;
        var capturedHandlers = void 0;
        var handlerEntry = void 0;

        if (strategy === delegationStrategy.bubbling) {
          delegatedHandlers = (this || _global).delegatedHandlers;
          handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent, (this || _global).eventManager));
          var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});

          if (!delegatedCallbacks[targetEvent]) {
            handlerEntry.increment();
          } else {
            emLogger.warn('Overriding previous callback for event listener', {
              event: targetEvent,
              callback: callback,
              previousCallback: delegatedCallbacks[targetEvent]
            });
          }

          delegatedCallbacks[targetEvent] = callback;

          if (disposable === true) {
            return new DelegationEntryHandler(handlerEntry, delegatedCallbacks, targetEvent);
          }

          return function () {
            handlerEntry.decrement();
            delegatedCallbacks[targetEvent] = null;
          };
        }

        if (strategy === delegationStrategy.capturing) {
          capturedHandlers = (this || _global).capturedHandlers;
          handlerEntry = capturedHandlers[targetEvent] || (capturedHandlers[targetEvent] = new CapturedHandlerEntry(targetEvent));
          var capturedCallbacks = target.capturedCallbacks || (target.capturedCallbacks = {});

          if (!capturedCallbacks[targetEvent]) {
            handlerEntry.increment();
          } else {
            emLogger.error('already have a callback for event', {
              event: targetEvent,
              callback: callback
            });
          }

          capturedCallbacks[targetEvent] = callback;

          if (disposable === true) {
            return new DelegationEntryHandler(handlerEntry, capturedCallbacks, targetEvent);
          }

          return function () {
            handlerEntry.decrement();
            capturedCallbacks[targetEvent] = null;
          };
        }

        target.addEventListener(targetEvent, callback);

        if (disposable === true) {
          return new EventHandler(target, targetEvent, callback);
        }

        return function () {
          target.removeEventListener(targetEvent, callback);
        };
      };

      return DefaultEventStrategy;
    }();

    var delegationStrategy = exports.delegationStrategy = {
      none: 0,
      capturing: 1,
      bubbling: 2
    };

    var EventManager = exports.EventManager = function () {
      function EventManager() {
        var escapeShadowRoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        (this || _global).elementHandlerLookup = {};
        (this || _global).eventStrategyLookup = {};
        (this || _global).escapeShadowRoot = escapeShadowRoot;
        this.registerElementConfig({
          tagName: 'input',
          properties: {
            value: ['change', 'input'],
            checked: ['change', 'input'],
            files: ['change', 'input']
          }
        });
        this.registerElementConfig({
          tagName: 'textarea',
          properties: {
            value: ['change', 'input']
          }
        });
        this.registerElementConfig({
          tagName: 'select',
          properties: {
            value: ['change']
          }
        });
        this.registerElementConfig({
          tagName: 'content editable',
          properties: {
            value: ['change', 'input', 'blur', 'keyup', 'paste']
          }
        });
        this.registerElementConfig({
          tagName: 'scrollable element',
          properties: {
            scrollTop: ['scroll'],
            scrollLeft: ['scroll']
          }
        });
        (this || _global).defaultEventStrategy = new DefaultEventStrategy(this || _global);
      }

      EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
        var tagName = config.tagName.toLowerCase();
        var properties = config.properties;
        var propertyName = void 0;
        var lookup = (this || _global).elementHandlerLookup[tagName] = {};

        for (propertyName in properties) {
          if (properties.hasOwnProperty(propertyName)) {
            lookup[propertyName] = properties[propertyName];
          }
        }
      };

      EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
        (this || _global).eventStrategyLookup[eventName] = strategy;
      };

      EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
        var tagName = void 0;
        var lookup = (this || _global).elementHandlerLookup;

        if (target.tagName) {
          tagName = target.tagName.toLowerCase();

          if (lookup[tagName] && lookup[tagName][propertyName]) {
            return new EventSubscriber(lookup[tagName][propertyName]);
          }

          if (propertyName === 'textContent' || propertyName === 'innerHTML') {
            return new EventSubscriber(lookup['content editable'].value);
          }

          if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
            return new EventSubscriber(lookup['scrollable element'][propertyName]);
          }
        }

        return null;
      };

      EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callbackOrListener, delegate, disposable) {
        return ((this || _global).eventStrategyLookup[targetEvent] || (this || _global).defaultEventStrategy).subscribe(target, targetEvent, callbackOrListener, delegate, disposable);
      };

      return EventManager;
    }();

    var EventSubscriber = exports.EventSubscriber = function () {
      function EventSubscriber(events) {
        (this || _global).events = events;
        (this || _global).element = null;
        (this || _global).handler = null;
      }

      EventSubscriber.prototype.subscribe = function subscribe(element, callbackOrListener) {
        (this || _global).element = element;
        (this || _global).handler = callbackOrListener;
        var events = (this || _global).events;

        for (var i = 0, ii = events.length; ii > i; ++i) {
          element.addEventListener(events[i], callbackOrListener);
        }
      };

      EventSubscriber.prototype.dispose = function dispose() {
        if ((this || _global).element === null) {
          return;
        }

        var element = (this || _global).element;
        var callbackOrListener = (this || _global).handler;
        var events = (this || _global).events;

        for (var i = 0, ii = events.length; ii > i; ++i) {
          element.removeEventListener(events[i], callbackOrListener);
        }

        (this || _global).element = (this || _global).handler = null;
      };

      return EventSubscriber;
    }();

    var DirtyChecker = exports.DirtyChecker = function () {
      function DirtyChecker() {
        (this || _global).tracked = [];
        (this || _global).checkDelay = 120;
      }

      DirtyChecker.prototype.addProperty = function addProperty(property) {
        var tracked = (this || _global).tracked;
        tracked.push(property);

        if (tracked.length === 1) {
          this.scheduleDirtyCheck();
        }
      };

      DirtyChecker.prototype.removeProperty = function removeProperty(property) {
        var tracked = (this || _global).tracked;
        tracked.splice(tracked.indexOf(property), 1);
      };

      DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
        var _this22 = this || _global;

        setTimeout(function () {
          return _this22.check();
        }, (this || _global).checkDelay);
      };

      DirtyChecker.prototype.check = function check() {
        var tracked = (this || _global).tracked;
        var i = tracked.length;

        while (i--) {
          var current = tracked[i];

          if (current.isDirty()) {
            current.call();
          }
        }

        if (tracked.length) {
          this.scheduleDirtyCheck();
        }
      };

      return DirtyChecker;
    }();

    var DirtyCheckProperty = exports.DirtyCheckProperty = (_dec5 = subscriberCollection(), _dec5(_class5 = function () {
      function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
        (this || _global).dirtyChecker = dirtyChecker;
        (this || _global).obj = obj;
        (this || _global).propertyName = propertyName;
      }

      DirtyCheckProperty.prototype.getValue = function getValue() {
        return (this || _global).obj[(this || _global).propertyName];
      };

      DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
        (this || _global).obj[(this || _global).propertyName] = newValue;
      };

      DirtyCheckProperty.prototype.call = function call() {
        var oldValue = (this || _global).oldValue;
        var newValue = this.getValue();
        this.callSubscribers(newValue, oldValue);
        (this || _global).oldValue = newValue;
      };

      DirtyCheckProperty.prototype.isDirty = function isDirty() {
        return (this || _global).oldValue !== (this || _global).obj[(this || _global).propertyName];
      };

      DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          (this || _global).oldValue = this.getValue();

          (this || _global).dirtyChecker.addProperty(this || _global);
        }

        this.addSubscriber(context, callable);
      };

      DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          (this || _global).dirtyChecker.removeProperty(this || _global);
        }
      };

      return DirtyCheckProperty;
    }()) || _class5);
    var logger = LogManager.getLogger('property-observation');
    var propertyAccessor = exports.propertyAccessor = {
      getValue: function getValue(obj, propertyName) {
        return obj[propertyName];
      },
      setValue: function setValue(value, obj, propertyName) {
        obj[propertyName] = value;
      }
    };

    var PrimitiveObserver = exports.PrimitiveObserver = function () {
      function PrimitiveObserver(primitive, propertyName) {
        (this || _global).doNotCache = true;
        (this || _global).primitive = primitive;
        (this || _global).propertyName = propertyName;
      }

      PrimitiveObserver.prototype.getValue = function getValue() {
        return (this || _global).primitive[(this || _global).propertyName];
      };

      PrimitiveObserver.prototype.setValue = function setValue() {
        var type = _typeof((this || _global).primitive);

        throw new Error('The ' + (this || _global).propertyName + ' property of a ' + type + ' (' + (this || _global).primitive + ') cannot be assigned.');
      };

      PrimitiveObserver.prototype.subscribe = function subscribe() {};

      PrimitiveObserver.prototype.unsubscribe = function unsubscribe() {};

      return PrimitiveObserver;
    }();

    var SetterObserver = exports.SetterObserver = (_dec6 = subscriberCollection(), _dec6(_class7 = function () {
      function SetterObserver(taskQueue, obj, propertyName) {
        (this || _global).taskQueue = taskQueue;
        (this || _global).obj = obj;
        (this || _global).propertyName = propertyName;
        (this || _global).queued = false;
        (this || _global).observing = false;
      }

      SetterObserver.prototype.getValue = function getValue() {
        return (this || _global).obj[(this || _global).propertyName];
      };

      SetterObserver.prototype.setValue = function setValue(newValue) {
        (this || _global).obj[(this || _global).propertyName] = newValue;
      };

      SetterObserver.prototype.getterValue = function getterValue() {
        return (this || _global).currentValue;
      };

      SetterObserver.prototype.setterValue = function setterValue(newValue) {
        var oldValue = (this || _global).currentValue;

        if (oldValue !== newValue) {
          if (!(this || _global).queued) {
            (this || _global).oldValue = oldValue;
            (this || _global).queued = true;

            (this || _global).taskQueue.queueMicroTask(this || _global);
          }

          (this || _global).currentValue = newValue;
        }
      };

      SetterObserver.prototype.call = function call() {
        var oldValue = (this || _global).oldValue;
        var newValue = (this || _global).oldValue = (this || _global).currentValue;
        (this || _global).queued = false;
        this.callSubscribers(newValue, oldValue);
      };

      SetterObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!(this || _global).observing) {
          this.convertProperty();
        }

        this.addSubscriber(context, callable);
      };

      SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      SetterObserver.prototype.convertProperty = function convertProperty() {
        (this || _global).observing = true;
        (this || _global).currentValue = (this || _global).obj[(this || _global).propertyName];
        (this || _global).setValue = (this || _global).setterValue;
        (this || _global).getValue = (this || _global).getterValue;

        if (!Reflect.defineProperty((this || _global).obj, (this || _global).propertyName, {
          configurable: true,
          enumerable: (this || _global).propertyName in (this || _global).obj ? (this || _global).obj.propertyIsEnumerable((this || _global).propertyName) : true,
          get: (this || _global).getValue.bind(this || _global),
          set: (this || _global).setValue.bind(this || _global)
        })) {
          logger.warn('Cannot observe property \'' + (this || _global).propertyName + '\' of object', (this || _global).obj);
        }
      };

      return SetterObserver;
    }()) || _class7);

    var XLinkAttributeObserver = exports.XLinkAttributeObserver = function () {
      function XLinkAttributeObserver(element, propertyName, attributeName) {
        (this || _global).element = element;
        (this || _global).propertyName = propertyName;
        (this || _global).attributeName = attributeName;
      }

      XLinkAttributeObserver.prototype.getValue = function getValue() {
        return (this || _global).element.getAttributeNS('http://www.w3.org/1999/xlink', (this || _global).attributeName);
      };

      XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
        return (this || _global).element.setAttributeNS('http://www.w3.org/1999/xlink', (this || _global).attributeName, newValue);
      };

      XLinkAttributeObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + (this || _global).element.nodeName + '" element\'s "' + (this || _global).propertyName + '" property is not supported.');
      };

      return XLinkAttributeObserver;
    }();

    var dataAttributeAccessor = exports.dataAttributeAccessor = {
      getValue: function getValue(obj, propertyName) {
        return obj.getAttribute(propertyName);
      },
      setValue: function setValue(value, obj, propertyName) {
        if (value === null || value === undefined) {
          obj.removeAttribute(propertyName);
        } else {
          obj.setAttribute(propertyName, value);
        }
      }
    };

    var DataAttributeObserver = exports.DataAttributeObserver = function () {
      function DataAttributeObserver(element, propertyName) {
        (this || _global).element = element;
        (this || _global).propertyName = propertyName;
      }

      DataAttributeObserver.prototype.getValue = function getValue() {
        return (this || _global).element.getAttribute((this || _global).propertyName);
      };

      DataAttributeObserver.prototype.setValue = function setValue(newValue) {
        if (newValue === null || newValue === undefined) {
          return (this || _global).element.removeAttribute((this || _global).propertyName);
        }

        return (this || _global).element.setAttribute((this || _global).propertyName, newValue);
      };

      DataAttributeObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + (this || _global).element.nodeName + '" element\'s "' + (this || _global).propertyName + '" property is not supported.');
      };

      return DataAttributeObserver;
    }();

    var StyleObserver = exports.StyleObserver = function () {
      function StyleObserver(element, propertyName) {
        (this || _global).element = element;
        (this || _global).propertyName = propertyName;
        (this || _global).styles = null;
        (this || _global).version = 0;
      }

      StyleObserver.prototype.getValue = function getValue() {
        return (this || _global).element.style.cssText;
      };

      StyleObserver.prototype._setProperty = function _setProperty(style, value) {
        var priority = '';

        if (value !== null && value !== undefined && typeof value.indexOf === 'function' && value.indexOf('!important') !== -1) {
          priority = 'important';
          value = value.replace('!important', '');
        }

        (this || _global).element.style.setProperty(style, value, priority);
      };

      StyleObserver.prototype.setValue = function setValue(newValue) {
        var styles = (this || _global).styles || {};
        var style = void 0;
        var version = (this || _global).version;

        if (newValue !== null && newValue !== undefined) {
          if (newValue instanceof Object) {
            var value = void 0;

            for (style in newValue) {
              if (newValue.hasOwnProperty(style)) {
                value = newValue[style];
                style = style.replace(/([A-Z])/g, function (m) {
                  return '-' + m.toLowerCase();
                });
                styles[style] = version;

                this._setProperty(style, value);
              }
            }
          } else if (newValue.length) {
            var rx = /\s*([\w\-]+)\s*:\s*((?:(?:[\w\-]+\(\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[\w\-]+\(\s*(?:^"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^\)]*)\),?|[^\)]*)\),?|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^;]*),?\s*)+);?/g;
            var pair = void 0;

            while ((pair = rx.exec(newValue)) !== null) {
              style = pair[1];

              if (!style) {
                continue;
              }

              styles[style] = version;

              this._setProperty(style, pair[2]);
            }
          }
        }

        (this || _global).styles = styles;
        (this || _global).version += 1;

        if (version === 0) {
          return;
        }

        version -= 1;

        for (style in styles) {
          if (!styles.hasOwnProperty(style) || styles[style] !== version) {
            continue;
          }

          (this || _global).element.style.removeProperty(style);
        }
      };

      StyleObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + (this || _global).element.nodeName + '" element\'s "' + (this || _global).propertyName + '" property is not supported.');
      };

      return StyleObserver;
    }();

    var ValueAttributeObserver = exports.ValueAttributeObserver = (_dec7 = subscriberCollection(), _dec7(_class8 = function () {
      function ValueAttributeObserver(element, propertyName, handler) {
        (this || _global).element = element;
        (this || _global).propertyName = propertyName;
        (this || _global).handler = handler;

        if (propertyName === 'files') {
          (this || _global).setValue = function () {};
        }
      }

      ValueAttributeObserver.prototype.getValue = function getValue() {
        return (this || _global).element[(this || _global).propertyName];
      };

      ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
        newValue = newValue === undefined || newValue === null ? '' : newValue;

        if ((this || _global).element[(this || _global).propertyName] !== newValue) {
          (this || _global).element[(this || _global).propertyName] = newValue;
          this.notify();
        }
      };

      ValueAttributeObserver.prototype.notify = function notify() {
        var oldValue = (this || _global).oldValue;
        var newValue = this.getValue();
        this.callSubscribers(newValue, oldValue);
        (this || _global).oldValue = newValue;
      };

      ValueAttributeObserver.prototype.handleEvent = function handleEvent() {
        this.notify();
      };

      ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          (this || _global).oldValue = this.getValue();

          (this || _global).handler.subscribe((this || _global).element, this || _global);
        }

        this.addSubscriber(context, callable);
      };

      ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          (this || _global).handler.dispose();
        }
      };

      return ValueAttributeObserver;
    }()) || _class8);
    var checkedArrayContext = 'CheckedObserver:array';
    var checkedValueContext = 'CheckedObserver:value';
    var CheckedObserver = exports.CheckedObserver = (_dec8 = subscriberCollection(), _dec8(_class9 = function () {
      function CheckedObserver(element, handler, observerLocator) {
        (this || _global).element = element;
        (this || _global).handler = handler;
        (this || _global).observerLocator = observerLocator;
      }

      CheckedObserver.prototype.getValue = function getValue() {
        return (this || _global).value;
      };

      CheckedObserver.prototype.setValue = function setValue(newValue) {
        if ((this || _global).initialSync && (this || _global).value === newValue) {
          return;
        }

        if ((this || _global).arrayObserver) {
          (this || _global).arrayObserver.unsubscribe(checkedArrayContext, this || _global);

          (this || _global).arrayObserver = null;
        }

        if ((this || _global).element.type === 'checkbox' && Array.isArray(newValue)) {
          (this || _global).arrayObserver = (this || _global).observerLocator.getArrayObserver(newValue);

          (this || _global).arrayObserver.subscribe(checkedArrayContext, this || _global);
        }

        (this || _global).oldValue = (this || _global).value;
        (this || _global).value = newValue;
        this.synchronizeElement();
        this.notify();

        if (!(this || _global).initialSync) {
          (this || _global).initialSync = true;

          (this || _global).observerLocator.taskQueue.queueMicroTask(this || _global);
        }
      };

      CheckedObserver.prototype.call = function call(context, splices) {
        this.synchronizeElement();

        if (!(this || _global).valueObserver) {
          (this || _global).valueObserver = (this || _global).element.__observers__.model || (this || _global).element.__observers__.value;

          if ((this || _global).valueObserver) {
            (this || _global).valueObserver.subscribe(checkedValueContext, this || _global);
          }
        }
      };

      CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
        var value = (this || _global).value;
        var element = (this || _global).element;
        var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
        var isRadio = element.type === 'radio';

        var matcher = element.matcher || function (a, b) {
          return a === b;
        };

        element.checked = isRadio && !!matcher(value, elementValue) || !isRadio && value === true || !isRadio && Array.isArray(value) && value.findIndex(function (item) {
          return !!matcher(item, elementValue);
        }) !== -1;
      };

      CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
        var value = (this || _global).value;
        var element = (this || _global).element;
        var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
        var index = void 0;

        var matcher = element.matcher || function (a, b) {
          return a === b;
        };

        if (element.type === 'checkbox') {
          if (Array.isArray(value)) {
            index = value.findIndex(function (item) {
              return !!matcher(item, elementValue);
            });

            if (element.checked && index === -1) {
              value.push(elementValue);
            } else if (!element.checked && index !== -1) {
              value.splice(index, 1);
            }

            return;
          }

          value = element.checked;
        } else if (element.checked) {
          value = elementValue;
        } else {
          return;
        }

        (this || _global).oldValue = (this || _global).value;
        (this || _global).value = value;
        this.notify();
      };

      CheckedObserver.prototype.notify = function notify() {
        var oldValue = (this || _global).oldValue;
        var newValue = (this || _global).value;

        if (newValue === oldValue) {
          return;
        }

        this.callSubscribers(newValue, oldValue);
      };

      CheckedObserver.prototype.handleEvent = function handleEvent() {
        this.synchronizeValue();
      };

      CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          (this || _global).handler.subscribe((this || _global).element, this || _global);
        }

        this.addSubscriber(context, callable);
      };

      CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          (this || _global).handler.dispose();
        }
      };

      CheckedObserver.prototype.unbind = function unbind() {
        if ((this || _global).arrayObserver) {
          (this || _global).arrayObserver.unsubscribe(checkedArrayContext, this || _global);

          (this || _global).arrayObserver = null;
        }

        if ((this || _global).valueObserver) {
          (this || _global).valueObserver.unsubscribe(checkedValueContext, this || _global);
        }
      };

      return CheckedObserver;
    }()) || _class9);
    var selectArrayContext = 'SelectValueObserver:array';
    var SelectValueObserver = exports.SelectValueObserver = (_dec9 = subscriberCollection(), _dec9(_class10 = function () {
      function SelectValueObserver(element, handler, observerLocator) {
        (this || _global).element = element;
        (this || _global).handler = handler;
        (this || _global).observerLocator = observerLocator;
      }

      SelectValueObserver.prototype.getValue = function getValue() {
        return (this || _global).value;
      };

      SelectValueObserver.prototype.setValue = function setValue(newValue) {
        if (newValue !== null && newValue !== undefined && (this || _global).element.multiple && !Array.isArray(newValue)) {
          throw new Error('Only null or Array instances can be bound to a multi-select.');
        }

        if ((this || _global).value === newValue) {
          return;
        }

        if ((this || _global).arrayObserver) {
          (this || _global).arrayObserver.unsubscribe(selectArrayContext, this || _global);

          (this || _global).arrayObserver = null;
        }

        if (Array.isArray(newValue)) {
          (this || _global).arrayObserver = (this || _global).observerLocator.getArrayObserver(newValue);

          (this || _global).arrayObserver.subscribe(selectArrayContext, this || _global);
        }

        (this || _global).oldValue = (this || _global).value;
        (this || _global).value = newValue;
        this.synchronizeOptions();
        this.notify();

        if (!(this || _global).initialSync) {
          (this || _global).initialSync = true;

          (this || _global).observerLocator.taskQueue.queueMicroTask(this || _global);
        }
      };

      SelectValueObserver.prototype.call = function call(context, splices) {
        this.synchronizeOptions();
      };

      SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
        var value = (this || _global).value;
        var isArray = void 0;

        if (Array.isArray(value)) {
          isArray = true;
        }

        var options = (this || _global).element.options;
        var i = options.length;

        var matcher = (this || _global).element.matcher || function (a, b) {
          return a === b;
        };

        var _loop = function _loop() {
          var option = options.item(i);
          var optionValue = option.hasOwnProperty('model') ? option.model : option.value;

          if (isArray) {
            option.selected = value.findIndex(function (item) {
              return !!matcher(optionValue, item);
            }) !== -1;
            return 'continue';
          }

          option.selected = !!matcher(optionValue, value);
        };

        while (i--) {
          var _ret = _loop();

          if (_ret === 'continue') continue;
        }
      };

      SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
        var _this23 = this || _global;

        var options = (this || _global).element.options;
        var count = 0;
        var value = [];

        for (var i = 0, ii = options.length; i < ii; i++) {
          var _option = options.item(i);

          if (!_option.selected) {
            continue;
          }

          value.push(_option.hasOwnProperty('model') ? _option.model : _option.value);
          count++;
        }

        if ((this || _global).element.multiple) {
          if (Array.isArray((this || _global).value)) {
            var _ret2 = function () {
              var matcher = _this23.element.matcher || function (a, b) {
                return a === b;
              };

              var i = 0;

              var _loop2 = function _loop2() {
                var a = _this23.value[i];

                if (value.findIndex(function (b) {
                  return matcher(a, b);
                }) === -1) {
                  _this23.value.splice(i, 1);
                } else {
                  i++;
                }
              };

              while (i < _this23.value.length) {
                _loop2();
              }

              i = 0;

              var _loop3 = function _loop3() {
                var a = value[i];

                if (_this23.value.findIndex(function (b) {
                  return matcher(a, b);
                }) === -1) {
                  _this23.value.push(a);
                }

                i++;
              };

              while (i < value.length) {
                _loop3();
              }

              return {
                v: void 0
              };
            }();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
          }
        } else {
          if (count === 0) {
            value = null;
          } else {
            value = value[0];
          }
        }

        if (value !== (this || _global).value) {
          (this || _global).oldValue = (this || _global).value;
          (this || _global).value = value;
          this.notify();
        }
      };

      SelectValueObserver.prototype.notify = function notify() {
        var oldValue = (this || _global).oldValue;
        var newValue = (this || _global).value;
        this.callSubscribers(newValue, oldValue);
      };

      SelectValueObserver.prototype.handleEvent = function handleEvent() {
        this.synchronizeValue();
      };

      SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          (this || _global).handler.subscribe((this || _global).element, this || _global);
        }

        this.addSubscriber(context, callable);
      };

      SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          (this || _global).handler.dispose();
        }
      };

      SelectValueObserver.prototype.bind = function bind() {
        var _this24 = this || _global;

        (this || _global).domObserver = _aureliaPal.DOM.createMutationObserver(function () {
          _this24.synchronizeOptions();

          _this24.synchronizeValue();
        });

        (this || _global).domObserver.observe((this || _global).element, {
          childList: true,
          subtree: true,
          characterData: true
        });
      };

      SelectValueObserver.prototype.unbind = function unbind() {
        (this || _global).domObserver.disconnect();

        (this || _global).domObserver = null;

        if ((this || _global).arrayObserver) {
          (this || _global).arrayObserver.unsubscribe(selectArrayContext, this || _global);

          (this || _global).arrayObserver = null;
        }
      };

      return SelectValueObserver;
    }()) || _class10);

    var ClassObserver = exports.ClassObserver = function () {
      function ClassObserver(element) {
        (this || _global).element = element;
        (this || _global).doNotCache = true;
        (this || _global).value = '';
        (this || _global).version = 0;
      }

      ClassObserver.prototype.getValue = function getValue() {
        return (this || _global).value;
      };

      ClassObserver.prototype.setValue = function setValue(newValue) {
        var nameIndex = (this || _global).nameIndex || {};
        var version = (this || _global).version;
        var names = void 0;
        var name = void 0;

        if (newValue !== null && newValue !== undefined && newValue.length) {
          names = newValue.split(/\s+/);

          for (var i = 0, length = names.length; i < length; i++) {
            name = names[i];

            if (name === '') {
              continue;
            }

            nameIndex[name] = version;

            (this || _global).element.classList.add(name);
          }
        }

        (this || _global).value = newValue;
        (this || _global).nameIndex = nameIndex;
        (this || _global).version += 1;

        if (version === 0) {
          return;
        }

        version -= 1;

        for (name in nameIndex) {
          if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
            continue;
          }

          (this || _global).element.classList.remove(name);
        }
      };

      ClassObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + (this || _global).element.nodeName + '" element\'s "class" property is not supported.');
      };

      return ClassObserver;
    }();

    function hasDeclaredDependencies(descriptor) {
      return !!(descriptor && descriptor.get && descriptor.get.dependencies);
    }

    function declarePropertyDependencies(ctor, propertyName, dependencies) {
      var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
      descriptor.get.dependencies = dependencies;
    }

    function computedFrom() {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return function (target, key, descriptor) {
        descriptor.get.dependencies = rest;
        return descriptor;
      };
    }

    var ComputedExpression = exports.ComputedExpression = function (_Expression19) {
      _inherits(ComputedExpression, _Expression19);

      function ComputedExpression(name, dependencies) {
        var _this25 = _possibleConstructorReturn(this || _global, _Expression19.call(this || _global));

        _this25.name = name;
        _this25.dependencies = dependencies;
        _this25.isAssignable = true;
        return _this25;
      }

      ComputedExpression.prototype.evaluate = function evaluate(scope, lookupFunctions) {
        return scope.bindingContext[(this || _global).name];
      };

      ComputedExpression.prototype.assign = function assign(scope, value) {
        scope.bindingContext[(this || _global).name] = value;
      };

      ComputedExpression.prototype.accept = function accept(visitor) {
        throw new Error('not implemented');
      };

      ComputedExpression.prototype.connect = function connect(binding, scope) {
        var dependencies = (this || _global).dependencies;
        var i = dependencies.length;

        while (i--) {
          dependencies[i].connect(binding, scope);
        }
      };

      return ComputedExpression;
    }(Expression);

    function createComputedObserver(obj, propertyName, descriptor, observerLocator) {
      var dependencies = descriptor.get.dependencies;

      if (!(dependencies instanceof ComputedExpression)) {
        var i = dependencies.length;

        while (i--) {
          dependencies[i] = observerLocator.parser.parse(dependencies[i]);
        }

        dependencies = descriptor.get.dependencies = new ComputedExpression(propertyName, dependencies);
      }

      var scope = {
        bindingContext: obj,
        overrideContext: createOverrideContext(obj)
      };
      return new ExpressionObserver(scope, dependencies, observerLocator);
    }

    var svgElements = void 0;
    var svgPresentationElements = void 0;
    var svgPresentationAttributes = void 0;
    var svgAnalyzer = void 0;

    if (typeof FEATURE_NO_SVG === 'undefined') {
      svgElements = {
        a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
        feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
        feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
        feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
        feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
        image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
        linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
        marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
        mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
        switch: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
        text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
        vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
      };
      svgPresentationElements = {
        'a': true,
        'altGlyph': true,
        'animate': true,
        'animateColor': true,
        'circle': true,
        'clipPath': true,
        'defs': true,
        'ellipse': true,
        'feBlend': true,
        'feColorMatrix': true,
        'feComponentTransfer': true,
        'feComposite': true,
        'feConvolveMatrix': true,
        'feDiffuseLighting': true,
        'feDisplacementMap': true,
        'feFlood': true,
        'feGaussianBlur': true,
        'feImage': true,
        'feMerge': true,
        'feMorphology': true,
        'feOffset': true,
        'feSpecularLighting': true,
        'feTile': true,
        'feTurbulence': true,
        'filter': true,
        'font': true,
        'foreignObject': true,
        'g': true,
        'glyph': true,
        'glyphRef': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'marker': true,
        'mask': true,
        'missing-glyph': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'switch': true,
        'symbol': true,
        'text': true,
        'textPath': true,
        'tref': true,
        'tspan': true,
        'use': true
      };
      svgPresentationAttributes = {
        'alignment-baseline': true,
        'baseline-shift': true,
        'clip-path': true,
        'clip-rule': true,
        'clip': true,
        'color-interpolation-filters': true,
        'color-interpolation': true,
        'color-profile': true,
        'color-rendering': true,
        'color': true,
        'cursor': true,
        'direction': true,
        'display': true,
        'dominant-baseline': true,
        'enable-background': true,
        'fill-opacity': true,
        'fill-rule': true,
        'fill': true,
        'filter': true,
        'flood-color': true,
        'flood-opacity': true,
        'font-family': true,
        'font-size-adjust': true,
        'font-size': true,
        'font-stretch': true,
        'font-style': true,
        'font-variant': true,
        'font-weight': true,
        'glyph-orientation-horizontal': true,
        'glyph-orientation-vertical': true,
        'image-rendering': true,
        'kerning': true,
        'letter-spacing': true,
        'lighting-color': true,
        'marker-end': true,
        'marker-mid': true,
        'marker-start': true,
        'mask': true,
        'opacity': true,
        'overflow': true,
        'pointer-events': true,
        'shape-rendering': true,
        'stop-color': true,
        'stop-opacity': true,
        'stroke-dasharray': true,
        'stroke-dashoffset': true,
        'stroke-linecap': true,
        'stroke-linejoin': true,
        'stroke-miterlimit': true,
        'stroke-opacity': true,
        'stroke-width': true,
        'stroke': true,
        'text-anchor': true,
        'text-decoration': true,
        'text-rendering': true,
        'unicode-bidi': true,
        'visibility': true,
        'word-spacing': true,
        'writing-mode': true
      };

      var createElement = function createElement(html) {
        var div = _aureliaPal.DOM.createElement('div');

        div.innerHTML = html;
        return div.firstChild;
      };

      svgAnalyzer = function () {
        function SVGAnalyzer() {
          if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
            elements.altglyph = elements.altGlyph;
            delete elements.altGlyph;
            elements.altglyphdef = elements.altGlyphDef;
            delete elements.altGlyphDef;
            elements.altglyphitem = elements.altGlyphItem;
            delete elements.altGlyphItem;
            elements.glyphref = elements.glyphRef;
            delete elements.glyphRef;
          }
        }

        SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
          return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
        };

        return SVGAnalyzer;
      }();
    }

    var elements = exports.elements = svgElements;
    var presentationElements = exports.presentationElements = svgPresentationElements;
    var presentationAttributes = exports.presentationAttributes = svgPresentationAttributes;

    var SVGAnalyzer = exports.SVGAnalyzer = svgAnalyzer || function () {
      function _class11() {}

      _class11.prototype.isStandardSvgAttribute = function isStandardSvgAttribute() {
        return false;
      };

      return _class11;
    }();

    var ObserverLocator = exports.ObserverLocator = (_temp = _class12 = function () {
      function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer, parser) {
        (this || _global).taskQueue = taskQueue;
        (this || _global).eventManager = eventManager;
        (this || _global).dirtyChecker = dirtyChecker;
        (this || _global).svgAnalyzer = svgAnalyzer;
        (this || _global).parser = parser;
        (this || _global).adapters = [];
        (this || _global).logger = LogManager.getLogger('observer-locator');
      }

      ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
        var observersLookup = obj.__observers__;
        var observer = void 0;

        if (observersLookup && propertyName in observersLookup) {
          return observersLookup[propertyName];
        }

        observer = this.createPropertyObserver(obj, propertyName);

        if (!observer.doNotCache) {
          if (observersLookup === undefined) {
            observersLookup = this.getOrCreateObserversLookup(obj);
          }

          observersLookup[propertyName] = observer;
        }

        return observer;
      };

      ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
        return obj.__observers__ || this.createObserversLookup(obj);
      };

      ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
        var value = {};

        if (!Reflect.defineProperty(obj, '__observers__', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: value
        })) {
          (this || _global).logger.warn('Cannot add observers to object', obj);
        }

        return value;
      };

      ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
        (this || _global).adapters.push(adapter);
      };

      ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
        for (var i = 0, ii = (this || _global).adapters.length; i < ii; i++) {
          var adapter = (this || _global).adapters[i];
          var observer = adapter.getObserver(obj, propertyName, descriptor);

          if (observer) {
            return observer;
          }
        }

        return null;
      };

      ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
        var descriptor = void 0;
        var handler = void 0;
        var xlinkResult = void 0;

        if (!(obj instanceof Object)) {
          return new PrimitiveObserver(obj, propertyName);
        }

        if (obj instanceof _aureliaPal.DOM.Element) {
          if (propertyName === 'class') {
            return new ClassObserver(obj);
          }

          if (propertyName === 'style' || propertyName === 'css') {
            return new StyleObserver(obj, propertyName);
          }

          handler = (this || _global).eventManager.getElementHandler(obj, propertyName);

          if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
            return new SelectValueObserver(obj, handler, this || _global);
          }

          if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
            return new CheckedObserver(obj, handler, this || _global);
          }

          if (handler) {
            return new ValueAttributeObserver(obj, propertyName, handler);
          }

          xlinkResult = /^xlink:(.+)$/.exec(propertyName);

          if (xlinkResult) {
            return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
          }

          if (propertyName === 'role' && (obj instanceof _aureliaPal.DOM.Element || obj instanceof _aureliaPal.DOM.SVGElement) || /^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && (this || _global).svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
            return new DataAttributeObserver(obj, propertyName);
          }
        }

        descriptor = Object.getPropertyDescriptor(obj, propertyName);

        if (hasDeclaredDependencies(descriptor)) {
          return createComputedObserver(obj, propertyName, descriptor, this || _global);
        }

        if (descriptor) {
          var existingGetterOrSetter = descriptor.get || descriptor.set;

          if (existingGetterOrSetter) {
            if (existingGetterOrSetter.getObserver) {
              return existingGetterOrSetter.getObserver(obj);
            }

            var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);

            if (adapterObserver) {
              return adapterObserver;
            }

            return new DirtyCheckProperty((this || _global).dirtyChecker, obj, propertyName);
          }
        }

        if (obj instanceof Array) {
          if (propertyName === 'length') {
            return this.getArrayObserver(obj).getLengthObserver();
          }

          return new DirtyCheckProperty((this || _global).dirtyChecker, obj, propertyName);
        } else if (obj instanceof Map) {
          if (propertyName === 'size') {
            return this.getMapObserver(obj).getLengthObserver();
          }

          return new DirtyCheckProperty((this || _global).dirtyChecker, obj, propertyName);
        } else if (obj instanceof Set) {
          if (propertyName === 'size') {
            return this.getSetObserver(obj).getLengthObserver();
          }

          return new DirtyCheckProperty((this || _global).dirtyChecker, obj, propertyName);
        }

        return new SetterObserver((this || _global).taskQueue, obj, propertyName);
      };

      ObserverLocator.prototype.getAccessor = function getAccessor(obj, propertyName) {
        if (obj instanceof _aureliaPal.DOM.Element) {
          if (propertyName === 'class' || propertyName === 'style' || propertyName === 'css' || propertyName === 'value' && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'select') || propertyName === 'checked' && obj.tagName.toLowerCase() === 'input' || propertyName === 'model' && obj.tagName.toLowerCase() === 'input' || /^xlink:.+$/.exec(propertyName)) {
            return this.getObserver(obj, propertyName);
          }

          if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && (this || _global).svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName) || obj.tagName.toLowerCase() === 'img' && propertyName === 'src' || obj.tagName.toLowerCase() === 'a' && propertyName === 'href') {
            return dataAttributeAccessor;
          }
        }

        return propertyAccessor;
      };

      ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
        return _getArrayObserver((this || _global).taskQueue, array);
      };

      ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
        return _getMapObserver((this || _global).taskQueue, map);
      };

      ObserverLocator.prototype.getSetObserver = function getSetObserver(set) {
        return _getSetObserver((this || _global).taskQueue, set);
      };

      return ObserverLocator;
    }(), _class12.inject = [_aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer, Parser], _temp);

    var ObjectObservationAdapter = exports.ObjectObservationAdapter = function () {
      function ObjectObservationAdapter() {}

      ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
      };

      return ObjectObservationAdapter;
    }();

    var BindingExpression = exports.BindingExpression = function () {
      function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, lookupFunctions, attribute) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).targetProperty = targetProperty;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).mode = mode;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).attribute = attribute;
        (this || _global).discrete = false;
      }

      BindingExpression.prototype.createBinding = function createBinding(target) {
        return new Binding((this || _global).observerLocator, (this || _global).sourceExpression, target, (this || _global).targetProperty, (this || _global).mode, (this || _global).lookupFunctions);
      };

      return BindingExpression;
    }();

    var Binding = exports.Binding = (_dec10 = connectable(), _dec10(_class13 = function () {
      function Binding(observerLocator, sourceExpression, target, targetProperty, mode, lookupFunctions) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).target = target;
        (this || _global).targetProperty = targetProperty;
        (this || _global).mode = mode;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      Binding.prototype.updateTarget = function updateTarget(value) {
        (this || _global).targetObserver.setValue(value, (this || _global).target, (this || _global).targetProperty);
      };

      Binding.prototype.updateSource = function updateSource(value) {
        (this || _global).sourceExpression.assign((this || _global).source, value, (this || _global).lookupFunctions);
      };

      Binding.prototype.call = function call(context, newValue, oldValue) {
        if (!(this || _global).isBound) {
          return;
        }

        if (context === sourceContext) {
          oldValue = (this || _global).targetObserver.getValue((this || _global).target, (this || _global).targetProperty);
          newValue = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions);

          if (newValue !== oldValue) {
            this.updateTarget(newValue);
          }

          if ((this || _global).mode !== bindingMode.oneTime) {
            (this || _global)._version++;

            (this || _global).sourceExpression.connect(this || _global, (this || _global).source);

            this.unobserve(false);
          }

          return;
        }

        if (context === targetContext) {
          if (newValue !== (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions)) {
            this.updateSource(newValue);
          }

          return;
        }

        throw new Error('Unexpected call context ' + context);
      };

      Binding.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;

        if ((this || _global).sourceExpression.bind) {
          (this || _global).sourceExpression.bind(this || _global, source, (this || _global).lookupFunctions);
        }

        var mode = (this || _global).mode;

        if (!(this || _global).targetObserver) {
          var method = mode === bindingMode.twoWay || mode === bindingMode.fromView ? 'getObserver' : 'getAccessor';
          (this || _global).targetObserver = (this || _global).observerLocator[method]((this || _global).target, (this || _global).targetProperty);
        }

        if ('bind' in (this || _global).targetObserver) {
          (this || _global).targetObserver.bind();
        }

        if ((this || _global).mode !== bindingMode.fromView) {
          var value = (this || _global).sourceExpression.evaluate(source, (this || _global).lookupFunctions);

          this.updateTarget(value);
        }

        if (mode === bindingMode.oneTime) {
          return;
        } else if (mode === bindingMode.toView) {
          enqueueBindingConnect(this || _global);
        } else if (mode === bindingMode.twoWay) {
          (this || _global).sourceExpression.connect(this || _global, source);

          (this || _global).targetObserver.subscribe(targetContext, this || _global);
        } else if (mode === bindingMode.fromView) {
          (this || _global).targetObserver.subscribe(targetContext, this || _global);
        }
      };

      Binding.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;

        if ((this || _global).sourceExpression.unbind) {
          (this || _global).sourceExpression.unbind(this || _global, (this || _global).source);
        }

        (this || _global).source = null;

        if ('unbind' in (this || _global).targetObserver) {
          (this || _global).targetObserver.unbind();
        }

        if ((this || _global).targetObserver.unsubscribe) {
          (this || _global).targetObserver.unsubscribe(targetContext, this || _global);
        }

        this.unobserve(true);
      };

      Binding.prototype.connect = function connect(evaluate) {
        if (!(this || _global).isBound) {
          return;
        }

        if (evaluate) {
          var value = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions);

          this.updateTarget(value);
        }

        (this || _global).sourceExpression.connect(this || _global, (this || _global).source);
      };

      return Binding;
    }()) || _class13);

    var CallExpression = exports.CallExpression = function () {
      function CallExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).targetProperty = targetProperty;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      CallExpression.prototype.createBinding = function createBinding(target) {
        return new Call((this || _global).observerLocator, (this || _global).sourceExpression, target, (this || _global).targetProperty, (this || _global).lookupFunctions);
      };

      return CallExpression;
    }();

    var Call = exports.Call = function () {
      function Call(observerLocator, sourceExpression, target, targetProperty, lookupFunctions) {
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).target = target;
        (this || _global).targetProperty = observerLocator.getObserver(target, targetProperty);
        (this || _global).lookupFunctions = lookupFunctions;
      }

      Call.prototype.callSource = function callSource($event) {
        var overrideContext = (this || _global).source.overrideContext;
        Object.assign(overrideContext, $event);
        overrideContext.$event = $event;
        var mustEvaluate = true;

        var result = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions, mustEvaluate);

        delete overrideContext.$event;

        for (var prop in $event) {
          delete overrideContext[prop];
        }

        return result;
      };

      Call.prototype.bind = function bind(source) {
        var _this26 = this || _global;

        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;

        if ((this || _global).sourceExpression.bind) {
          (this || _global).sourceExpression.bind(this || _global, source, (this || _global).lookupFunctions);
        }

        (this || _global).targetProperty.setValue(function ($event) {
          return _this26.callSource($event);
        });
      };

      Call.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;

        if ((this || _global).sourceExpression.unbind) {
          (this || _global).sourceExpression.unbind(this || _global, (this || _global).source);
        }

        (this || _global).source = null;

        (this || _global).targetProperty.setValue(null);
      };

      return Call;
    }();

    var ValueConverterResource = exports.ValueConverterResource = function () {
      function ValueConverterResource(name) {
        (this || _global).name = name;
      }

      ValueConverterResource.convention = function convention(name) {
        if (name.endsWith('ValueConverter')) {
          return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
        }
      };

      ValueConverterResource.prototype.initialize = function initialize(container, target) {
        (this || _global).instance = container.get(target);
      };

      ValueConverterResource.prototype.register = function register(registry, name) {
        registry.registerValueConverter(name || (this || _global).name, (this || _global).instance);
      };

      ValueConverterResource.prototype.load = function load(container, target) {};

      return ValueConverterResource;
    }();

    function valueConverter(nameOrTarget) {
      if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function (target) {
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
        };
      }

      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
    }

    var BindingBehaviorResource = exports.BindingBehaviorResource = function () {
      function BindingBehaviorResource(name) {
        (this || _global).name = name;
      }

      BindingBehaviorResource.convention = function convention(name) {
        if (name.endsWith('BindingBehavior')) {
          return new BindingBehaviorResource(camelCase(name.substring(0, name.length - 15)));
        }
      };

      BindingBehaviorResource.prototype.initialize = function initialize(container, target) {
        (this || _global).instance = container.get(target);
      };

      BindingBehaviorResource.prototype.register = function register(registry, name) {
        registry.registerBindingBehavior(name || (this || _global).name, (this || _global).instance);
      };

      BindingBehaviorResource.prototype.load = function load(container, target) {};

      return BindingBehaviorResource;
    }();

    function bindingBehavior(nameOrTarget) {
      if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function (target) {
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(nameOrTarget), target);
        };
      }

      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(), nameOrTarget);
    }

    var ListenerExpression = exports.ListenerExpression = function () {
      function ListenerExpression(eventManager, targetEvent, sourceExpression, delegationStrategy, preventDefault, lookupFunctions) {
        (this || _global).eventManager = eventManager;
        (this || _global).targetEvent = targetEvent;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).delegationStrategy = delegationStrategy;
        (this || _global).discrete = true;
        (this || _global).preventDefault = preventDefault;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      ListenerExpression.prototype.createBinding = function createBinding(target) {
        return new Listener((this || _global).eventManager, (this || _global).targetEvent, (this || _global).delegationStrategy, (this || _global).sourceExpression, target, (this || _global).preventDefault, (this || _global).lookupFunctions);
      };

      return ListenerExpression;
    }();

    var Listener = exports.Listener = function () {
      function Listener(eventManager, targetEvent, delegationStrategy, sourceExpression, target, preventDefault, lookupFunctions) {
        (this || _global).eventManager = eventManager;
        (this || _global).targetEvent = targetEvent;
        (this || _global).delegationStrategy = delegationStrategy;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).target = target;
        (this || _global).preventDefault = preventDefault;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      Listener.prototype.callSource = function callSource(event) {
        var overrideContext = (this || _global).source.overrideContext;
        overrideContext.$event = event;
        var mustEvaluate = true;

        var result = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions, mustEvaluate);

        delete overrideContext.$event;

        if (result !== true && (this || _global).preventDefault) {
          event.preventDefault();
        }

        return result;
      };

      Listener.prototype.handleEvent = function handleEvent(event) {
        this.callSource(event);
      };

      Listener.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;

        if ((this || _global).sourceExpression.bind) {
          (this || _global).sourceExpression.bind(this || _global, source, (this || _global).lookupFunctions);
        }

        (this || _global)._handler = (this || _global).eventManager.addEventListener((this || _global).target, (this || _global).targetEvent, this || _global, (this || _global).delegationStrategy, true);
      };

      Listener.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;

        if ((this || _global).sourceExpression.unbind) {
          (this || _global).sourceExpression.unbind(this || _global, (this || _global).source);
        }

        (this || _global).source = null;

        (this || _global)._handler.dispose();

        (this || _global)._handler = null;
      };

      return Listener;
    }();

    function getAU(element) {
      var au = element.au;

      if (au === undefined) {
        throw new Error('No Aurelia APIs are defined for the element: "' + element.tagName + '".');
      }

      return au;
    }

    var NameExpression = exports.NameExpression = function () {
      function NameExpression(sourceExpression, apiName, lookupFunctions) {
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).apiName = apiName;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).discrete = true;
      }

      NameExpression.prototype.createBinding = function createBinding(target) {
        return new NameBinder((this || _global).sourceExpression, NameExpression.locateAPI(target, (this || _global).apiName), (this || _global).lookupFunctions);
      };

      NameExpression.locateAPI = function locateAPI(element, apiName) {
        switch (apiName) {
          case 'element':
            return element;

          case 'controller':
            return getAU(element).controller;

          case 'view-model':
            return getAU(element).controller.viewModel;

          case 'view':
            return getAU(element).controller.view;

          default:
            var target = getAU(element)[apiName];

            if (target === undefined) {
              throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
            }

            return target.viewModel;
        }
      };

      return NameExpression;
    }();

    var NameBinder = function () {
      function NameBinder(sourceExpression, target, lookupFunctions) {
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).target = target;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      NameBinder.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;

        if ((this || _global).sourceExpression.bind) {
          (this || _global).sourceExpression.bind(this || _global, source, (this || _global).lookupFunctions);
        }

        (this || _global).sourceExpression.assign((this || _global).source, (this || _global).target, (this || _global).lookupFunctions);
      };

      NameBinder.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;

        if ((this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions) === (this || _global).target) {
          (this || _global).sourceExpression.assign((this || _global).source, null, (this || _global).lookupFunctions);
        }

        if ((this || _global).sourceExpression.unbind) {
          (this || _global).sourceExpression.unbind(this || _global, (this || _global).source);
        }

        (this || _global).source = null;
      };

      return NameBinder;
    }();

    var LookupFunctions = {
      bindingBehaviors: function bindingBehaviors(name) {
        return null;
      },
      valueConverters: function valueConverters(name) {
        return null;
      }
    };
    var BindingEngine = exports.BindingEngine = (_temp2 = _class14 = function () {
      function BindingEngine(observerLocator, parser) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).parser = parser;
      }

      BindingEngine.prototype.createBindingExpression = function createBindingExpression(targetProperty, sourceExpression) {
        var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bindingMode.toView;
        var lookupFunctions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LookupFunctions;
        return new BindingExpression((this || _global).observerLocator, targetProperty, (this || _global).parser.parse(sourceExpression), mode, lookupFunctions);
      };

      BindingEngine.prototype.propertyObserver = function propertyObserver(obj, propertyName) {
        var _this27 = this || _global;

        return {
          subscribe: function subscribe(callback) {
            var observer = _this27.observerLocator.getObserver(obj, propertyName);

            observer.subscribe(callback);
            return {
              dispose: function dispose() {
                return observer.unsubscribe(callback);
              }
            };
          }
        };
      };

      BindingEngine.prototype.collectionObserver = function collectionObserver(collection) {
        var _this28 = this || _global;

        return {
          subscribe: function subscribe(callback) {
            var observer = void 0;

            if (collection instanceof Array) {
              observer = _this28.observerLocator.getArrayObserver(collection);
            } else if (collection instanceof Map) {
              observer = _this28.observerLocator.getMapObserver(collection);
            } else if (collection instanceof Set) {
              observer = _this28.observerLocator.getSetObserver(collection);
            } else {
              throw new Error('collection must be an instance of Array, Map or Set.');
            }

            observer.subscribe(callback);
            return {
              dispose: function dispose() {
                return observer.unsubscribe(callback);
              }
            };
          }
        };
      };

      BindingEngine.prototype.expressionObserver = function expressionObserver(bindingContext, expression) {
        var scope = {
          bindingContext: bindingContext,
          overrideContext: createOverrideContext(bindingContext)
        };
        return new ExpressionObserver(scope, (this || _global).parser.parse(expression), (this || _global).observerLocator, LookupFunctions);
      };

      BindingEngine.prototype.parseExpression = function parseExpression(expression) {
        return (this || _global).parser.parse(expression);
      };

      BindingEngine.prototype.registerAdapter = function registerAdapter(adapter) {
        (this || _global).observerLocator.addAdapter(adapter);
      };

      return BindingEngine;
    }(), _class14.inject = [ObserverLocator, Parser], _temp2);
    var setProto = Set.prototype;

    function _getSetObserver(taskQueue, set) {
      return ModifySetObserver.for(taskQueue, set);
    }

    exports.getSetObserver = _getSetObserver;

    var ModifySetObserver = function (_ModifyCollectionObse3) {
      _inherits(ModifySetObserver, _ModifyCollectionObse3);

      function ModifySetObserver(taskQueue, set) {
        return _possibleConstructorReturn(this || _global, _ModifyCollectionObse3.call(this || _global, taskQueue, set));
      }

      ModifySetObserver.for = function _for(taskQueue, set) {
        if (!('__set_observer__' in set)) {
          Reflect.defineProperty(set, '__set_observer__', {
            value: ModifySetObserver.create(taskQueue, set),
            enumerable: false,
            configurable: false
          });
        }

        return set.__set_observer__;
      };

      ModifySetObserver.create = function create(taskQueue, set) {
        var observer = new ModifySetObserver(taskQueue, set);
        var proto = setProto;

        if (proto.add !== set.add || proto.delete !== set.delete || proto.clear !== set.clear) {
          proto = {
            add: set.add,
            delete: set.delete,
            clear: set.clear
          };
        }

        set.add = function () {
          var type = 'add';
          var oldSize = set.size;
          var methodCallResult = proto.add.apply(set, arguments);
          var hasValue = set.size === oldSize;

          if (!hasValue) {
            observer.addChangeRecord({
              type: type,
              object: set,
              value: Array.from(set).pop()
            });
          }

          return methodCallResult;
        };

        set.delete = function () {
          var hasValue = set.has(arguments[0]);
          var methodCallResult = proto.delete.apply(set, arguments);

          if (hasValue) {
            observer.addChangeRecord({
              type: 'delete',
              object: set,
              value: arguments[0]
            });
          }

          return methodCallResult;
        };

        set.clear = function () {
          var methodCallResult = proto.clear.apply(set, arguments);
          observer.addChangeRecord({
            type: 'clear',
            object: set
          });
          return methodCallResult;
        };

        return observer;
      };

      return ModifySetObserver;
    }(ModifyCollectionObserver);

    function observable(targetOrConfig, key, descriptor) {
      function deco(target, key, descriptor, config) {
        var isClassDecorator = key === undefined;

        if (isClassDecorator) {
          target = target.prototype;
          key = typeof config === 'string' ? config : config.name;
        }

        var innerPropertyName = '_' + key;
        var innerPropertyDescriptor = {
          configurable: true,
          enumerable: false,
          writable: true
        };
        var callbackName = config && config.changeHandler || key + 'Changed';

        if (descriptor) {
          if (typeof descriptor.initializer === 'function') {
            innerPropertyDescriptor.value = descriptor.initializer();
          }
        } else {
          descriptor = {};
        }

        if (!('enumerable' in descriptor)) {
          descriptor.enumerable = true;
        }

        delete descriptor.value;
        delete descriptor.writable;
        delete descriptor.initializer;
        Reflect.defineProperty(target, innerPropertyName, innerPropertyDescriptor);

        descriptor.get = function () {
          return (this || _global)[innerPropertyName];
        };

        descriptor.set = function (newValue) {
          var oldValue = (this || _global)[innerPropertyName];

          if (newValue === oldValue) {
            return;
          }

          (this || _global)[innerPropertyName] = newValue;
          Reflect.defineProperty(this || _global, innerPropertyName, {
            enumerable: false
          });

          if ((this || _global)[callbackName]) {
            this[callbackName](newValue, oldValue, key);
          }
        };

        descriptor.get.dependencies = [innerPropertyName];

        if (isClassDecorator) {
          Reflect.defineProperty(target, key, descriptor);
        } else {
          return descriptor;
        }
      }

      if (key === undefined) {
        return function (t, k, d) {
          return deco(t, k, d, targetOrConfig);
        };
      }

      return deco(targetOrConfig, key, descriptor);
    }

    var signals = {};

    function connectBindingToSignal(binding, name) {
      if (!signals.hasOwnProperty(name)) {
        signals[name] = 0;
      }

      binding.observeProperty(signals, name);
    }

    function signalBindings(name) {
      if (signals.hasOwnProperty(name)) {
        signals[name]++;
      }
    }
  });
  return exports;
}