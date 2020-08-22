"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoController = void 0;

var _Input = require("./Input");

var _constants = require("./constants");

var _TetrominoO = require("./Tetrominos/TetrominoO");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TetrominoController =
/*#__PURE__*/
function () {
  function TetrominoController(tetromino, level) {
    _classCallCheck(this, TetrominoController);

    this.tetromino = tetromino;
    this.tetromino.x = level.tileCountX / 2 - 1;
    this.tetromino.y = level.tileCountY - 2;
    this.level = level;

    while (this.invalidState()) {
      this.tetromino.move(0, 1);
    }

    this.inputDelayTimer = _Input.Input.getKey(_constants.KEY_LEFT) || _Input.Input.getKey(_constants.KEY_RIGHT) ? 0 : 15;
    this.repeatTimer = 0;
    this.gravity = 1;
    this.dropTimer = 60;
    this.manualDropTimer = 0;
    this.extendedLockTimer = false;
    this.lockTimer = -1;
  }

  _createClass(TetrominoController, [{
    key: "step",
    value: function step() {
      this.actuallyMoved = false;
      this.handleMovement();
      this.handleRotation();

      if (this.actuallyMoved && this.extendedLockTimer < 14) {
        this.lockTimer = 30;
        this.extendedLockTimer++;
      }

      if (_Input.Input.getKeyDown(_constants.KEY_UP)) {
        this.drop();
        return;
      }

      var shouldDrop = false;

      if (_Input.Input.getKeyDown(_constants.KEY_DOWN)) {
        this.manualDropTimer = 0;
      }

      if (_Input.Input.getKey(_constants.KEY_DOWN)) {
        this.manualDropTimer -= Math.max(20, this.gravity);

        if (this.manualDropTimer < 0) {
          shouldDrop = true;
          this.manualDropTimer += 60;
        }
      }

      this.dropTimer -= this.gravity;

      if (this.dropTimer <= 0) {
        if (!_Input.Input.getKey(_constants.KEY_DOWN)) {
          shouldDrop = true;
        }

        this.dropTimer += 60;
      }

      if (shouldDrop) {
        this.move(0, 1);

        if (this.onFloor() && this.lockTimer <= 0) {
          this.lockTimer = 30;
        }
      }

      if (this.lockTimer > 0) {
        this.lockTimer--;
        var onFloor = this.onFloor();

        if (!onFloor) {
          this.lockTimer = 0;
          this.extendedLockTimer = 0;
        } else if (this.lockTimer === 0) {
          this.done = true;
        }
      }
    }
  }, {
    key: "handleRotation",
    value: function handleRotation() {
      if (!(this.tetromino instanceof _TetrominoO.TetrominoO)) {
        if (_Input.Input.getKeyDown(_constants.KEY_ROTATE_CCW)) {
          this.rotateCCW();
        } else if (_Input.Input.getKeyDown(_constants.KEY_ROTATE_CW)) {
          this.rotateCW();
        }
      }
    }
  }, {
    key: "move",
    value: function move(dx, dy) {
      this.tetromino.move(dx, dy);

      if (this.invalidState()) {
        this.tetromino.move(-dx, -dy);
        return false;
      }

      return true;
    }
  }, {
    key: "onFloor",
    value: function onFloor() {
      var collided = !this.move(0, 1);

      if (collided) {
        return true;
      } else {
        this.move(0, -1);
      }
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
            return;
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
            return;
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
    }
  }, {
    key: "invalidState",
    value: function invalidState() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.tetromino.getBlockPositions()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              x = _step3$value[0],
              y = _step3$value[1];

          if (x < 0 || x >= this.level.tileCountX || y >= this.level.tileCountY || this.level.grid[y][x]) {
            return true;
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

      return false;
    }
  }, {
    key: "validState",
    value: function validState() {
      return !this.invalidState();
    }
  }]);

  return TetrominoController;
}();

exports.TetrominoController = TetrominoController;