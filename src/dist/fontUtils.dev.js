"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextWidth = getTextWidth;
exports.drawText = drawText;
exports.drawBoldText = drawBoldText;
exports.specialGlyphs = exports.GLYPH_HEIGHT = exports.GLYPH_WIDTH = void 0;

var _Assets = require("./Assets");

var _Graphics = require("./Graphics");

var GLYPH_WIDTH = 6;
exports.GLYPH_WIDTH = GLYPH_WIDTH;
var GLYPH_HEIGHT = 6;
exports.GLYPH_HEIGHT = GLYPH_HEIGHT;

function getTextWidth(text) {
  return text.length * GLYPH_WIDTH;
}

var specialGlyphs = {
  '.': [0, 2],
  ':': [2, 2],
  '+': [4, 6],
  '-': [10, 6]
};
exports.specialGlyphs = specialGlyphs;

function drawText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var extraPadding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var ox = x;
  var px = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      px += GLYPH_WIDTH + extraPadding;
    } else {
      var custom = specialGlyphs[text[i]];
      var offset = void 0;
      var width = GLYPH_WIDTH;

      if (custom) {
        offset = custom[0];
        width = custom[1];
      } else if (text[i] < 'A') {
        offset = 16 + (text.charCodeAt(i) - 48) * GLYPH_WIDTH;
      } else {
        offset = 76 + (text.charCodeAt(i) - 65) * GLYPH_WIDTH;
      }

      _Graphics.Graphics.drawImage(_Assets.Font.renderable, offset, 0, width - 1, GLYPH_HEIGHT, scale * (width - 1), scale * GLYPH_HEIGHT);

      px += width + extraPadding;
    }
  }
}

function drawBoldText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  drawText(text, x, y, scale, 1);
  drawText(text, x + scale, y, scale, 1);
}