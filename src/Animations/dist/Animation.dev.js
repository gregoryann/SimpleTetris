"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationBase = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimationBase =
/*#__PURE__*/
function () {
  function AnimationBase(duration) {
    _classCallCheck(this, AnimationBase);

    this.duration = duration;
    this.t = 0;
    this.relativeT = 0;
  }

  _createClass(AnimationBase, [{
    key: "step",
    value: function step() {
      this.t++;
      this.relativeT = this.t / this.duration;

      if (this.t === this.duration) {
        this.done = true;
      }
    }
  }]);

  return AnimationBase;
}();

exports.AnimationBase = AnimationBase;