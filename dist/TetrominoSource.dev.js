"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoSource = void 0;

var _TetrominoBag = require("./TetrominoBag");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TetrominoSource =
/*#__PURE__*/
function () {
  function TetrominoSource() {
    _classCallCheck(this, TetrominoSource);

    this.bag = new _TetrominoBag.TetrominoBag();
  }

  _createClass(TetrominoSource, [{
    key: "getNext",
    value: function getNext() {
      var Type = this.bag.pick();

      if (!Type) {
        this.bag = new _TetrominoBag.TetrominoBag();
        return this.getNext();
      }

      return new Type();
    }
  }]);

  return TetrominoSource;
}();

exports.TetrominoSource = TetrominoSource;