var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-binding'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaBinding) {
        var _exportObj = {};

        for (var _key in _aureliaBinding) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaBinding[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}