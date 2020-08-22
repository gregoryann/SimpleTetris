"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoBag = void 0;

var _TetrominoI = require("./Tetrominos/TetrominoI");

var _TetrominoL = require("./Tetrominos/TetrominoL");

var _TetrominoJ = require("./Tetrominos/TetrominoJ");

var _TetrominoT = require("./Tetrominos/TetrominoT");

var _TetrominoO = require("./Tetrominos/TetrominoO");

var _TetrominoS = require("./Tetrominos/TetrominoS");

var _TetrominoZ = require("./Tetrominos/TetrominoZ");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TetrominoBag =
/*#__PURE__*/
function () {
  function TetrominoBag() {
    _classCallCheck(this, TetrominoBag);

    this.tetrominos = [_TetrominoI.TetrominoI, _TetrominoL.TetrominoL, _TetrominoJ.TetrominoJ, _TetrominoT.TetrominoT, _TetrominoO.TetrominoO, _TetrominoS.TetrominoS, _TetrominoZ.TetrominoZ];

    for (var i = 6; i > 1; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.tetrominos[j];
      this.tetrominos[j] = this.tetrominos[i];
      this.tetrominos[i] = temp;
    }
  }

  _createClass(TetrominoBag, [{
    key: "pick",
    value: function pick() {
      return this.tetrominos.pop();
    }
  }]);

  return TetrominoBag;
}();

exports.TetrominoBag = TetrominoBag;