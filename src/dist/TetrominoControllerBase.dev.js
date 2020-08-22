"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoControllerBase = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TetrominoControllerBase =
/*#__PURE__*/
function () {
  function TetrominoControllerBase(tetromino, board) {
    _classCallCheck(this, TetrominoControllerBase);

    this.tetromino = tetromino;
    this.board = board;
  }

  _createClass(TetrominoControllerBase, [{
    key: "move",
    value: function move(dx, dy) {
      this.tetromino.move(dx, dy);

      if (this.invalidState()) {
        this.tetromino.move(-dx, -dy);
        return false;
      }

      this.lastMove = _constants.ACTION_SHIFT;
      return true;
    }
  }, {
    key: "rotateCCW",
    value: function rotateCCW() {
      var wallKicks = this.tetromino.getWallKicksCCW();
      this.tetromino.rotateCCW();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = wallKicks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var wallKick = _step.value;
          this.tetromino.move(wallKick[0], wallKick[1]);

          if (this.validState()) {
            this.lastMove = _constants.ACTION_ROTATE;
            return true;
          }

          this.tetromino.move(-wallKick[0], -wallKick[1]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.tetromino.rotateCW();
      return false;
    }
  }, {
    key: "rotateCW",
    value: function rotateCW() {
      var wallKicks = this.tetromino.getWallKicksCW();
      this.tetromino.rotateCW();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = wallKicks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var wallKick = _step2.value;
          this.tetromino.move(wallKick[0], wallKick[1]);

          if (this.validState()) {
            this.lastMove = _constants.ACTION_ROTATE;
            return true;
          }

          this.tetromino.move(-wallKick[0], -wallKick[1]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.tetromino.rotateCCW();
      return false;
    }
  }, {
    key: "invalidState",
    value: function invalidState() {
      return this.board.invalidPosition(this.tetromino);
    }
  }, {
    key: "validState",
    value: function validState() {
      return !this.invalidState();
    }
  }]);

  return TetrominoControllerBase;
}();

exports.TetrominoControllerBase = TetrominoControllerBase;