"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _texts = _interopRequireDefault(require("../../assets/texts.gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  dataUrl: _texts["default"],
  frames: [{
    x: 0,
    y: 0,
    w: 50,
    h: 10,
    oX: 25,
    oY: 4
  }, // TETRIS
  {
    x: 51,
    y: 0,
    w: 67,
    h: 10,
    oX: 33,
    oY: 4
  }, // ALL CLEAR
  {
    x: 119,
    y: 0,
    w: 45,
    h: 10,
    oX: 22,
    oY: 4
  }, // T-SPIN
  {
    x: 0,
    y: 11,
    w: 14,
    h: 5,
    oX: 7,
    oY: 3
  }, // MINI
  {
    x: 15,
    y: 11,
    w: 38,
    h: 7,
    oX: 19,
    oY: 3
  }, // SINGLE
  {
    x: 54,
    y: 11,
    w: 43,
    h: 7,
    oX: 21,
    oY: 3
  }, // DOUBLE
  {
    x: 98,
    y: 11,
    w: 39,
    h: 7,
    oX: 19,
    oY: 3
  }, // TRIPLE
  {
    x: 139,
    y: 11,
    w: 39,
    h: 7,
    oX: 19,
    oY: 3
  } // COMBO
  ]
};
exports["default"] = _default;