"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndAnimation = void 0;

var _ClearAnimation = require("./ClearAnimation");

var _Animation = require("./Animation");

var _utils = require("../utils");

var _fontUtils = require("../fontUtils");

var _Graphics = require("../Graphics");

var _Assets = require("../Assets");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EndAnimation =
/*#__PURE__*/
function (_AnimationBase) {
  _inherits(EndAnimation, _AnimationBase);

  function EndAnimation(level, isGameOver) {
    var _this;

    _classCallCheck(this, EndAnimation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EndAnimation).call(this, 70));
    _this.isGameOver = isGameOver;
    _this.level = level;
    _this.row = 0;
    _this.clearAnimations = [];

    _this.addAnimation();

    _this.scaleSampler = new _utils.EnvelopeSampler([[0.0, 0.0], [0.4, 0.0, 2], [0.45, 2.5, 1.5], [0.5, 2.0]]);
    return _this;
  }

  _createClass(EndAnimation, [{
    key: "step",
    value: function step() {
      _get(_getPrototypeOf(EndAnimation.prototype), "step", this).call(this);

      if (this.t > 2) {
        if (this.row < this.level.board.height) {
          this.addAnimation();
        }
      }

      this.blinkingTimer++;
      this.clearAnimations.forEach(function (animation) {
        animation.step();
      });
    }
  }, {
    key: "addAnimation",
    value: function addAnimation() {
      this.t = 0;
      this.clearAnimations.push(new _ClearAnimation.ClearAnimation(this.level, [this.row]));
      this.row++;
    }
  }, {
    key: "render",
    value: function render() {
      this.clearAnimations.forEach(function (animation) {
        return animation.render();
      });

      if (this.t > 10) {
        var center = this.level.width / 2;
        var scale = this.scaleSampler.sample((this.t - 10) / 60);

        if (!this.isGameOver) {
          (0, _Graphics.drawSprite)(_Assets.TextsSprite, center, 112, 8, scale, scale);
        }

        if (this.t > 90 && this.t % 60 < 30) {
          (0, _fontUtils.drawTextCentered)('HOLD ANY BUTTON', center, 160);
          (0, _fontUtils.drawTextCentered)('TO START A NEW GAME', center, 167);
        }
      }
    }
  }]);

  return EndAnimation;
}(_Animation.AnimationBase);

exports.EndAnimation = EndAnimation;