"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaredTetrominoController = void 0;

var _TetrominoControllerBase = require("./TetrominoControllerBase");

var _TetrominoO = require("./Tetrominoes/TetrominoO");

var _Audio = require("./Audio");

var _Assets = require("./Assets");

var _globals = require("./globals");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MOVE_UP = '1';
var MOVE_LEFT = '2';
var MOVE_RIGHT = '3';
var ROTATE_CW = '4';
var ROTATE_CCW = '5';

var ScaredTetrominoController =
/*#__PURE__*/
function (_TetrominoControllerB) {
  _inherits(ScaredTetrominoController, _TetrominoControllerB);

  function ScaredTetrominoController(tetromino, board) {
    var _this;

    _classCallCheck(this, ScaredTetrominoController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScaredTetrominoController).call(this, tetromino, board));
    _this.tetromino = tetromino;
    _this.cachedInstructions = [];
    _this.timer = 0;
    _this.cachedInstructionsIndex = 0;
    _this.timerDuration = Math.max(1, Math.round(_this.tetromino.y / 4));
    return _this;
  }

  _createClass(ScaredTetrominoController, [{
    key: "step",
    value: function step() {
      if (this.done) {
        return;
      }

      this.tetromino.eyeDirection = [0, -2];
      this.tetromino.scared = false;
      this.timer++;

      if (this.timer === this.timerDuration) {
        this.timer = 0;
        this.escape();
      }
    }
  }, {
    key: "escape",
    value: function escape() {
      (0, _globals.addToScore)(-_globals.currentLevel * 25);

      if (this.cachedInstructionsIndex < this.cachedInstructions.length) {
        switch (this.cachedInstructions[this.cachedInstructionsIndex]) {
          case MOVE_UP:
            this.move(0, 1);
            (0, _Audio.playSample)(_Assets.ShiftSound);
            break;

          case MOVE_LEFT:
            this.move(-1, 0);
            (0, _Audio.playSample)(_Assets.ShiftSound);
            break;

          case MOVE_RIGHT:
            this.move(1, 0);
            (0, _Audio.playSample)(_Assets.ShiftSound);
            break;

          case ROTATE_CW:
            this.rotateCW();
            (0, _Audio.playSample)(_Assets.RotateSound);
            break;

          case ROTATE_CCW:
            this.rotateCCW();
            (0, _Audio.playSample)(_Assets.RotateSound);
            break;
        }

        this.cachedInstructionsIndex++;
      }

      if (!this.move(0, 1)) {
        this.board.putTetromino(this.tetromino);
        this.done = true;
      } else {
        (0, _Audio.playSample)(_Assets.ShiftSound);
      }

      if (this.tetromino.y > this.board.height) {
        this.done = true;
      }
    }
  }, {
    key: "isFreeableTetromino",
    value: function isFreeableTetromino() {
      var currentStateX = this.tetromino.x;
      var currentStateY = this.tetromino.y;
      var currentStateRotation = this.tetromino.rotation;
      this.cachedInstructions = this.getInstructionsToGetFree();
      this.tetromino.x = currentStateX;
      this.tetromino.y = currentStateY;
      this.tetromino.rotation = currentStateRotation;
      return !!this.cachedInstructions;
    }
  }, {
    key: "getInstructionsToGetFree",
    value: function getInstructionsToGetFree() {
      var _this2 = this;

      var stepsToTry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var instructionHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (stepsToTry === 0) {
        return '';
      }

      var currentStateX = this.tetromino.x;
      var currentStateY = this.tetromino.y;
      var currentStateRotation = this.tetromino.rotation;

      var reset = function reset() {
        _this2.tetromino.x = currentStateX;
        _this2.tetromino.y = currentStateY;
        _this2.tetromino.rotation = currentStateRotation;
      };

      if (this.move(0, 1) && this.move(0, 1)) {
        return instructionHistory + MOVE_UP + MOVE_UP;
      }

      reset();

      if (this.move(-1, 0)) {
        if (this.getInstructionsToGetFree(stepsToTry - 1, instructionHistory + MOVE_LEFT)) {
          return instructionHistory;
        }
      }

      reset();

      if (this.move(1, 0)) {
        if (this.getInstructionsToGetFree(stepsToTry - 1, instructionHistory + MOVE_RIGHT)) {
          return instructionHistory;
        }
      }

      reset();

      if (!(this.tetromino instanceof _TetrominoO.TetrominoO)) {
        if (this.rotateCCW()) {
          if (this.getInstructionsToGetFree(stepsToTry - 1, instructionHistory + ROTATE_CCW)) {
            return instructionHistory;
          }
        }

        reset();

        if (this.rotateCW()) {
          if (this.getInstructionsToGetFree(stepsToTry - 1, instructionHistory + ROTATE_CW)) {
            return instructionHistory;
          }
        }

        reset();
      }

      return '';
    }
  }]);

  return ScaredTetrominoController;
}(_TetrominoControllerBase.TetrominoControllerBase);

exports.ScaredTetrominoController = ScaredTetrominoController;