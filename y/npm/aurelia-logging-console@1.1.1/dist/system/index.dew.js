var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-logging-console'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaLoggingConsole) {
        var _exportObj = {};

        for (var _key in _aureliaLoggingConsole) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaLoggingConsole[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}