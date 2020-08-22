"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrominoO = void 0;

var _Tetromino = require("./Tetromino");

var _constants = require("../constants");

var config = [[0, 1], [1, 1], [0, 0], [1, 0]];
var blockPositions = [config, config, config, config];
var wallKicks = [];
var TetrominoO = (0, _Tetromino.makeTetromino)(_constants.TETROMINO_O, blockPositions, wallKicks);
exports.TetrominoO = TetrominoO;