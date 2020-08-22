"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveTypeAnimation = void 0;

var _constants = require("../constants");

var _Assets = require("../Assets");

var _Graphics = require("../Graphics");

var _utils = require("../utils");

var _Animation = require("./Animation");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MoveTypeAnimation =
/*#__PURE__*/
function (_AnimationBase) {
  _inherits(MoveTypeAnimation, _AnimationBase);

  function MoveTypeAnimation(type) {
    var _T_SPIN$T_SPIN_MINI$T, _T_SPIN_MINI_SINGLE$T;

    var _this;

    _classCallCheck(this, MoveTypeAnimation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveTypeAnimation).call(this, 120));
    _this.type = type;
    _this.isMini = [_constants.T_SPIN_MINI, _constants.T_SPIN_MINI_SINGLE].includes(type);
    _this.textIndex = (_T_SPIN$T_SPIN_MINI$T = {}, _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.T_SPIN, 2), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.T_SPIN_MINI, 2), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.T_SPIN_MINI_SINGLE, 2), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.T_SPIN_SINGLE, 2), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.T_SPIN_DOUBLE, 2), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.T_SPIN_TRIPLE, 2), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.TETRIS_CLEAR, 0), _defineProperty(_T_SPIN$T_SPIN_MINI$T, _constants.ALL_CLEAR, 1), _T_SPIN$T_SPIN_MINI$T)[type];
    _this.bottomTextIndex = (_T_SPIN_MINI_SINGLE$T = {}, _defineProperty(_T_SPIN_MINI_SINGLE$T, _constants.T_SPIN_MINI_SINGLE, 4), _defineProperty(_T_SPIN_MINI_SINGLE$T, _constants.T_SPIN_SINGLE, 4), _defineProperty(_T_SPIN_MINI_SINGLE$T, _constants.T_SPIN_DOUBLE, 5), _defineProperty(_T_SPIN_MINI_SINGLE$T, _constants.T_SPIN_TRIPLE, 6), _T_SPIN_MINI_SINGLE$T)[type];

    if (_this.textIndex === undefined) {
      _this.done = true;
    }

    _this.scaleSampler = new _utils.EnvelopeSampler([[0.0, 0.0, 2], [0.1, 1.75, 1.5], [0.2, 1.0], [0.9, 1.0, 2], [1.0, 1.4]]);
    _this.scale2Sampler = new _utils.EnvelopeSampler([[0.0, 0.0, 6], [0.2, 1.2, 1.5], [0.3, 1.0]]);
    _this.rotationSampler = new _utils.EnvelopeSampler([[0, _this.textIndex === 2 ? Math.PI * 2 : 0, 0.04], [1, 0]]);
    return _this;
  }

  _createClass(MoveTypeAnimation, [{
    key: "render",
    value: function render() {
      if (this.done) {
        return;
      }

      var t = this.relativeT;
      var scale1 = this.scaleSampler.sample(t);
      var scale2 = this.scale2Sampler.sample(t);
      var rotation = this.rotationSampler.sample(t);

      if (this.isMini) {
        (0, _Graphics.drawSprite)(_Assets.TextsSprite, 0, 100, 3, scale1, scale1);
      }

      (0, _Graphics.drawSprite)(_Assets.TextsSprite, 0, 112, this.textIndex, scale1, scale1, rotation);

      if (this.bottomTextIndex) {
        (0, _Graphics.drawSprite)(_Assets.TextsSprite, 0, 130, this.bottomTextIndex, scale2, scale2);
      }
    }
  }]);

  return MoveTypeAnimation;
}(_Animation.AnimationBase);

exports.MoveTypeAnimation = MoveTypeAnimation;