"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoI = void 0;

var _Tetromino = require("./Tetromino");

var _constants = require("../constants");

var blockPositions = [[[-1, 0], [0, 0], [1, 0], [2, 0]], [[1, 1], [1, 0], [1, -1], [1, -2]], [[-1, -1], [0, -1], [1, -1], [2, -1]], [[0, 1], [0, 0], [0, -1], [0, -2]]];
var wallKicks = [[[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]], [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]], [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]], [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]]];
var TetrominoI = (0, _Tetromino.makeTetromino)(_constants.TETROMINO_I, blockPositions, wallKicks);
exports.TetrominoI = TetrominoI;