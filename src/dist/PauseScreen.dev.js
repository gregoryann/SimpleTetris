"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PauseScreen = void 0;

var _fontUtils = require("./fontUtils");

var _Graphics = require("./Graphics");

var _Assets = require("./Assets");

var _globals = require("./globals");

var _Input = require("./Input");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PauseScreen =
/*#__PURE__*/
function () {
  function PauseScreen(scene) {
    _classCallCheck(this, PauseScreen);

    this.scene = scene;
  }

  _createClass(PauseScreen, [{
    key: "step",
    value: function step() {
      if (_Input.Input.getAnyKey()) {
        _Input.Input.reset();

        (0, _globals.setScene)(this.scene);
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.scene.paused = true;
      this.scene.render();
      this.scene.paused = false;

      _Graphics.Graphics.setTransform(1, 0, 0, 1, _Graphics.Canvas.width / 2, 0);

      for (var i = 0; i < 8; i++) {
        _Graphics.Graphics.fillStyle = 'rgba(0,0,0,0.2)';

        _Graphics.Graphics.fillRect(-160 + i * 4, 0, 320 - i * 8, _Graphics.Canvas.height);
      }

      (0, _fontUtils.drawBoldText)('TETRIS BUT WITH A TWIST', -59, 80);
      (0, _fontUtils.drawText)('FILL LINES TO CLEAR THEM. THIS TIME\n' + 'THE TETROMINOES HAVE A WILL OF THEIR\n' + 'OWN. SO TRY TO DESTROY THEM BEFORE\n' + 'THEY FLEE BACK TO WHENCE THEY CAME.', -100, 100);

      _Graphics.Graphics.setTransform(1, 0, 0, 1, _Graphics.Canvas.width / 2, 120);

      (0, _fontUtils.drawBoldText)('KEYBOARD CONTROLS', -59, 50);
      (0, _fontUtils.drawText)('     PAUSE GAME - ESC\n' + '      HARD DROP - SPACE\n' + '      SOFT DROP - ARROW DOWN\n' + '  ROTATE CLOCKW - ARROW UP/X\n' + 'ROTATE C CLOCKW - CTRL/Z\n' + '           HOLD - SHIFT/C\n', -96, 62);
      (0, _fontUtils.drawBoldText)('GAMEPAD CONTROLS', 62 - 117, 128);
      (0, _Graphics.drawSprite)(_Assets.GamepadSprite, 0, 150);
      (0, _fontUtils.drawText)('HOLD', 106 - 118, 143);
      (0, _fontUtils.drawText)('HARD\nDROP', 54 - 118, 161);
      (0, _fontUtils.drawText)('SOFT\nDROP', 86 - 118, 194);
      (0, _fontUtils.drawText)('ROTATE\nC.CLOCKW', 125 - 118, 194);
      (0, _fontUtils.drawText)('ROTATE\nCLOCKW', 160 - 118, 164);
    }
  }]);

  return PauseScreen;
}();

exports.PauseScreen = PauseScreen;