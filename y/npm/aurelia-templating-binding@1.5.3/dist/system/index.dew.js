var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-templating-binding'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaTemplatingBinding) {
        var _exportObj = {};

        for (var _key in _aureliaTemplatingBinding) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaTemplatingBinding[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}