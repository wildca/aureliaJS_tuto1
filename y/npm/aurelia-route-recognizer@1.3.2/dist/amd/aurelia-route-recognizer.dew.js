var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-path'], function (exports, _aureliaPath) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RouteRecognizer = exports.EpsilonSegment = exports.StarSegment = exports.DynamicSegment = exports.StaticSegment = exports.State = undefined;

    var State = exports.State = function () {
      function State(charSpec) {
        (this || _global).charSpec = charSpec;
        (this || _global).nextStates = [];
      }

      State.prototype.get = function get(charSpec) {
        for (var _iterator = (this || _global).nextStates, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var child = _ref;
          var isEqual = child.charSpec.validChars === charSpec.validChars && child.charSpec.invalidChars === charSpec.invalidChars;

          if (isEqual) {
            return child;
          }
        }

        return undefined;
      };

      State.prototype.put = function put(charSpec) {
        var state = this.get(charSpec);

        if (state) {
          return state;
        }

        state = new State(charSpec);

        (this || _global).nextStates.push(state);

        if (charSpec.repeat) {
          state.nextStates.push(state);
        }

        return state;
      };

      State.prototype.match = function match(ch) {
        var nextStates = (this || _global).nextStates;
        var results = [];

        for (var i = 0, l = nextStates.length; i < l; i++) {
          var child = nextStates[i];
          var charSpec = child.charSpec;

          if (charSpec.validChars !== undefined) {
            if (charSpec.validChars.indexOf(ch) !== -1) {
              results.push(child);
            }
          } else if (charSpec.invalidChars !== undefined) {
            if (charSpec.invalidChars.indexOf(ch) === -1) {
              results.push(child);
            }
          }
        }

        return results;
      };

      return State;
    }();

    var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
    var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

    var StaticSegment = exports.StaticSegment = function () {
      function StaticSegment(string, caseSensitive) {
        (this || _global).string = string;
        (this || _global).caseSensitive = caseSensitive;
      }

      StaticSegment.prototype.eachChar = function eachChar(callback) {
        var s = (this || _global).string;

        for (var i = 0, ii = s.length; i < ii; ++i) {
          var ch = s[i];
          callback({
            validChars: (this || _global).caseSensitive ? ch : ch.toUpperCase() + ch.toLowerCase()
          });
        }
      };

      StaticSegment.prototype.regex = function regex() {
        return (this || _global).string.replace(escapeRegex, '\\$1');
      };

      StaticSegment.prototype.generate = function generate() {
        return (this || _global).string;
      };

      return StaticSegment;
    }();

    var DynamicSegment = exports.DynamicSegment = function () {
      function DynamicSegment(name, optional) {
        (this || _global).name = name;
        (this || _global).optional = optional;
      }

      DynamicSegment.prototype.eachChar = function eachChar(callback) {
        callback({
          invalidChars: '/',
          repeat: true
        });
      };

      DynamicSegment.prototype.regex = function regex() {
        return '([^/]+)';
      };

      DynamicSegment.prototype.generate = function generate(params, consumed) {
        consumed[(this || _global).name] = true;
        return params[(this || _global).name];
      };

      return DynamicSegment;
    }();

    var StarSegment = exports.StarSegment = function () {
      function StarSegment(name) {
        (this || _global).name = name;
      }

      StarSegment.prototype.eachChar = function eachChar(callback) {
        callback({
          invalidChars: '',
          repeat: true
        });
      };

      StarSegment.prototype.regex = function regex() {
        return '(.+)';
      };

      StarSegment.prototype.generate = function generate(params, consumed) {
        consumed[(this || _global).name] = true;
        return params[(this || _global).name];
      };

      return StarSegment;
    }();

    var EpsilonSegment = exports.EpsilonSegment = function () {
      function EpsilonSegment() {}

      EpsilonSegment.prototype.eachChar = function eachChar() {};

      EpsilonSegment.prototype.regex = function regex() {
        return '';
      };

      EpsilonSegment.prototype.generate = function generate() {
        return '';
      };

      return EpsilonSegment;
    }();

    var RouteRecognizer = exports.RouteRecognizer = function () {
      function RouteRecognizer() {
        (this || _global).rootState = new State();
        (this || _global).names = {};
        (this || _global).routes = new Map();
      }

      RouteRecognizer.prototype.add = function add(route) {
        var _this = this || _global;

        if (Array.isArray(route)) {
          route.forEach(function (r) {
            return _this.add(r);
          });
          return undefined;
        }

        var currentState = (this || _global).rootState;
        var skippableStates = [];
        var regex = '^';
        var types = {
          statics: 0,
          dynamics: 0,
          stars: 0
        };
        var names = [];
        var routeName = route.handler.name;
        var isEmpty = true;
        var segments = parse(route.path, names, types, route.caseSensitive);

        for (var i = 0, ii = segments.length; i < ii; i++) {
          var segment = segments[i];

          if (segment instanceof EpsilonSegment) {
            continue;
          }

          var _addSegment = addSegment(currentState, segment),
              firstState = _addSegment[0],
              nextState = _addSegment[1];

          for (var j = 0, jj = skippableStates.length; j < jj; j++) {
            skippableStates[j].nextStates.push(firstState);
          }

          if (segment.optional) {
            skippableStates.push(nextState);
            regex += '(?:/' + segment.regex() + ')?';
          } else {
            currentState = nextState;
            regex += '/' + segment.regex();
            skippableStates.length = 0;
            isEmpty = false;
          }
        }

        if (isEmpty) {
          currentState = currentState.put({
            validChars: '/'
          });
          regex += '/?';
        }

        var handlers = [{
          handler: route.handler,
          names: names
        }];

        (this || _global).routes.set(route.handler, {
          segments: segments,
          handlers: handlers
        });

        if (routeName) {
          var routeNames = Array.isArray(routeName) ? routeName : [routeName];

          for (var _i2 = 0; _i2 < routeNames.length; _i2++) {
            if (!(routeNames[_i2] in (this || _global).names)) {
              (this || _global).names[routeNames[_i2]] = {
                segments: segments,
                handlers: handlers
              };
            }
          }
        }

        for (var _i3 = 0; _i3 < skippableStates.length; _i3++) {
          var state = skippableStates[_i3];
          state.handlers = handlers;
          state.regex = new RegExp(regex + '$', route.caseSensitive ? '' : 'i');
          state.types = types;
        }

        currentState.handlers = handlers;
        currentState.regex = new RegExp(regex + '$', route.caseSensitive ? '' : 'i');
        currentState.types = types;
        return currentState;
      };

      RouteRecognizer.prototype.getRoute = function getRoute(nameOrRoute) {
        return typeof nameOrRoute === 'string' ? (this || _global).names[nameOrRoute] : (this || _global).routes.get(nameOrRoute);
      };

      RouteRecognizer.prototype.handlersFor = function handlersFor(nameOrRoute) {
        var route = this.getRoute(nameOrRoute);

        if (!route) {
          throw new Error('There is no route named ' + nameOrRoute);
        }

        return [].concat(route.handlers);
      };

      RouteRecognizer.prototype.hasRoute = function hasRoute(nameOrRoute) {
        return !!this.getRoute(nameOrRoute);
      };

      RouteRecognizer.prototype.generate = function generate(nameOrRoute, params) {
        var route = this.getRoute(nameOrRoute);

        if (!route) {
          throw new Error('There is no route named ' + nameOrRoute);
        }

        var handler = route.handlers[0].handler;

        if (handler.generationUsesHref) {
          return handler.href;
        }

        var routeParams = Object.assign({}, params);
        var segments = route.segments;
        var consumed = {};
        var output = '';

        for (var i = 0, l = segments.length; i < l; i++) {
          var segment = segments[i];

          if (segment instanceof EpsilonSegment) {
            continue;
          }

          var segmentValue = segment.generate(routeParams, consumed);

          if (segmentValue === null || segmentValue === undefined) {
            if (!segment.optional) {
              throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + nameOrRoute + '\'.');
            }
          } else {
            output += '/';
            output += segmentValue;
          }
        }

        if (output.charAt(0) !== '/') {
          output = '/' + output;
        }

        for (var param in consumed) {
          delete routeParams[param];
        }

        var queryString = (0, _aureliaPath.buildQueryString)(routeParams);
        output += queryString ? '?' + queryString : '';
        return output;
      };

      RouteRecognizer.prototype.recognize = function recognize(path) {
        var states = [(this || _global).rootState];
        var queryParams = {};
        var isSlashDropped = false;
        var normalizedPath = path;
        var queryStart = normalizedPath.indexOf('?');

        if (queryStart !== -1) {
          var queryString = normalizedPath.substr(queryStart + 1, normalizedPath.length);
          normalizedPath = normalizedPath.substr(0, queryStart);
          queryParams = (0, _aureliaPath.parseQueryString)(queryString);
        }

        normalizedPath = decodeURI(normalizedPath);

        if (normalizedPath.charAt(0) !== '/') {
          normalizedPath = '/' + normalizedPath;
        }

        var pathLen = normalizedPath.length;

        if (pathLen > 1 && normalizedPath.charAt(pathLen - 1) === '/') {
          normalizedPath = normalizedPath.substr(0, pathLen - 1);
          isSlashDropped = true;
        }

        for (var i = 0, l = normalizedPath.length; i < l; i++) {
          states = recognizeChar(states, normalizedPath.charAt(i));

          if (!states.length) {
            break;
          }
        }

        var solutions = [];

        for (var _i4 = 0, _l = states.length; _i4 < _l; _i4++) {
          if (states[_i4].handlers) {
            solutions.push(states[_i4]);
          }
        }

        states = sortSolutions(solutions);
        var state = solutions[0];

        if (state && state.handlers) {
          if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
            normalizedPath = normalizedPath + '/';
          }

          return findHandler(state, normalizedPath, queryParams);
        }
      };

      return RouteRecognizer;
    }();

    var RecognizeResults = function RecognizeResults(queryParams) {
      (this || _global).splice = Array.prototype.splice;
      (this || _global).slice = Array.prototype.slice;
      (this || _global).push = Array.prototype.push;
      (this || _global).length = 0;
      (this || _global).queryParams = queryParams || {};
    };

    function parse(route, names, types, caseSensitive) {
      var normalizedRoute = route;

      if (route.charAt(0) === '/') {
        normalizedRoute = route.substr(1);
      }

      var results = [];
      var splitRoute = normalizedRoute.split('/');

      for (var i = 0, ii = splitRoute.length; i < ii; ++i) {
        var segment = splitRoute[i];
        var match = segment.match(/^:([^?]+)(\?)?$/);

        if (match) {
          var _match = match,
              _name = _match[1],
              optional = _match[2];

          if (_name.indexOf('=') !== -1) {
            throw new Error('Parameter ' + _name + ' in route ' + route + ' has a default value, which is not supported.');
          }

          results.push(new DynamicSegment(_name, !!optional));
          names.push(_name);
          types.dynamics++;
          continue;
        }

        match = segment.match(/^\*(.+)$/);

        if (match) {
          results.push(new StarSegment(match[1]));
          names.push(match[1]);
          types.stars++;
        } else if (segment === '') {
          results.push(new EpsilonSegment());
        } else {
          results.push(new StaticSegment(segment, caseSensitive));
          types.statics++;
        }
      }

      return results;
    }

    function sortSolutions(states) {
      return states.sort(function (a, b) {
        if (a.types.stars !== b.types.stars) {
          return a.types.stars - b.types.stars;
        }

        if (a.types.stars) {
          if (a.types.statics !== b.types.statics) {
            return b.types.statics - a.types.statics;
          }

          if (a.types.dynamics !== b.types.dynamics) {
            return b.types.dynamics - a.types.dynamics;
          }
        }

        if (a.types.dynamics !== b.types.dynamics) {
          return a.types.dynamics - b.types.dynamics;
        }

        if (a.types.statics !== b.types.statics) {
          return b.types.statics - a.types.statics;
        }

        return 0;
      });
    }

    function recognizeChar(states, ch) {
      var nextStates = [];

      for (var i = 0, l = states.length; i < l; i++) {
        var state = states[i];
        nextStates.push.apply(nextStates, state.match(ch));
      }

      return nextStates;
    }

    function findHandler(state, path, queryParams) {
      var handlers = state.handlers;
      var regex = state.regex;
      var captures = path.match(regex);
      var currentCapture = 1;
      var result = new RecognizeResults(queryParams);

      for (var i = 0, l = handlers.length; i < l; i++) {
        var _handler = handlers[i];
        var _names = _handler.names;
        var _params = {};

        for (var j = 0, m = _names.length; j < m; j++) {
          _params[_names[j]] = captures[currentCapture++];
        }

        result.push({
          handler: _handler.handler,
          params: _params,
          isDynamic: !!_names.length
        });
      }

      return result;
    }

    function addSegment(currentState, segment) {
      var firstState = currentState.put({
        validChars: '/'
      });
      var nextState = firstState;
      segment.eachChar(function (ch) {
        nextState = nextState.put(ch);
      });
      return [firstState, nextState];
    }
  });
  return exports;
}