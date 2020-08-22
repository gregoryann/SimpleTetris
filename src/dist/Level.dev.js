"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level = void 0;

var _Graphics = require("./Graphics");

var _TetrominoI = require("./Tetrominos/TetrominoI");

var _TetrominoL = require("./Tetrominos/TetrominoL");

var _TetrominoJ = require("./Tetrominos/TetrominoJ");

var _TetrominoT = require("./Tetrominos/TetrominoT");

var _TetrominoO = require("./Tetrominos/TetrominoO");

var _TetrominoS = require("./Tetrominos/TetrominoS");

var _TetrominoZ = require("./Tetrominos/TetrominoZ");

var _TetrominoController = require("./TetrominoController");

var _constants = require("./constants");

var _ClearAnimation = require("./ClearAnimation");

var _Input = require("./Input");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var TetrominoSource =
/*#__PURE__*/
function () {
  function TetrominoSource() {
    _classCallCheck(this, TetrominoSource);

    this.bag = new TetrominoBag();
  }

  _createClass(TetrominoSource, [{
    key: "getNext",
    value: function getNext() {
      var Type = this.bag.pick();

      if (!Type) {
        this.bag = new TetrominoBag();
        return this.getNext();
      }

      return new Type();
    }
  }]);

  return TetrominoSource;
}();

var Level =
/*#__PURE__*/
function () {
  function Level() {
    var _this = this;

    _classCallCheck(this, Level);

    this.tileCountX = 10;
    this.tileCountY = 20;
    this.grid = [];

    for (var i = 0; i < this.tileCountY; i++) {
      this.grid.push(Array(this.tileCountX).fill(0));
    }

    this.tetrominoSource = new TetrominoSource();
    this.heldTetromino = null;
    this.nextTetrominos = Array.from(Array(6), function () {
      return _this.tetrominoSource.getNext();
    });
    this.nextTetromino();
    this.clearAnimation = null;
  }

  _createClass(Level, [{
    key: "step",
    value: function step() {
      if (this.clearAnimation) {
        this.clearAnimation.step();

        if (this.clearAnimation.done) {
          this.clearAnimation = null;
          this.nextTetromino();
        }

        return;
      }

      if (_Input.Input.getKeyDown(_constants.KEY_HOLD) && !this.controller.wasHeld) {
        this.holdTetromino();
        return;
      }

      this.controller.step();

      if (this.controller.done) {
        var positions = this.currentTetromino.getBlockPositions();
        var colorId = this.currentTetromino.getId();
        var rows = new Set();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = positions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                px = _step$value[0],
                py = _step$value[1];

            this.grid[py][px] = colorId;
            rows.add(py);
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

        this.checkState(rows);
      }
    }
  }, {
    key: "checkState",
    value: function checkState(rows) {
      var rowsToClear = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = rows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var row = _step2.value;

          if (this.isFullRow(row)) {
            rowsToClear.push(row);
          }
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

      rowsToClear.sort(function (a, b) {
        return b - a;
      });

      if (rowsToClear.length === 0) {
        this.nextTetromino();
      } else {
        this.clearAnimation = new _ClearAnimation.ClearAnimation(this, rowsToClear);
      }
    }
  }, {
    key: "isFullRow",
    value: function isFullRow(y) {
      return this.grid[y].every(function (val) {
        return val;
      });
    }
  }, {
    key: "removeRows",
    value: function removeRows(rows) {
      // Rows are sorted from bottom to top
      var index = 0;

      for (var y = this.tileCountY - 1; y >= 0; y--) {
        if (y === rows[index]) {
          index++;
        } else {
          this.grid[y + index] = this.grid[y];
        }
      }

      for (var _y = 0; _y < index; _y++) {
        this.grid[_y] = Array(this.tileCountX).fill(0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      // So that closure compiler recognizes it as an extern
      _Graphics.Graphics['resetTransform']();

      _Graphics.Graphics.fillStyle = '#000';

      _Graphics.Graphics.fillRect(0, 0, _Graphics.Canvas.width, _Graphics.Canvas.height);

      var width = _constants.TILE_SIZE * this.tileCountX;
      var height = _constants.TILE_SIZE * this.tileCountY;

      _Graphics.Graphics.translate((_Graphics.Canvas.width - width) / 2, (_Graphics.Canvas.height - height) / 2);

      _Graphics.Graphics.fillStyle = '#fff';

      _Graphics.Graphics.fillRect(-2, -2, width + 4, height + 4);

      _Graphics.Graphics.fillStyle = '#000';

      _Graphics.Graphics.fillRect(0, 0, width, height);

      for (var y = 0; y < this.tileCountY; y++) {
        for (var x = 0; x < this.tileCountX; x++) {
          var color = this.grid[y][x];

          if (color) {
            this.renderBlock(x, y, _constants.COLORS[color]);
          }
        }
      }

      this.renderTetromino(this.currentTetromino);

      if (this.clearAnimation) {
        this.clearAnimation.render();
      }

      _Graphics.Graphics.translate(width + 25, 15);

      var size = _constants.TILE_SIZE * 0.5;

      for (var i = 0; i < this.nextTetrominos.length; i++) {
        var tetromino = this.nextTetrominos[i];
        this.renderTetromino(tetromino, size);

        _Graphics.Graphics.translate(0, _constants.TILE_SIZE * 1.75);

        if (i === 0) size *= 0.75;
      }

      if (this.heldTetromino) {
        _Graphics.Graphics.resetTransform();

        _Graphics.Graphics.translate((_Graphics.Canvas.width - width) / 2 - 40, (_Graphics.Canvas.height - height) / 2 + 18);

        this.renderTetromino(this.heldTetromino, _constants.TILE_SIZE * 0.5);
      }
    }
  }, {
    key: "holdTetromino",
    value: function holdTetromino() {
      var heldTetromino = this.heldTetromino;
      this.heldTetromino = this.currentTetromino;
      this.heldTetromino.x = 0;
      this.heldTetromino.y = 0;
      this.heldTetromino.rotation = 0;

      if (heldTetromino) {
        this.currentTetromino = heldTetromino;
        this.controller = new _TetrominoController.TetrominoController(this.currentTetromino, this);
      } else {
        this.nextTetromino();
      }

      this.controller.wasHeld = true;
    }
  }, {
    key: "nextTetromino",
    value: function nextTetromino() {
      this.currentTetromino = this.nextTetrominos.shift();
      this.nextTetrominos.push(this.tetrominoSource.getNext());
      this.controller = new _TetrominoController.TetrominoController(this.currentTetromino, this);
    }
  }, {
    key: "renderTetromino",
    value: function renderTetromino(tetromino, size) {
      var positions = tetromino.getBlockPositions();
      var color = tetromino.getColor();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = positions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              px = _step3$value[0],
              py = _step3$value[1];

          this.renderBlock(px, py, color, size);
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
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(x, y, color) {
      var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.TILE_SIZE;
      _Graphics.Graphics.fillStyle = color;

      _Graphics.Graphics.fillRect(x * size, y * size, size - 1, size - 1);

      _Graphics.Graphics.fillStyle = 'rgba(255,255,255,0.5)';

      _Graphics.Graphics.fillRect(x * size, y * size, 2, size - 1);

      _Graphics.Graphics.fillRect(x * size, y * size, size - 1, 2);
    }
  }, {
    key: "width",
    get: function get() {
      return _constants.TILE_SIZE * this.tileCountX;
    }
  }]);

  return Level;
}();

exports.Level = Level;