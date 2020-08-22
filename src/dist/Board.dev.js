"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var _Tetromino = require("./Tetrominos/Tetromino");

var _constants = require("./constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board =
/*#__PURE__*/
function () {
  function Board(width, height) {
    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
    this.heightWithMargin = this.height + 4;
    this.grid = [];

    for (var i = 0; i < this.heightWithMargin; i++) {
      this.grid.push(Array(this.width).fill(0));
    }

    this.tetrominoes = new Set();
  }

  _createClass(Board, [{
    key: "getItemAt",
    value: function getItemAt(x, y) {
      return this.grid[y][x];
    }
  }, {
    key: "getColorAt",
    value: function getColorAt(x, y) {
      var item = this.grid[y][x];

      if (item instanceof _Tetromino.Tetromino) {
        return item.getColor();
      }

      return _constants.COLORS[item];
    }
  }, {
    key: "isFullRow",
    value: function isFullRow(y) {
      return this.grid[y].every(function (val) {
        return val;
      });
    }
  }, {
    key: "overflows",
    value: function overflows() {
      // Overflows outside the middle 4 columns are allowed, but only with at most 2 blocks
      if (this.grid[this.height + 2].some(function (val) {
        return val;
      })) {
        return true;
      }

      for (var x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
        if (this.grid[this.height][x] || this.grid[this.height + 1][x]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "putTetromino",
    value: function putTetromino(tetromino) {
      this.tetrominoes.add(tetromino);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tetromino.getBlockPositions()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              px = _step$value[0],
              py = _step$value[1];

          this.grid[py][px] = tetromino;
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
    }
  }, {
    key: "removeTetromino",
    value: function removeTetromino(tetromino) {
      this.tetrominoes["delete"](tetromino);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tetromino.getBlockPositions()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              px = _step2$value[0],
              py = _step2$value[1];

          this.grid[py][px] = 0;
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
    }
  }, {
    key: "clearRows",
    value: function clearRows(rows) {
      rows.sort(function (a, b) {
        return a - b;
      });
      var tetrominosToMove = new Map();
      var index = 0;

      for (var y = 0; y < this.heightWithMargin; y++) {
        if (y === rows[index]) {
          index++;
        } else {
          for (var x = 0; x < this.width; x++) {
            var item = this.grid[y][x];

            if (item instanceof _Tetromino.Tetromino) {
              tetrominosToMove.set(item, index);
            }
          }

          this.grid[y - index] = this.grid[y];
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = tetrominosToMove[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              tetromino = _step3$value[0],
              delta = _step3$value[1];

          tetromino.y -= delta;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      for (var _y = this.height - index; _y < this.height; _y++) {
        this.grid[_y] = Array(this.width).fill(0);
      }
    }
  }, {
    key: "changeTetrominosToBlocks",
    value: function changeTetrominosToBlocks(rows) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = rows[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var y = _step4.value;

          for (var x = 0; x < this.width; x++) {
            var item = this.grid[y][x];

            if (item instanceof _Tetromino.Tetromino) {
              this.grid[y][x] = item.getId();
              this.tetrominoes.remove(item);
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return Board;
}();

exports.Board = Board;