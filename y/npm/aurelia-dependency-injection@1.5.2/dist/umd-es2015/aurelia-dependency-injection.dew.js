import { dew as _indexDewDew } from "aurelia-metadata/index.dew.js";
import { dew as _indexDew2Dew } from "aurelia-pal/index.dew.js";
var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  (function (global, factory) {
    typeof exports === 'object' && true ? factory(exports, _indexDewDew(), _indexDew2Dew()) : typeof define === 'function' && define.amd ? define(['exports', 'aurelia-metadata', 'aurelia-pal'], factory) : factory((global.au = global.au || {}, global.au.validation = {}), global.aureliaMetadata, global.au);
  })(exports, function (exports, aureliaMetadata, aureliaPal) {
    'use strict';
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
      See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function isInjectable(potentialTarget) {
      return !!potentialTarget;
    }

    function autoinject(potentialTarget) {
      const deco = target => {
        if (!target.hasOwnProperty('inject')) {
          target.inject = (aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target) || _emptyParameters).slice();

          if (target.inject && target.inject.length > 0) {
            if (target.inject[target.inject.length - 1] === Object) {
              target.inject.splice(-1, 1);
            }
          }
        }
      };

      if (isInjectable(potentialTarget)) {
        return deco(potentialTarget);
      }

      return deco;
    }

    function inject(...rest) {
      return (target, _key, descriptor) => {
        if (typeof descriptor === 'number') {
          autoinject(target);

          if (rest.length === 1) {
            target.inject[descriptor] = rest[0];
          }

          return;
        }

        if (descriptor) {
          const fn = descriptor.value;
          fn.inject = rest;
        } else {
          target.inject = rest;
        }
      };
    }

    var Lazy_1, All_1, Optional_1, Parent_1, Factory_1, NewInstance_1;
    const resolver = aureliaMetadata.protocol.create('aurelia:resolver', target => {
      if (!(typeof target.get === 'function')) {
        return 'Resolvers must implement: get(container: Container, key: any): any';
      }

      return true;
    });

    (function (Strategy) {
      Strategy[Strategy["instance"] = 0] = "instance";
      Strategy[Strategy["singleton"] = 1] = "singleton";
      Strategy[Strategy["transient"] = 2] = "transient";
      Strategy[Strategy["function"] = 3] = "function";
      Strategy[Strategy["array"] = 4] = "array";
      Strategy[Strategy["alias"] = 5] = "alias";
    })(exports.Strategy || (exports.Strategy = {}));

    function isStrategy(actual, expected, state) {
      return actual === expected;
    }

    exports.StrategyResolver = class StrategyResolver {
      constructor(strategy, state) {
        (this || _global).strategy = strategy;
        (this || _global).state = state;
      }

      get(container, key) {
        if (isStrategy((this || _global).strategy, exports.Strategy.instance, (this || _global).state)) {
          return (this || _global).state;
        }

        if (isStrategy((this || _global).strategy, exports.Strategy.singleton, (this || _global).state)) {
          const singleton = container.invoke((this || _global).state);
          (this || _global).state = singleton;
          (this || _global).strategy = 0;
          return singleton;
        }

        if (isStrategy((this || _global).strategy, exports.Strategy.transient, (this || _global).state)) {
          return container.invoke((this || _global).state);
        }

        if (isStrategy((this || _global).strategy, exports.Strategy.function, (this || _global).state)) {
          return this.state(container, key, this || _global);
        }

        if (isStrategy((this || _global).strategy, exports.Strategy.array, (this || _global).state)) {
          return (this || _global).state[0].get(container, key);
        }

        if (isStrategy((this || _global).strategy, exports.Strategy.alias, (this || _global).state)) {
          return container.get((this || _global).state);
        }

        throw new Error('Invalid strategy: ' + (this || _global).strategy);
      }

    };
    exports.StrategyResolver = __decorate([resolver(), __metadata("design:paramtypes", [Number, Object])], exports.StrategyResolver);
    exports.Lazy = Lazy_1 = class Lazy {
      constructor(key) {
        (this || _global)._key = key;
      }

      get(container) {
        return () => container.get((this || _global)._key);
      }

      static of(key) {
        return new Lazy_1(key);
      }

    };
    exports.Lazy = Lazy_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], exports.Lazy);
    exports.All = All_1 = class All {
      constructor(key) {
        (this || _global)._key = key;
      }

      get(container) {
        return container.getAll((this || _global)._key);
      }

      static of(key) {
        return new All_1(key);
      }

    };
    exports.All = All_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], exports.All);
    exports.Optional = Optional_1 = class Optional {
      constructor(key, checkParent = true) {
        (this || _global)._key = key;
        (this || _global)._checkParent = checkParent;
      }

      get(container) {
        if (container.hasResolver((this || _global)._key, (this || _global)._checkParent)) {
          return container.get((this || _global)._key);
        }

        return null;
      }

      static of(key, checkParent = true) {
        return new Optional_1(key, checkParent);
      }

    };
    exports.Optional = Optional_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object, Boolean])], exports.Optional);
    exports.Parent = Parent_1 = class Parent {
      constructor(key) {
        (this || _global)._key = key;
      }

      get(container) {
        return container.parent ? container.parent.get((this || _global)._key) : null;
      }

      static of(key) {
        return new Parent_1(key);
      }

    };
    exports.Parent = Parent_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], exports.Parent);
    exports.Factory = Factory_1 = class Factory {
      constructor(key) {
        (this || _global)._key = key;
      }

      get(container) {
        let fn = (this || _global)._key;
        const resolver = container.getResolver(fn);

        if (resolver && resolver.strategy === exports.Strategy.function) {
          fn = resolver.state;
        }

        return (...rest) => container.invoke(fn, rest);
      }

      static of(key) {
        return new Factory_1(key);
      }

    };
    exports.Factory = Factory_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], exports.Factory);
    exports.NewInstance = NewInstance_1 = class NewInstance {
      constructor(key, ...dynamicDependencies) {
        (this || _global).key = key;
        (this || _global).asKey = key;
        (this || _global).dynamicDependencies = dynamicDependencies;
      }

      get(container) {
        const dynamicDependencies = (this || _global).dynamicDependencies.length > 0 ? (this || _global).dynamicDependencies.map(dependency => dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency)) : undefined;
        let fn = (this || _global).key;
        const resolver = container.getResolver(fn);

        if (resolver && resolver.strategy === 3) {
          fn = resolver.state;
        }

        const instance = container.invoke(fn, dynamicDependencies);
        container.registerInstance((this || _global).asKey, instance);
        return instance;
      }

      as(key) {
        (this || _global).asKey = key;
        return this || _global;
      }

      static of(key, ...dynamicDependencies) {
        return new NewInstance_1(key, ...dynamicDependencies);
      }

    };
    exports.NewInstance = NewInstance_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object, Object])], exports.NewInstance);

    function getDecoratorDependencies(target) {
      autoinject(target);
      return target.inject;
    }

    function lazy(keyValue) {
      return (target, _key, index) => {
        const inject$$1 = getDecoratorDependencies(target);
        inject$$1[index] = exports.Lazy.of(keyValue);
      };
    }

    function all(keyValue) {
      return (target, _key, index) => {
        const inject$$1 = getDecoratorDependencies(target);
        inject$$1[index] = exports.All.of(keyValue);
      };
    }

    function optional(checkParentOrTarget = true) {
      const deco = checkParent => {
        return (target, _key, index) => {
          const inject$$1 = getDecoratorDependencies(target);
          inject$$1[index] = exports.Optional.of(inject$$1[index], checkParent);
        };
      };

      if (typeof checkParentOrTarget === 'boolean') {
        return deco(checkParentOrTarget);
      }

      return deco(true);
    }

    function parent(target, _key, index) {
      const inject$$1 = getDecoratorDependencies(target);
      inject$$1[index] = exports.Parent.of(inject$$1[index]);
    }

    function factory(keyValue) {
      return (target, _key, index) => {
        const inject$$1 = getDecoratorDependencies(target);
        inject$$1[index] = exports.Factory.of(keyValue);
      };
    }

    function newInstance(asKeyOrTarget, ...dynamicDependencies) {
      const deco = asKey => {
        return (target, _key, index) => {
          const inject$$1 = getDecoratorDependencies(target);
          inject$$1[index] = exports.NewInstance.of(inject$$1[index], ...dynamicDependencies);

          if (!!asKey) {
            inject$$1[index].as(asKey);
          }
        };
      };

      if (arguments.length >= 1) {
        return deco(asKeyOrTarget);
      }

      return deco();
    }

    function validateKey(key) {
      if (key === null || key === undefined) {
        throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
      }
    }

    const _emptyParameters = Object.freeze([]);

    aureliaMetadata.metadata.registration = 'aurelia:registration';
    aureliaMetadata.metadata.invoker = 'aurelia:invoker';
    const resolverDecorates = resolver.decorates;

    class InvocationHandler {
      constructor(fn, invoker, dependencies) {
        (this || _global).fn = fn;
        (this || _global).invoker = invoker;
        (this || _global).dependencies = dependencies;
      }

      invoke(container, dynamicDependencies) {
        return dynamicDependencies !== undefined ? (this || _global).invoker.invokeWithDynamicDependencies(container, (this || _global).fn, (this || _global).dependencies, dynamicDependencies) : (this || _global).invoker.invoke(container, (this || _global).fn, (this || _global).dependencies);
      }

    }

    function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
      let i = staticDependencies.length;
      let args = new Array(i);
      let lookup;

      while (i--) {
        lookup = staticDependencies[i];

        if (lookup === null || lookup === undefined) {
          throw new Error('Constructor Parameter with index ' + i + ' cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
        } else {
          args[i] = container.get(lookup);
        }
      }

      if (dynamicDependencies !== undefined) {
        args = args.concat(dynamicDependencies);
      }

      return Reflect.construct(fn, args);
    }

    const classInvoker = {
      invoke(container, Type, deps) {
        const instances = deps.map(dep => container.get(dep));
        return Reflect.construct(Type, instances);
      },

      invokeWithDynamicDependencies
    };

    function getDependencies(f) {
      if (!f.hasOwnProperty('inject')) {
        return [];
      }

      if (typeof f.inject === 'function') {
        return f.inject();
      }

      return f.inject;
    }

    class Container {
      constructor(configuration) {
        if (configuration === undefined) {
          configuration = {};
        }

        (this || _global)._configuration = configuration;
        (this || _global)._onHandlerCreated = configuration.onHandlerCreated;
        (this || _global)._handlers = configuration.handlers || (configuration.handlers = new Map());
        (this || _global)._resolvers = new Map();
        (this || _global).root = this || _global;
        (this || _global).parent = null;
      }

      makeGlobal() {
        Container.instance = this || _global;
        return this || _global;
      }

      setHandlerCreatedCallback(onHandlerCreated) {
        (this || _global)._onHandlerCreated = onHandlerCreated;
        (this || _global)._configuration.onHandlerCreated = onHandlerCreated;
      }

      registerInstance(key, instance) {
        return this.registerResolver(key, new exports.StrategyResolver(0, instance === undefined ? key : instance));
      }

      registerSingleton(key, fn) {
        return this.registerResolver(key, new exports.StrategyResolver(1, fn === undefined ? key : fn));
      }

      registerTransient(key, fn) {
        return this.registerResolver(key, new exports.StrategyResolver(2, fn === undefined ? key : fn));
      }

      registerHandler(key, handler) {
        return this.registerResolver(key, new exports.StrategyResolver(3, handler));
      }

      registerAlias(originalKey, aliasKey) {
        return this.registerResolver(aliasKey, new exports.StrategyResolver(5, originalKey));
      }

      registerResolver(key, resolver$$1) {
        validateKey(key);
        const allResolvers = (this || _global)._resolvers;
        const result = allResolvers.get(key);

        if (result === undefined) {
          allResolvers.set(key, resolver$$1);
        } else if (result.strategy === 4) {
          result.state.push(resolver$$1);
        } else {
          allResolvers.set(key, new exports.StrategyResolver(4, [result, resolver$$1]));
        }

        return resolver$$1;
      }

      autoRegister(key, fn) {
        fn = fn === undefined ? key : fn;

        if (typeof fn === 'function') {
          const registration = aureliaMetadata.metadata.get(aureliaMetadata.metadata.registration, fn);

          if (registration === undefined) {
            return this.registerResolver(key, new exports.StrategyResolver(1, fn));
          }

          return registration.registerResolver(this || _global, key, fn);
        }

        return this.registerResolver(key, new exports.StrategyResolver(0, fn));
      }

      autoRegisterAll(fns) {
        let i = fns.length;

        while (i--) {
          this.autoRegister(fns[i]);
        }
      }

      unregister(key) {
        (this || _global)._resolvers.delete(key);
      }

      hasResolver(key, checkParent = false) {
        validateKey(key);
        return (this || _global)._resolvers.has(key) || checkParent && (this || _global).parent !== null && (this || _global).parent.hasResolver(key, checkParent);
      }

      getResolver(key) {
        return (this || _global)._resolvers.get(key);
      }

      get(key) {
        validateKey(key);

        if (key === Container) {
          return this || _global;
        }

        if (resolverDecorates(key)) {
          return key.get(this || _global, key);
        }

        const resolver$$1 = (this || _global)._resolvers.get(key);

        if (resolver$$1 === undefined) {
          if ((this || _global).parent === null) {
            return this.autoRegister(key).get(this || _global, key);
          }

          const registration = aureliaMetadata.metadata.get(aureliaMetadata.metadata.registration, key);

          if (registration === undefined) {
            return (this || _global).parent._get(key);
          }

          return registration.registerResolver(this || _global, key, key).get(this || _global, key);
        }

        return resolver$$1.get(this || _global, key);
      }

      _get(key) {
        const resolver$$1 = (this || _global)._resolvers.get(key);

        if (resolver$$1 === undefined) {
          if ((this || _global).parent === null) {
            return this.autoRegister(key).get(this || _global, key);
          }

          return (this || _global).parent._get(key);
        }

        return resolver$$1.get(this || _global, key);
      }

      getAll(key) {
        validateKey(key);

        const resolver$$1 = (this || _global)._resolvers.get(key);

        if (resolver$$1 === undefined) {
          if ((this || _global).parent === null) {
            return _emptyParameters;
          }

          return (this || _global).parent.getAll(key);
        }

        if (resolver$$1.strategy === 4) {
          const state = resolver$$1.state;
          let i = state.length;
          const results = new Array(i);

          while (i--) {
            results[i] = state[i].get(this || _global, key);
          }

          return results;
        }

        return [resolver$$1.get(this || _global, key)];
      }

      createChild() {
        const child = new Container((this || _global)._configuration);
        child.root = (this || _global).root;
        child.parent = this || _global;
        return child;
      }

      invoke(fn, dynamicDependencies) {
        try {
          let handler = (this || _global)._handlers.get(fn);

          if (handler === undefined) {
            handler = this._createInvocationHandler(fn);

            (this || _global)._handlers.set(fn, handler);
          }

          return handler.invoke(this || _global, dynamicDependencies);
        } catch (e) {
          throw new aureliaPal.AggregateError(`Error invoking ${fn.name}. Check the inner error for details.`, e, true);
        }
      }

      _createInvocationHandler(fn) {
        let dependencies;

        if (fn.inject === undefined) {
          dependencies = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
        } else {
          dependencies = [];
          let ctor = fn;

          while (typeof ctor === 'function') {
            dependencies.push(...getDependencies(ctor));
            ctor = Object.getPrototypeOf(ctor);
          }
        }

        const invoker = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.invoker, fn) || classInvoker;
        const handler = new InvocationHandler(fn, invoker, dependencies);
        return (this || _global)._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
      }

    }

    function invoker(value) {
      return target => {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.invoker, value, target);
      };
    }

    function invokeAsFactory(potentialTarget) {
      const deco = target => {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
      };

      return potentialTarget ? deco(potentialTarget) : deco;
    }

    class FactoryInvoker {
      invoke(container, fn, dependencies) {
        let i = dependencies.length;
        const args = new Array(i);

        while (i--) {
          args[i] = container.get(dependencies[i]);
        }

        return fn.apply(undefined, args);
      }

      invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
        let i = staticDependencies.length;
        let args = new Array(i);

        while (i--) {
          args[i] = container.get(staticDependencies[i]);
        }

        if (dynamicDependencies !== undefined) {
          args = args.concat(dynamicDependencies);
        }

        return fn.apply(undefined, args);
      }

    }

    FactoryInvoker.instance = new FactoryInvoker();

    function registration(value) {
      return target => {
        aureliaMetadata.metadata.define(aureliaMetadata.metadata.registration, value, target);
      };
    }

    function transient(key) {
      return registration(new TransientRegistration(key));
    }

    function singleton(keyOrRegisterInChild, registerInChild = false) {
      return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }

    class TransientRegistration {
      constructor(key) {
        (this || _global)._key = key;
      }

      registerResolver(container, key, fn) {
        const existingResolver = container.getResolver((this || _global)._key || key);
        return existingResolver === undefined ? container.registerTransient((this || _global)._key || key, fn) : existingResolver;
      }

    }

    class SingletonRegistration {
      constructor(keyOrRegisterInChild, registerInChild = false) {
        if (typeof keyOrRegisterInChild === 'boolean') {
          (this || _global)._registerInChild = keyOrRegisterInChild;
        } else {
          (this || _global)._key = keyOrRegisterInChild;
          (this || _global)._registerInChild = registerInChild;
        }
      }

      registerResolver(container, key, fn) {
        const targetContainer = (this || _global)._registerInChild ? container : container.root;
        const existingResolver = targetContainer.getResolver((this || _global)._key || key);
        return existingResolver === undefined ? targetContainer.registerSingleton((this || _global)._key || key, fn) : existingResolver;
      }

    }

    exports._emptyParameters = _emptyParameters;
    exports.InvocationHandler = InvocationHandler;
    exports.Container = Container;
    exports.autoinject = autoinject;
    exports.inject = inject;
    exports.invoker = invoker;
    exports.invokeAsFactory = invokeAsFactory;
    exports.FactoryInvoker = FactoryInvoker;
    exports.registration = registration;
    exports.transient = transient;
    exports.singleton = singleton;
    exports.TransientRegistration = TransientRegistration;
    exports.SingletonRegistration = SingletonRegistration;
    exports.resolver = resolver;
    exports.getDecoratorDependencies = getDecoratorDependencies;
    exports.lazy = lazy;
    exports.all = all;
    exports.optional = optional;
    exports.parent = parent;
    exports.factory = factory;
    exports.newInstance = newInstance;
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  });

  return exports;
}