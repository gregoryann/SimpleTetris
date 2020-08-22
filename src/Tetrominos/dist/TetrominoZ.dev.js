"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoZ = void 0;

var _Tetromino = require("./Tetromino");

var _common = require("./common");

var _constants = require("../constants");

var blockPositions = [[[1, 0], [0, 0], [0, -1], [-1, -1]], [[0, 1], [0, 0], [1, 0], [1, -1]], [[-1, 0], [0, 0], [0, 1], [1, 1]], [[0, -1], [0, 0], [-1, 0], [-1, 1]]];
var TetrominoZ = (0, _Tetromino.makeTetromino)(_constants.TETROMINO_Z, blockPositions, _common.commonWallKicks);
exports.TetrominoZ = TetrominoZ;