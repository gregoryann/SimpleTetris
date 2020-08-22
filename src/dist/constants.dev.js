"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_LOCK_RESET_COUNT = exports.LOCK_DELAY = exports.AUTO_REPEAT_DELAY = exports.AUTO_SHIFT_DELAY = exports.TILE_SIZE = exports.COLORS = exports.TETROMINO_Z = exports.TETROMINO_T = exports.TETROMINO_S = exports.TETROMINO_O = exports.TETROMINO_L = exports.TETROMINO_J = exports.TETROMINO_I = exports.KEY_HOLD = exports.KEY_ROTATE_CW = exports.KEY_ROTATE_CCW = exports.KEY_DOWN = exports.KEY_UP = exports.KEY_RIGHT = exports.KEY_LEFT = void 0;
// Input
var KEY_LEFT = 37;
exports.KEY_LEFT = KEY_LEFT;
var KEY_RIGHT = 39;
exports.KEY_RIGHT = KEY_RIGHT;
var KEY_UP = 38;
exports.KEY_UP = KEY_UP;
var KEY_DOWN = 40;
exports.KEY_DOWN = KEY_DOWN;
var KEY_ROTATE_CCW = 90;
exports.KEY_ROTATE_CCW = KEY_ROTATE_CCW;
var KEY_ROTATE_CW = 88;
exports.KEY_ROTATE_CW = KEY_ROTATE_CW;
var KEY_HOLD = 16;
exports.KEY_HOLD = KEY_HOLD;
var TETROMINO_I = 1;
exports.TETROMINO_I = TETROMINO_I;
var TETROMINO_J = 2;
exports.TETROMINO_J = TETROMINO_J;
var TETROMINO_L = 3;
exports.TETROMINO_L = TETROMINO_L;
var TETROMINO_O = 4;
exports.TETROMINO_O = TETROMINO_O;
var TETROMINO_S = 5;
exports.TETROMINO_S = TETROMINO_S;
var TETROMINO_T = 6;
exports.TETROMINO_T = TETROMINO_T;
var TETROMINO_Z = 7;
exports.TETROMINO_Z = TETROMINO_Z;
var COLORS = [, '#0ff', '#00f', '#f80', '#ff0', '#0f0', '#909', '#f00'];
exports.COLORS = COLORS;
var TILE_SIZE = 16;
exports.TILE_SIZE = TILE_SIZE;
var AUTO_SHIFT_DELAY = 12;
exports.AUTO_SHIFT_DELAY = AUTO_SHIFT_DELAY;
var AUTO_REPEAT_DELAY = 2;
exports.AUTO_REPEAT_DELAY = AUTO_REPEAT_DELAY;
var LOCK_DELAY = 30;
exports.LOCK_DELAY = LOCK_DELAY;
var MAX_LOCK_RESET_COUNT = 14;
exports.MAX_LOCK_RESET_COUNT = MAX_LOCK_RESET_COUNT;