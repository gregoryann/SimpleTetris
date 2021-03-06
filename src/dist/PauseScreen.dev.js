"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PauseScreen = void 0;

var _Input = require("./Input");

var _constants = require("./constants");

var _globals = require("./globals");

var _Overlay2 = require("./Overlay");

var _fontUtils = require("./fontUtils");

var _Graphics = require("./Graphics");

var _Assets = require("./Assets");

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

var PauseScreen =
/*#__PURE__*/
function (_Overlay) {
  _inherits(PauseScreen, _Overlay);

  function PauseScreen(scene) {
    var _this;

    var firstTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, PauseScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PauseScreen).call(this, scene));
    _this.firstTime = firstTime;

    _Input.Input.reset();

    return _this;
  }

  _createClass(PauseScreen, [{
    key: "step",
    value: function step() {
      if (_Input.Input.getKeyDown(_constants.PAUSE) || this.firstTime && _Input.Input.getAnyKey()) {
        (0, _globals.setScene)(this.scene);
      }
    }
  }, {
    key: "render",
    value: function render() {
      _get(_getPrototypeOf(PauseScreen.prototype), "render", this).call(this);

      _Graphics.Graphics.setTransform(1, 0, 0, 1, _Graphics.Canvas.width / 2, 0);

      _Graphics.Graphics.scale(2, 2);

      (0, _fontUtils.drawBoldTextCentered)('PAUSED', 0, 30);

      _Graphics.Graphics.scale(0.5, 0.5);

      (0, _fontUtils.drawBoldTextCentered)('INSTRUCTIONS', 0, 100);
      var descriptionMaxCharCount = 50;
      (0, _fontUtils.drawText)('MAKE FULL HORIZONTAL LINES WITH THE TETROMINOES.\n' + 'THIS WILL DISINTEGRATE THE TETROMINOES AND PROVIDE\n' + 'YOU POINTS.\n\n' + 'TRY TO AIM FOR AS MANY LINES AT THE SAME TIME, AND\n' + 'TRY OUT SOME TRICKS SUCH AS T-SPINS AS WELL!\n\n' + 'DO NOTE THAT TETROMINOES WILL FLEE BACK UP IF THEY\n' + 'CAN WHEN THEY HAVE SEEN FELLOW NEIGHBOURING TETRO-\n' + 'MINOES DIE AT LEAST TWICE. FLEEING TETROMINOES WILL\n' + 'REDUCE YOUR SCORE, SO TRY TO MURDER AS MUCH AS\n' + 'YOU CAN.\n\n' + 'GOOD LUCK!', -descriptionMaxCharCount * _fontUtils.GLYPH_WIDTH / 2, 118);

      _Graphics.Graphics.setTransform(1, 0, 0, 1, _Graphics.Canvas.width / 2 - 100, 248);

      (0, _fontUtils.drawBoldTextCentered)('KEYBOARD CONTROLS', 0, 0);
      (0, _fontUtils.drawText)('UN/PAUSE GAME   - ESC\n' + 'HARD DROP       - SPACE\n' + 'SOFT DROP       - ARROW DOWN\n' + 'ROTATE CLOCKW   - ARROW UP/X\n' + 'ROTATE C CLOCKW - CTRL/Z\n' + 'HOLD            - SHIFT/C\n', -83, 18);

      _Graphics.Graphics.setTransform(1, 0, 0, 1, _Graphics.Canvas.width / 2 + 100, 248);

      (0, _fontUtils.drawBoldTextCentered)('GAMEPAD CONTROLS', 0, 0);
      (0, _Graphics.drawSprite)(_Assets.GamepadSprite, 0, 150 - 128);
      (0, _fontUtils.drawText)('HOLD', 106 - 118, 143 - 128);
      (0, _fontUtils.drawText)('HARD\nDROP', 54 - 118, 161 - 128);
      (0, _fontUtils.drawText)('SOFT\nDROP', 86 - 118, 194 - 128);
      (0, _fontUtils.drawText)('ROTATE\nC.CLOCKW', 125 - 118, 194 - 128);
      (0, _fontUtils.drawText)('ROTATE\nCLOCKW', 160 - 118, 164 - 128);
    }
  }]);

  return PauseScreen;
}(_Overlay2.Overlay);

exports.PauseScreen = PauseScreen;