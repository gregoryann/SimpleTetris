"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallingEyePair = void 0;

var _Animation = require("./Animation");

var _SoundGeneration = require("../Audio/SoundGeneration");

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

var FallingEyePair =
/*#__PURE__*/
function (_AnimationBase) {
  _inherits(FallingEyePair, _AnimationBase);

  function FallingEyePair(x, y) {
    var _this;

    _classCallCheck(this, FallingEyePair);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FallingEyePair).call(this, 120));
    _this.x = x;
    _this.y = y;
    _this.rotation = 0;
    _this.dy = (0, _SoundGeneration.sampleNoise)();
    _this.dx = (0, _SoundGeneration.sampleNoise)();
    _this.drot = (0, _SoundGeneration.sampleNoise)();
    return _this;
  }

  _createClass(FallingEyePair, [{
    key: "step",
    value: function step() {
      _get(_getPrototypeOf(FallingEyePair.prototype), "step", this).call(this);

      this.dy += 0.5;
      this.y += this.dy;
      this.x += this.dx;
      this.rotation += this.drot;
    }
  }, {
    key: "render",
    value: function render() {
      (0, _Graphics.drawSprite)(_Assets.EyesSprite, this.x - 4, this.y, 0);
      (0, _Graphics.drawSprite)(_Assets.EyesSprite, this.x + 4, this.y, 0);
    }
  }]);

  return FallingEyePair;
}(_Animation.AnimationBase);

exports.FallingEyePair = FallingEyePair;