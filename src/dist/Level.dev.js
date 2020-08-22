"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level = void 0;

var _Graphics = require("./Graphics");

var _TetrominoT = require("./Tetrominos/TetrominoT");

var _TetrominoController = require("./TetrominoController");

var _constants = require("./constants");

var _ClearAnimation = require("./Animations/ClearAnimation");

var _Input = require("./Input");

var _Board = require("./Board");

var _GameOverAnimation = require("./Animations/GameOverAnimation");

var _Audio = require("./Audio");

var _Assets = require("./Assets");

var _globals = require("./globals");

var _utils = require("./utils");

var _fontUtils = require("./fontUtils");

var _ScoreAnimation = require("./Animations/ScoreAnimation");

var _Back2BackAnimation = require("./Animations/Back2BackAnimation");

var _MoveTypeAnimation = require("./Animations/MoveTypeAnimation");

var _TetrominoSource = require("./TetrominoSource");

var _Tetromino = require("./Tetrominos/Tetromino");

var _ScaredTetrominoController = require("./ScaredTetrominoController");

var _FallingEyePair = require("./Animations/FallingEyePair");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Level =
/*#__PURE__*/
function () {
  function Level() {
    var _this = this;

    _classCallCheck(this, Level);

    this.tileCountX = 10;
    this.tileCountY = 20;
    this.time = 0;
    this.board = new _Board.Board(this.tileCountX, this.tileCountY);
    this.width = _constants.TILE_SIZE * this.tileCountX;
    this.height = _constants.TILE_SIZE * this.tileCountY;
    this.tetrominoSource = new _TetrominoSource.TetrominoSource();
    this.heldTetromino = null;
    this.nextTetrominos = Array.from(Array(6), function () {
      return _this.tetrominoSource.getNext();
    });
    this.lastClearWasSpecial = false;
    this.clearStreak = 0;
    this.scaredTetrominoControllers = new Set();
    this.nextTetromino();
    (0, _globals.resetScore)();
    (0, _globals.resetLineClears)();
    this.scoreAnimations = [];
    this.fallingEyes = new Set();
    _Graphics.Graphics.lineWidth = 2;
  }

  _createClass(Level, [{
    key: "step",
    value: function step() {
      if (!this.gameOverAnimation) {
        this.time++;
      }

      if (this.moveTypeAnimation && !this.moveTypeAnimation.done) {
        this.moveTypeAnimation.step();
      }

      if (this.back2BackAnimation && !this.back2BackAnimation.done) {
        this.back2BackAnimation.step();
      }

      var previousScore = _globals.currentScore;

      if (this.clearAnimation) {
        this.clearAnimation.step();

        if (this.clearAnimation.done) {
          this.board.clearRows(this.clearAnimation.rows);
          this.clearAnimation = null;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.scaredTetrominoControllers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var controller = _step.value;
              this.board.removeTetromino(controller.tetromino);
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

          if (this.scaredTetrominoControllers.size > 0) {
            this.currentTetromino = null;
          } else {
            this.nextTetromino();
          }
        }

        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.fallingEyes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var animation = _step2.value;
          animation.step();

          if (animation.done) {
            this.fallingEyes["delete"](animation);
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

      if (this.scaredTetrominoControllers.size > 0) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.scaredTetrominoControllers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _controller = _step3.value;

            _controller.step();

            if (_controller.done) {
              this.scaredTetrominoControllers["delete"](_controller);
            }
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

        if (this.scaredTetrominoControllers.size === 0) {
          this.nextTetromino();
        }

        return;
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.scoreAnimations[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _animation = _step4.value;

          _animation.step();
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

      if (this.gameOverAnimation) {
        this.gameOverAnimation.step();
        return;
      }

      if (_Input.Input.getKeyDown(_constants.HOLD) && !this.controller.wasHeld) {
        this.holdTetromino();
        return;
      }

      this.controller.step();

      if (this.controller.done) {
        this.currentTetromino.eyeDirection = [0, 0];
        var positions = this.currentTetromino.getBlockPositions();
        var rows = new Set();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = positions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var position = _step5.value;
            rows.add(position[1]);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        this.board.putTetromino(this.currentTetromino);
        this.checkState(rows);
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.board.tetrominoes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var tetromino = _step6.value;
            tetromino.updateEyes();
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }

      if (_globals.currentScore !== previousScore) {
        this.scoreAnimations.push(new _ScoreAnimation.ScoreAnimation(_globals.currentScore - previousScore));

        if (this.scoreAnimations.length === 4) {
          this.scoreAnimations.shift();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // So that closure compiler recognizes it as an extern
      _Graphics.Graphics['resetTransform']();

      _Graphics.Graphics.fillStyle = '#000';

      _Graphics.Graphics.fillRect(0, 0, _Graphics.Canvas.width, _Graphics.Canvas.height);

      var width = _constants.TILE_SIZE * this.tileCountX;
      var height = _constants.TILE_SIZE * this.tileCountY;

      _Graphics.Graphics.translate((_Graphics.Canvas.width - width) / 2, (_Graphics.Canvas.height - height) / 2);

      _Graphics.Graphics.strokeStyle = '#fff';

      _Graphics.Graphics.strokeRect(-1, -1, width + 2, height + 2);

      this.renderBoard();

      _Graphics.Graphics.translate(width + 25, 0);

      _Graphics.Graphics.strokeRect(-16, -1, 48, 170);

      (0, _fontUtils.drawText)("TIME:", -17, 27 * 7);
      (0, _fontUtils.drawBoldText)(this.getTimeText(), -17, 28 * 7);
      (0, _fontUtils.drawText)("LEVEL:", -17, 30 * 7);
      (0, _fontUtils.drawBoldText)((0, _utils.zeroPad)(_globals.currentLevel, 2), -17, 31 * 7);
      (0, _fontUtils.drawText)("LINES:", -17, 33 * 7);
      (0, _fontUtils.drawBoldText)((0, _utils.zeroPad)(_globals.lineClears, 4), -17, 34 * 7);
      (0, _fontUtils.drawText)("SCORE:", -17, 297);
      (0, _fontUtils.drawBoldText)((0, _utils.zeroPad)(_globals.currentScore, 9), -17, 309, 2);
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.scoreAnimations[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var animation = _step7.value;
          animation.render(20, 294);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      this.renderNextTetrominos();

      _Graphics.Graphics['resetTransform']();

      _Graphics.Graphics.translate((_Graphics.Canvas.width - width) / 2 - 40, (_Graphics.Canvas.height - height) / 2 + 10);

      _Graphics.Graphics.strokeRect(-17, -11, 48, 40);

      (0, _fontUtils.drawBoldText)("HOLD", -6, -8);

      if (this.heldTetromino) {
        if (this.controller.wasHeld) {
          this.renderGhostTetromino(this.heldTetromino, 0, _constants.TILE_SIZE / 2, 2);
          _Graphics.Graphics.fillStyle = 'rgba(0,0,0,0.5)';

          _Graphics.Graphics.fillRect(-_constants.TILE_SIZE / 2, _constants.TILE_SIZE / 2, _constants.TILE_SIZE * 2, _constants.TILE_SIZE);
        } else {
          this.renderTetromino(this.heldTetromino, _constants.TILE_SIZE / 2, 2);
        }
      }

      (0, _Graphics.drawAt)(-10, 50, function () {
        if (_this2.clearStreak > 1) {
          (0, _Graphics.drawSprite)(_Assets.TextsSprite, 0, 0, 7);
          (0, _fontUtils.drawBoldText)("".concat(_this2.clearStreak < 10 ? ' ' : '').concat(_this2.clearStreak - 1), -5, 7, 2);
        }

        if (_this2.moveTypeAnimation) {
          _this2.moveTypeAnimation.render();
        }

        if (_this2.back2BackAnimation) {
          _this2.back2BackAnimation.render();
        }
      });
    }
  }, {
    key: "getTSpin",
    value: function getTSpin() {
      if (!(this.currentTetromino instanceof _TetrominoT.TetrominoT) || this.controller.lastMove !== _constants.ACTION_ROTATE) {
        return false;
      }

      var x = this.currentTetromino.x;
      var y = this.currentTetromino.y;
      var corners = [this.board.isSolidAt(x - 1, y + 1), this.board.isSolidAt(x + 1, y + 1), this.board.isSolidAt(x + 1, y - 1), this.board.isSolidAt(x - 1, y - 1)];
      var betweens = [this.board.isSolidAt(x - 1, y), this.board.isSolidAt(x, y + 1), this.board.isSolidAt(x + 1, y), this.board.isSolidAt(x, y - 1)];
      var emptyCorners = !corners[0] + !corners[1] + !corners[2] + !corners[3];

      if (emptyCorners > 1) {
        return false;
      }

      var filled = [corners[0] + betweens[1] + corners[1], corners[1] + betweens[2] + corners[2], corners[2] + betweens[3] + corners[3], corners[3] + betweens[0] + corners[0]];
      return filled.filter(function (x) {
        return x === 3;
      }).length < 2 ? _constants.T_SPIN_MINI : _constants.T_SPIN;
    }
  }, {
    key: "checkState",
    value: function checkState(rows) {
      var rowsToClear = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = rows[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var row = _step8.value;

          if (this.board.isFullRow(row)) {
            rowsToClear.push(row);
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      rowsToClear.sort(function (a, b) {
        return a - b;
      });
      var tSpinType = this.getTSpin();
      var clearedRowsCount = rowsToClear.length;
      var allClear = this.isAllClearConfig(rowsToClear);
      this.updateScore(tSpinType, clearedRowsCount, allClear);

      if (clearedRowsCount === 0) {
        if (this.board.overflows(this.nextTetrominos[0])) {
          this.setGameOver();
          return;
        }

        this.nextTetromino();
      } else {
        this.clearAnimation = new _ClearAnimation.ClearAnimation(this, rowsToClear);
      }
    }
  }, {
    key: "isAllClearConfig",
    value: function isAllClearConfig(rowsToClear) {
      for (var y = rowsToClear.length; y < rowsToClear.length + 2; y++) {
        if (!this.board.isEmptyRow(y)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "updateScore",
    value: function updateScore(tSpinType, clearedRowsCount, allClear) {
      // Combo
      (0, _globals.addToScore)(_globals.currentLevel * 50 * this.clearStreak);
      (0, _globals.addLineClears)(clearedRowsCount);

      if (tSpinType) {
        (0, _Audio.playSample)(_Assets.TSpinSound, 1, true);
      }

      if (allClear) {
        this.setMoveType(_constants.ALL_CLEAR);
        (0, _Audio.playSample)(_Assets.AllClearSound, 1, true);
        (0, _globals.addToScore)(1500 * _globals.currentLevel);
      } else if (clearedRowsCount > 0) {
        (0, _Audio.playSample)(_Assets.LineClearSounds[clearedRowsCount - 1], 1, true);

        if (this.lastClearWasSpecial && clearedRowsCount === 4) {
          this.setBack2Back();
          (0, _globals.addToScore)(1200 * _globals.currentLevel);
        } else {
          (0, _globals.addToScore)({
            1: 100,
            2: 300,
            3: 500,
            4: 800
          }[clearedRowsCount] * _globals.currentLevel);
        }

        this.setMoveType(_constants.SINGLE_CLEAR - 1 + clearedRowsCount);
      }

      if (tSpinType === _constants.T_SPIN) {
        if (this.lastClearWasSpecial && clearedRowsCount > 0) {
          this.setBack2Back();
          (0, _globals.addToScore)(600 * (clearedRowsCount + 1) * _globals.currentLevel);
        } else {
          (0, _globals.addToScore)(400 * (clearedRowsCount + 1) * _globals.currentLevel);
        }

        this.setMoveType(_constants.T_SPIN + clearedRowsCount);
      } else if (tSpinType === _constants.T_SPIN_MINI) {
        (0, _globals.addToScore)(_globals.currentLevel * (clearedRowsCount + 1) * 100);
        this.setMoveType(_constants.T_SPIN_MINI + clearedRowsCount);
      }

      if (clearedRowsCount > 0) {
        this.clearStreak++;
        this.lastClearWasSpecial = tSpinType || clearedRowsCount === 4;
      } else {
        this.clearStreak = 0;
      }
    }
  }, {
    key: "setGameOver",
    value: function setGameOver() {
      this.gameOverAnimation = new _GameOverAnimation.GameOverAnimation(this);

      _Assets.Song1.stop();
    }
  }, {
    key: "setBack2Back",
    value: function setBack2Back() {
      this.back2BackAnimation = new _Back2BackAnimation.Back2BackAnimation();
    }
  }, {
    key: "setMoveType",
    value: function setMoveType(type) {
      if (type) {
        this.moveTypeAnimation = new _MoveTypeAnimation.MoveTypeAnimation(type);
      }
    }
  }, {
    key: "getScaredTetrominoController",
    value: function getScaredTetrominoController(rows) {
      var items = new Set();

      for (var x = 0; x < this.tileCountX; x++) {
        items.add(this.board.getItemAt(x, rows[0] - 1));
        items.add(this.board.getItemAt(x, rows[rows.length - 1] + 1));
      }

      var controllers = new Set();
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = items[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var item = _step9.value;

          if (item instanceof _Tetromino.Tetromino) {
            var controller = new _ScaredTetrominoController.ScaredTetrominoController(item, this.board);

            if (controller.isFreeableTetromino()) {
              controllers.add(controller);
            }
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      if (controllers.size > 0) {
        return _toConsumableArray(controllers)[Math.floor(Math.random() * controllers.size)];
      } else {
        return null;
      }
    }
  }, {
    key: "getGhostOffset",
    value: function getGhostOffset() {
      var positions = this.currentTetromino.getBlockPositions();
      var maxDeltas = [0, 0, 0, 0];

      for (var i = 0; i < 4; i++) {
        var _positions$i = _slicedToArray(positions[i], 2),
            x = _positions$i[0],
            y = _positions$i[1];

        for (var delta = 0; delta <= y; delta++) {
          var ghostY = y - delta;

          if (!this.board.getItemAt(x, ghostY)) {
            maxDeltas[i] = delta;
          } else {
            break;
          }
        }
      }

      this.ghostOffset = -Math.min.apply(Math, maxDeltas);
    }
  }, {
    key: "renderBoard",
    value: function renderBoard() {
      for (var y = 0; y < this.board.height; y++) {
        for (var x = 0; x < this.board.width; x++) {
          var color = this.board.getColorAt(x, y);

          if (color) {
            this.renderBlock(x, this.tileCountY - 1 - y, color);
          }
        }
      }

      if (!this.gameOverAnimation && this.currentTetromino) {
        this.renderGhostTetromino(this.currentTetromino, this.getGhostOffset(), _constants.TILE_SIZE, this.tileCountY - 1);
        this.renderTetromino(this.currentTetromino, _constants.TILE_SIZE, this.tileCountY - 1);
      }

      if (this.scaredTetrominoController) {
        this.renderTetromino(this.scaredTetrominoController.tetromino, _constants.TILE_SIZE, this.tileCountY - 1);
      }

      if (this.clearAnimation) {
        this.clearAnimation.render();
      }

      if (this.gameOverAnimation) {
        this.gameOverAnimation.render();
      }
    }
  }, {
    key: "renderNextTetrominos",
    value: function renderNextTetrominos() {
      var size = _constants.TILE_SIZE * 0.5;

      for (var i = 0; i < this.nextTetrominos.length; i++) {
        var tetromino = this.nextTetrominos[i];
        this.renderTetromino(tetromino, size, 3);

        if (i === 0) {
          _Graphics.Graphics.translate(0, size * 5);

          size *= 0.75;
        } else {
          _Graphics.Graphics.translate(0, size * 4);
        }
      }
    }
  }, {
    key: "holdTetromino",
    value: function holdTetromino() {
      if (this.heldTetromino && this.board.overflows(this.heldTetromino)) {
        this.setGameOver();
        return;
      }

      (0, _Audio.playSample)(_Assets.HoldSound);
      var heldTetromino = this.heldTetromino;
      this.heldTetromino = this.currentTetromino;
      this.heldTetromino.x = 0;
      this.heldTetromino.y = 0;
      this.heldTetromino.rotation = 0;

      if (heldTetromino) {
        this.currentTetromino = heldTetromino;
        this.controller = new _TetrominoController.TetrominoController(this.currentTetromino, this.board);
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
      this.controller = new _TetrominoController.TetrominoController(this.currentTetromino, this.board);
    }
  }, {
    key: "renderTetromino",
    value: function renderTetromino(tetromino, size, bottom) {
      var positions = tetromino.getBlockPositions();
      var color = tetromino.getColor();
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = positions[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _step10$value = _slicedToArray(_step10.value, 2),
              px = _step10$value[0],
              py = _step10$value[1];

          this.renderBlock(px, bottom - py, color, size);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  }, {
    key: "renderGhostTetromino",
    value: function renderGhostTetromino(tetromino, offset, size, bottom) {
      var positions = tetromino.getBlockPositions();
      var color = tetromino.getColor();
      positions.forEach(function (el) {
        return el[1] += offset;
      });
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = positions[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _step11$value = _slicedToArray(_step11.value, 2),
              px = _step11$value[0],
              py = _step11$value[1];

          this.renderGhostBlock(px, bottom - py, color, size);
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
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

      _Graphics.Graphics.fillRect(x * size, y * size, 2, size);

      _Graphics.Graphics.fillRect(x * size, y * size, size, 2);
    }
  }, {
    key: "renderGhostBlock",
    value: function renderGhostBlock(x, y, color) {
      var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.TILE_SIZE;
      _Graphics.Graphics.fillStyle = color;

      _Graphics.Graphics.fillRect(x * size, y * size, size - 1, size - 1);

      _Graphics.Graphics.fillStyle = '#000';

      _Graphics.Graphics.fillRect(x * size + 1, y * size + 1, size - 3, size - 3);
    }
  }, {
    key: "getTimeText",
    value: function getTimeText() {
      var milliseconds = Math.floor(this.time / 60 % 1 * 100);
      var seconds = Math.floor(this.time / 60);
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor(seconds / 60);
      return "".concat((0, _utils.zeroPad)(hours, 2), ":").concat((0, _utils.zeroPad)(minutes % 60, 2), ":").concat((0, _utils.zeroPad)(seconds % 60, 2), ".").concat((0, _utils.zeroPad)(milliseconds, 2));
    }
  }]);

  return Level;
}();

exports.Level = Level;