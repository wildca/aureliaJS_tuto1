var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', './aurelia-route-recognizer'], function (exports, _aureliaRouteRecognizer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.keys(_aureliaRouteRecognizer).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaRouteRecognizer[key];
        }
      });
    });
  });
  return exports;
}