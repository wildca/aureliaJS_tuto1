var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  if (typeof FEATURE_NO_ES2015 === 'undefined') {
    Number.isNaN = Number.isNaN || function (value) {
      return value !== value;
    };

    Number.isFinite = Number.isFinite || function (value) {
      return typeof value === "number" && isFinite(value);
    };
  } // endif FEATURE_NO_ES2015


  return exports;
}