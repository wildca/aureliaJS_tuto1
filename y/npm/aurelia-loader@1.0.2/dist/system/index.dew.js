var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-loader'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaLoader) {
        var _exportObj = {};

        for (var _key in _aureliaLoader) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaLoader[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}