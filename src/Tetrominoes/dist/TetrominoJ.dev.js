"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoJ = void 0;

var _Tetromino = require("./Tetromino");

var _common = require("./common");

var _constants = require("../constants");

var blockPositions = [[[-1, 0], [0, 0], [1, 0], [-1, 1]], [[0, 1], [0, 0], [0, -1], [1, 1]], [[-1, 0], [0, 0], [1, 0], [1, -1]], [[0, 1], [0, 0], [0, -1], [-1, -1]]];
var TetrominoJ = (0, _Tetromino.makeTetromino)(_constants.TETROMINO_J, blockPositions, _common.commonWallKicks);
exports.TetrominoJ = TetrominoJ;