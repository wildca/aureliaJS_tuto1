var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-logging'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaLogging) {
        var _exportObj = {};

        for (var _key in _aureliaLogging) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaLogging[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}