"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Back2BackAnimation = void 0;

var _fontUtils = require("../fontUtils");

var _Animation = require("./Animation");

var _utils = require("../utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Back2BackAnimation =
/*#__PURE__*/
function (_AnimationBase) {
  _inherits(Back2BackAnimation, _AnimationBase);

  function Back2BackAnimation() {
    var _this;

    _classCallCheck(this, Back2BackAnimation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Back2BackAnimation).call(this, 120));
    _this.scaleSampler = new _utils.EnvelopeSampler([[0.0, 0.0], [0.1, 0.0, 2], [0.2, 1.3, 1.5], [0.3, 1.0], [0.9, 1.0, 2]]);
    return _this;
  }

  _createClass(Back2BackAnimation, [{
    key: "render",
    value: function render() {
      if (this.done) {
        return;
      }

      (0, _fontUtils.drawTextCentered)('BACK-TO-BACK', 0, 150, this.scaleSampler.sample(this.relativeT));
      var text = 'BACK-TO-BACK';
      var scale = this.scaleSampler.sample(this.relativeT);
      var textWidth = (0, _fontUtils.getTextWidth)(text);
      (0, _fontUtils.drawText)(text, -textWidth / 2 * scale, 150, scale);
    }
  }]);

  return Back2BackAnimation;
}(_Animation.AnimationBase);

exports.Back2BackAnimation = Back2BackAnimation;