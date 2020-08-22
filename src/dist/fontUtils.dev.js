"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextWidth = getTextWidth;
exports.drawText = drawText;
exports.drawBoldText = drawBoldText;
exports.GLYPH_HEIGHT = exports.GLYPH_WIDTH = void 0;

var _Assets = require("./Assets");

var _Graphics = require("./Graphics");

var GLYPH_WIDTH = 6;
exports.GLYPH_WIDTH = GLYPH_WIDTH;
var GLYPH_HEIGHT = 6;
exports.GLYPH_HEIGHT = GLYPH_HEIGHT;

function getTextWidth(text) {
  return text.length * GLYPH_WIDTH;
}

function drawText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var extraPadding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var ox = x;
  var px = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      px += GLYPH_WIDTH + extraPadding;
    } else {
      var index = text.charCodeAt(i) - 43;

      if (index >= 4) {
        index--;
      }

      if (index > 15) {
        index -= 6;
      }

      _Graphics.Graphics.drawImage(_Assets.Font.renderable, index * GLYPH_WIDTH, 0, GLYPH_WIDTH - 1, GLYPH_HEIGHT, scale * (GLYPH_WIDTH - 1), scale * GLYPH_HEIGHT);

      px += GLYPH_WIDTH + extraPadding;
    }
  }
}

function drawBoldText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  drawText(text, x, y, scale, 1);
  drawText(text, x + scale, y, scale, 1);
}