var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', './aurelia-binding'], function (exports, _aureliaBinding) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.keys(_aureliaBinding).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaBinding[key];
        }
      });
    });
  });
  return exports;
}