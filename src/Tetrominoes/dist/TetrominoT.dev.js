"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoT = void 0;

var _Tetromino = require("./Tetromino");

var _common = require("./common");

var _constants = require("../constants");

var blockPositions = [[[0, 0], [-1, 0], [0, 1], [1, 0]], [[0, 0], [0, 1], [1, 0], [0, -1]], [[0, 0], [1, 0], [0, -1], [-1, 0]], [[0, 0], [0, -1], [-1, 0], [0, 1]]];
var TetrominoT = (0, _Tetromino.makeTetromino)(_constants.TETROMINO_T, blockPositions, _common.commonWallKicks);
exports.TetrominoT = TetrominoT;