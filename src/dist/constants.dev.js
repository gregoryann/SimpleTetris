"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.T_SPIN = exports.T_SPIN_MINI = exports.MAX_LOCK_RESET_COUNT = exports.LOCK_DELAY = exports.AUTO_REPEAT_DELAY = exports.AUTO_SHIFT_DELAY = exports.TILE_SIZE = exports.COLORS = exports.TETROMINO_Z = exports.TETROMINO_T = exports.TETROMINO_S = exports.TETROMINO_O = exports.TETROMINO_L = exports.TETROMINO_J = exports.TETROMINO_I = exports.INPUT_MAPPING = exports.HOLD = exports.ROTATE_CW = exports.ROTATE_CCW = exports.SOFT_DROP = exports.HARD_DROP = exports.MOVE_RIGHT = exports.MOVE_LEFT = void 0;
// Input
var MOVE_LEFT = 37; // left

exports.MOVE_LEFT = MOVE_LEFT;
var MOVE_RIGHT = 39; // right

exports.MOVE_RIGHT = MOVE_RIGHT;
var HARD_DROP = 32; // space

exports.HARD_DROP = HARD_DROP;
var SOFT_DROP = 40; // down

exports.SOFT_DROP = SOFT_DROP;
var ROTATE_CCW = 90; // X

exports.ROTATE_CCW = ROTATE_CCW;
var ROTATE_CW = 88; // Z

exports.ROTATE_CW = ROTATE_CW;
var HOLD = 16; // shift

exports.HOLD = HOLD;
var INPUT_MAPPING = {
  38: ROTATE_CW,
  // up
  67: HOLD,
  // C
  17: ROTATE_CCW // Ctrl

};
exports.INPUT_MAPPING = INPUT_MAPPING;
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
var T_SPIN_MINI = 1;
exports.T_SPIN_MINI = T_SPIN_MINI;
var T_SPIN = 2;
exports.T_SPIN = T_SPIN;