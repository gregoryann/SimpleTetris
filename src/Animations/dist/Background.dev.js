"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Background = void 0;

var _Graphics = require("../Graphics");

var _Assets = require("../Assets");

var _globals = require("../globals");

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function shortAngleDist(a0, a1) {
  var max = Math.PI * 2;
  var da = (a1 - a0) % max;
  return 2 * da % max - da;
}

var Background =
/*#__PURE__*/
function () {
  function Background() {
    _classCallCheck(this, Background);

    this.x = 0;
    this.y = 0;
    this.direction = this.targetDirection = Math.PI / 3;
    this.speed = 1;
    this.paused = false;
    this.image = document.createElement('canvas');
    this.image.width = _Graphics.Canvas.width + 80;
    this.image.height = _Graphics.Canvas.height + 80;
    var ctx = this.image.getContext('2d');

    for (var x = 0; x < this.image.width; x += 80) {
      for (var y = 0; y < this.image.height; y += 80) {
        ctx.save();
        ctx.translate(x + 28, y + 20);
        ctx.rotate(-Math.PI / 4);
        ctx.drawImage(_Assets.LogoSprite.renderable, -25, -20);
        ctx.restore();
      }
    }

    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, this.image.width, this.image.height);
  }

  _createClass(Background, [{
    key: "step",
    value: function step() {
      if (this.paused) {
        this.speed = (0, _utils.approach)(this.speed, 0, 0.1);
      } else {
        var targetSpeed = Math.pow(1.08, _globals.currentLevel);
        this.speed = (0, _utils.approach)(this.speed, targetSpeed, targetSpeed / 30);
        var dist = shortAngleDist(this.direction, this.targetDirection);
        this.direction += dist / 500;

        if (Math.abs(dist) < 0.1) {
          this.targetDirection = Math.random() * Math.PI * 2;
        }
      }

      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      if (this.x <= -80) {
        this.x += 80;
      }

      if (this.y <= -80) {
        this.y += 80;
      }

      if (this.x > 0) {
        this.x -= 80;
      }

      if (this.y > 0) {
        this.y -= 80;
      }
    }
  }, {
    key: "render",
    value: function render() {
      _Graphics.Graphics.drawImage(this.image, this.x, this.y);
    }
  }]);

  return Background;
}();

exports.Background = Background;