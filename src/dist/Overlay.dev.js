"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = void 0;

var _Graphics = require("./Graphics");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Overlay =
/*#__PURE__*/
function () {
  function Overlay(scene) {
    _classCallCheck(this, Overlay);

    this.scene = scene;
  }

  _createClass(Overlay, [{
    key: "render",
    value: function render() {
      this.scene.paused = true;
      this.scene.render();
      this.scene.paused = false;
      (0, _Graphics.resetTransform)();
      _Graphics.Graphics.fillStyle = 'rgba(0,0,0,0.8)';

      _Graphics.Graphics.fillRect(0, 0, _Graphics.Canvas.width, _Graphics.Canvas.height);
    }
  }]);

  return Overlay;
}();

exports.Overlay = Overlay;