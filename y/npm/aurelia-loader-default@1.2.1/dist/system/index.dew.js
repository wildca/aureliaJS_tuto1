var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-loader-default'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaLoaderDefault) {
        var _exportObj = {};

        for (var _key in _aureliaLoaderDefault) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaLoaderDefault[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}