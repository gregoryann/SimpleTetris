"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverAnimation = void 0;

var _ClearAnimation = require("./ClearAnimation");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameOverAnimation =
/*#__PURE__*/
function () {
  function GameOverAnimation(level) {
    _classCallCheck(this, GameOverAnimation);

    this.level = level;
    this.row = 0;
    this.t = 0;
    this.clearAnimations = [];
    this.addAnimation();
  }

  _createClass(GameOverAnimation, [{
    key: "step",
    value: function step() {
      if (++this.t > 2) {
        if (this.row === this.level.board.height) {
          this.done = this.t > 60;
        } else {
          this.addAnimation();
        }
      }

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
    }
  }]);

  return GameOverAnimation;
}();

exports.GameOverAnimation = GameOverAnimation;