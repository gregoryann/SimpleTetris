"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearAnimation = void 0;

var _Graphics = require("./Graphics");

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ClearAnimation =
/*#__PURE__*/
function () {
  function ClearAnimation(level, rows) {
    _classCallCheck(this, ClearAnimation);

    this.level = level;
    this.rows = rows;
    this.t = 0;
  }

  _createClass(ClearAnimation, [{
    key: "step",
    value: function step() {
      this.t++;

      if (this.t > 30) {
        this.done = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var margin = this.t < 20 ? this.t : 0;
      _Graphics.Graphics.fillStyle = this.t < 20 ? "rgba(255,255,255,".concat(this.t / 15, ")") : "#000";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var row = _step.value;

          _Graphics.Graphics.fillRect(-margin, (this.level.tileCountY - 1 - row) * _constants.TILE_SIZE, this.level.width + 2 * margin, _constants.TILE_SIZE);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return ClearAnimation;
}();

exports.ClearAnimation = ClearAnimation;